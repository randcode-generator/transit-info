import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-train-details',
  templateUrl: './train-details.component.html',
  styleUrls: ['./train-details.component.css']
})
export class TrainDetailsComponent implements OnInit {

  selectedTrain = ""
  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.getTrainDetails()
    })
  }

  getTrainDetails(): void {
    const trainID = this.route.snapshot.paramMap.get('trainID');
    this.selectedTrain = trainID
  }
}
