import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor() {
  }

  private filterSource = new Subject<string>();
  filterConsume$ = this.filterSource;

  setFilterText(train: string): void {
    this.filterSource.next(train)
  }
}
