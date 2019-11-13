import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs';
import {StackOverflowItem} from '../interfaces/stack-overflow-item';
import {Weather} from '../interfaces/weather';


export enum urls {
  TypeScript = 5000,
  Angular2,
  Weather
}

export interface ISearchResultItem  {
    answer_count: number;
    closed_date: number;
    closed_reason: string;
    creation_date: number;
    is_answered: boolean;
    last_activity_date: number;
    link: string;
    score: number;
    tags: Array<string>;
    title: string;
    view_count: number;
}

@Injectable()
export class SearchService {

    private static readonly apiUrl =
        "https://api.stackexchange.com/2.2/search?pagesize=20&order=desc&sort=activity&site=stackoverflow&intitle=";
    private static readonly  weatherUrl = './assets/mockdata/weatherdata.json';
    constructor(private http: Http) {

    }

    public search(keyword: string): Observable<StackOverflowItem[]> {
        // return this.http.get(SearchService.apiUrl + keyword) // for development with
        const apiUrl = 'http://localhost:' + urls[keyword] + '/items';
        return this.http.get(apiUrl)
            .map((res: Response) => {
              return res.json();
            })
            .catch((err: Response) => Observable.of(err.json()));
    }

    public getWeatherData(): Observable<Weather[]> {
      return this.http.get(SearchService.weatherUrl)
        .map((res: Response) => {
          return res.json();
        })
        .catch((err: Response) => Observable.of(err.json()));
    }


}
