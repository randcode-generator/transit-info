import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainService {

  constructor() { }

  getTrainStations(train: string): Observable<string[]> {
    let stationArr:string[] = []
    if(train == "N") {
      stationArr = ["Coney Island", "86th st"];
    } else if(train == "D") {
      stationArr = ["Coney Island", "Bay 50th"];
    }

    return of(stationArr);
  }
}
