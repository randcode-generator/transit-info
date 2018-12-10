import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trains',
  templateUrl: './trains.component.html',
  styleUrls: ['./trains.component.css']
})
export class TrainsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    
  ) { }

  trains = ["D", "N"]
  selectedTrain = ""

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.getSelectedTrain()
    })
  }

  getSelectedTrain(): void {
    const trainID = this.route.snapshot.paramMap.get('trainID');
    this.selectedTrain = trainID
  }

}
