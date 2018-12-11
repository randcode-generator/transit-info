import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { appState } from '../ngrx/appState'
import * as actions from '../ngrx/actions';

@Component({
  selector: 'app-filter',
  inputs: ['type'],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})

export class FilterComponent implements OnInit {
  type: string = null;

  constructor(
    private store: Store<appState>
  ) { }

  ngOnInit() {
  }

  filterTrain(train:string): void {
    this.store.dispatch(new actions.FilterTrainText(train))
  }

  filterStation(station:string): void {
    this.store.dispatch(new actions.FilterStationText(station))
  }
}
