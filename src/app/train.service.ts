import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TrainService {

  constructor(
    private http: HttpClient
  ) { }

  getTrainStations(train: string): Observable<Object> {
    if(train == null) {
      return of({});
    }
    
    let url = `https://firebasestorage.googleapis.com/v0/b/transit-project-bb22b.appspot.com/o/${train}.json?alt=media`

    return this.http.get(url, {responseType: 'json'})
  }
}
