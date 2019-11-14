import {Component, OnDestroy, OnInit} from '@angular/core';
import {SearchService} from '../core/services/search.service';
import {Subscription} from 'rxjs/Subscription';
import {StackOverflowItem} from '../core/interfaces/stack-overflow-item';
import {Weather} from '../core/interfaces/weather';
import {Observable} from 'rxjs/Observable';
import {forkJoin} from 'rxjs/observable/forkJoin';
import {isNullOrUndefined} from 'util';

export interface Data {
  name: string;
  data: StackOverflowItem[] | Weather[];
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public data: Data[] = [];

  // Check if number is odd
  private static isOdd(num) {
    return num % 2;
  }

  constructor(private readonly _searchService: SearchService) {

  }

  ngOnInit() {
    // Push subscription to subscriptions array and unsubscribe them in ngOnDestroy
    this.subscriptions.push(this.subscribeToData().subscribe(responseList => {
      // const mockData = Array.isArray(responseList[0]) ? responseList[0] : console.error('Mock data not loaded.');
      const mockWeatherData = this.setRandomWeatherData(Array.isArray(responseList[0]) ? responseList[0] : console.error('Mock data not loaded.'));
      const soWeatherData = Array.isArray(responseList[3]) ? responseList[3].slice(0, 5) : console.error('Weather data not loaded.');
      const weatherData = this.setWeatherData(mockWeatherData, soWeatherData);
      this.data.push({name: 'TypeScript', data: Array.isArray(responseList[1]) ? responseList[1].slice(0, 10) : console.error('TypeScript data not loaded.')});
      this.data.push({name: 'Angular2', data: Array.isArray(responseList[2]) ? responseList[2].slice(0, 10) : console.error('Angular2 data not loaded.')});
      this.data.push({name: 'Weather', data: weatherData});
    }));
  }

  // Set 5 random weather objects
  private setRandomWeatherData(data: Weather[]): Weather[] {
    let weatherData: Weather[] = [];
    for (let i = 0; i < 5; i++) {
      weatherData = [...weatherData, data[Math.floor(Math.random() * data.length)]];
    }
    return weatherData;
  }

  // subscribe to data
  private subscribeToData(): Observable<any[]> {
    const mockWeather = this.getWeatherData();
    const soTypescript = this._searchService.search('TypeScript');
    const soAngular = this._searchService.search('Angular2');
    const soWeather = this._searchService.search('Weather');
    return forkJoin([mockWeather, soTypescript, soAngular, soWeather]);
  }

  // Get mock data from weatherdata.json
  private getWeatherData(): Observable<Weather[]> {
    return this._searchService.getWeatherData();
  }

  // unsubscribe from all subscriptions to prevent memory issues
  ngOnDestroy(): void {
    // unsubscribe from observables to prevent memory issues
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  // push weather data to object
  // if index is even then push soWeatherData
  // if index is odd then push mockWeatherData
  private setWeatherData(mockData: Weather[], data: Weather[]): Weather[] {
    const returnData: Weather[] = [];
    if (isNullOrUndefined(mockData) || isNullOrUndefined(data)) {
      console.error('Some weather data is not loaded.');
    } else {
      let even = 0;
      let odd = 0;
      for (let i = 0; i < 10; i++) {
        if (DashboardComponent.isOdd(i)) {
          returnData.push(mockData[odd]);
          odd++;
        } else {
          returnData.push(data[even]);
          even++;
        }
      }
    }
    return returnData;
  }
}
