import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrainService } from '../train.service';

@Component({
  selector: 'app-train-details',
  templateUrl: './train-details.component.html',
  styleUrls: ['./train-details.component.css']
})

export class TrainDetailsComponent implements OnInit {

  trainStations = {}
  boroughs = []
  selectedStation = ""
  train = ""

  constructor(
    private trainService: TrainService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(_ => {
      this.getTrainDetails()
    })
  }

  getTrainDetails(): void {
    this.selectedStation = ""
    this.train = this.route.snapshot.paramMap.get('trainID')
    this.trainService.getTrainStations(this.train)
      .subscribe(trainStations => {
        this.trainStations = trainStations
        this.boroughs = Object.keys(trainStations)
      })
  }

  onStationClick(station:string): void {
    this.selectedStation = station
  }
}
