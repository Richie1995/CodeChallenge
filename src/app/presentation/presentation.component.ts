import {Component, Input, OnInit} from '@angular/core';
import {StackOverflowItem} from '../core/interfaces/stack-overflow-item';
import {Weather} from '../core/interfaces/weather';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss']
})
export class PresentationComponent implements OnInit {

  @Input()
  header = '';
  @Input()
  data: (StackOverflowItem | Weather)[] = [];
  constructor() { }

  ngOnInit() {
  }

}
