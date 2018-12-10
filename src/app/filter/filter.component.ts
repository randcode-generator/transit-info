import { Component, OnInit } from '@angular/core';
import { FilterService } from '../filter.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  constructor(
    private filterService:FilterService
  ) { }

  ngOnInit() {
  }

  filterTrain(train:string): void {
    this.filterService.setFilterText(train);
  }
}
