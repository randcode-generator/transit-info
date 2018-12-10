import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-station-detail',
  templateUrl: './station-detail.component.html',
  styleUrls: ['./station-detail.component.css']
})
export class StationDetailComponent implements OnInit {

  @Input() station: string;
  @Input() train: string;

  close(): void {
    this.station = ""
  }
  constructor() { }

  ngOnInit() {
  }

}
