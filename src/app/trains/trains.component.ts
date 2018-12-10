import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilterService } from '../filter.service';

@Component({
  selector: 'app-trains',
  templateUrl: './trains.component.html',
  styleUrls: ['./trains.component.css']
})
export class TrainsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    public filterService: FilterService
  ) {

    this.route.paramMap.subscribe(_ => {
      this.getSelectedTrain()
    })
    this.filterService.filterConsume$.subscribe(filterText => {
      this.trains = this.allTrains;
      if(filterText.length > 0)
        this.trains = this.trains.filter(element => element===filterText)
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
