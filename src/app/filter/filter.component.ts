import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { appState } from '../ngrx/appState'
import * as actions from '../ngrx/actions';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})

export class FilterComponent implements OnInit {

  constructor(
    private store: Store<appState>
  ) { }

  ngOnInit() {
  }

  filterTrain(train:string): void {
    this.store.dispatch(new actions.FilterText(train))
  }
}
