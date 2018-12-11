import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrainService } from '../train.service';
import { Store } from '@ngrx/store';
import { appState } from '../ngrx/appState';
import { Observable } from 'rxjs';

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
  filterText: Observable<appState>

  constructor(
    private trainService: TrainService,
    private route: ActivatedRoute,
    private store: Store<appState>
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(_ => {
      this.getTrainDetails()
    })

    this.filterText = this.store.select('filterTrainStation')
    this.filterText.subscribe(val => {
      this.boroughs = Object.keys(this.trainStationsOrigin)
      this.boroughs.forEach(x => {
        let stationArr = this.trainStationsOrigin[x]
        let filterText = val.filterText.toLowerCase()
        this.trainStations[x] = stationArr.filter(
                  g => g.toLowerCase().includes(filterText))
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
      })
  }

  onStationClick(station:string): void {
    this.selectedStation = station
  }
}
