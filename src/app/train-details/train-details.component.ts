import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrainService } from '../train.service';
import { Store } from '@ngrx/store';
import { appState } from '../ngrx/appState';
import { Observable } from 'rxjs';
import * as actions from '../ngrx/actions';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-train-details',
  templateUrl: './train-details.component.html',
  styleUrls: ['./train-details.component.css']
})

export class TrainDetailsComponent implements OnInit {

  trainStationsOrigin = {}
  trainStations = {}
  boroughs = []
  selectedStation = ""
  train = ""
  error:HttpErrorResponse = null
  filterText: Observable<appState>

  constructor(
    private trainService: TrainService,
    private route: ActivatedRoute,
    private store: Store<appState>
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(_ => {
      this.getTrainDetails()
      this.store.dispatch(new actions.FilterStationClearText())
    })

    this.filterText = this.store.select('filterTrainStation')
    this.filterText.subscribe(val => {
      this.boroughs = Object.keys(this.trainStationsOrigin)
      this.boroughs.forEach(x => {
        let stationArr = this.trainStationsOrigin[x]
        let filterText = val.filterText.toLowerCase()
        if(filterText.length == 0) {
          this.trainStations[x] = stationArr
        } else {
          this.trainStations[x] = stationArr.filter(
            station => station.toLowerCase().includes(filterText))
        }
      })
    })
  }

  getTrainDetails(): void {
    this.selectedStation = ""
    this.train = this.route.snapshot.paramMap.get('trainID')
    this.trainService.getTrainStations(this.train)
      .subscribe(trainStations => {
        this.trainStationsOrigin = trainStations
        this.boroughs = Object.keys(trainStations)
        this.boroughs.forEach(x => {
          this.trainStations[x] = trainStations[x]
        })
      },
      err => this.error = err
      )
  }

  onStationClick(station:string): void {
    this.selectedStation = station
  }
}
