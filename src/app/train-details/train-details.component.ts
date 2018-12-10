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
  constructor(
    private trainService: TrainService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.getTrainDetails()
    })
  }

  getTrainDetails(): void {
    const trainID = this.route.snapshot.paramMap.get('trainID');
    this.trainService.getTrainStations(trainID)
      .subscribe(trainStations => {
        this.trainStations = trainStations
        this.boroughs = Object.keys(trainStations)
      })
  }
}
