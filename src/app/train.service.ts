import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TrainService {

  constructor(
    private http: HttpClient
  ) { }

  handleError<T>(result?:T) {
    let tempFunc = (error: any): Observable<T> => {
      console.log("Error occurred " + error.message)
      return of(result as T)
    }
    
    return tempFunc
  }

  getTrainStations(train: string): Observable<Object> {
    if(train == null) {
      return of({});
    }
    
    let url = `https://firebasestorage.googleapis.com/v0/b/transit-project-bb22b.appspot.com/o/${train}.json?alt=media`

    return this.http.get(url, {responseType: 'json'})
      .pipe(
        catchError(this.handleError({}))
      )
  }
}
