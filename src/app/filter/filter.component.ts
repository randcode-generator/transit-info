import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { appState } from '../ngrx/appState'
import * as actions from '../ngrx/actions';
import { filter } from 'rxjs/operators'

@Component({
  selector: 'app-filter',
  inputs: ['type'],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})

export class FilterComponent implements OnInit {
  type: string = null;
  filterTextValue: string

  constructor(
    private store: Store<appState>
  ) {
  }

  ngOnInit() {
    if(this.type=="station") {
      this.store.select('filterTrainStation')
        .pipe(filter(x => x.type == actions.FILTER_STATION_CLEAR_TEXT))
        .subscribe(_ => {
          this.filterTextValue = ""
        }) 
    }
  }

  filterTrain(train:string): void {
    this.store.dispatch(new actions.FilterTrainText(train))
  }

  filterStation(station:string): void {
    this.store.dispatch(new actions.FilterStationText(station))
  }
}
