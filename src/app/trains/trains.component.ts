import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { appState } from '../ngrx/appState'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-trains',
  templateUrl: './trains.component.html',
  styleUrls: ['./trains.component.css']
})
export class TrainsComponent implements OnInit {

  filterText: Observable<appState>

  constructor(
    private route: ActivatedRoute,
    private store: Store<appState>
  ) {
    this.filterText = this.store.select('filterTrainLines')
    this.filterText.subscribe(val => {
      this.trains = this.allTrains;
      if(val.filterText.length > 0)
        this.trains = this.trains.filter(element => element===val.filterText)
    })

    this.route.paramMap.subscribe(_ => {
      this.getSelectedTrain()
    })
  }

  readonly allTrains = ["D", "N"]
  trains = ["D", "N"]
  selectedTrain = ""

  ngOnInit() {
  }

  getSelectedTrain(): void {
    const trainID = this.route.snapshot.paramMap.get('trainID');
    this.selectedTrain = trainID
  }
}
