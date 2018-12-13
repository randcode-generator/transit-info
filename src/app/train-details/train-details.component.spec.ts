import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainDetailsComponent } from './train-details.component';
import { StationDetailComponent } from '../station-detail/station-detail.component';
import { FilterComponent } from '../filter/filter.component';
import { MatGridListModule, MatCardModule, MatSidenavModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';
import { FrontTemplateComponent } from '../front-template/front-template.component';
import { AboutComponent } from '../about/about.component';
import { TrainsComponent } from '../trains/trains.component';
import { StoreModule } from '@ngrx/store';
import { filterTrainReducer, filterStationReducer } from '../ngrx/reducer';
import { ActivatedRoute } from '@angular/router';

import { convertToParamMap, ParamMap, Params } from '@angular/router';
import { ReplaySubject, Observable, of, throwError } from 'rxjs';
import { TrainService } from '../train.service';

export class ActivatedRouteStub {
  private subject = new ReplaySubject<ParamMap>();

  constructor(initialParams?: Params) {
    this.setParamMap(initialParams);
  }

  /** The mock paramMap observable */
  readonly paramMap = this.subject.asObservable();

  /** Set the paramMap observables's next value */
  setParamMap(params?: Params) {
    this.subject.next(convertToParamMap(params));
  };
}

export class TestTrainService extends TrainService {
  getTrainStations(train: string): Observable<Object> {
    if(train == "N") {
      return of({
        "brooklyn": ["coney island", "86th street"]
      })
    } else if(train == "D") {
      return of({
        "brooklyn": ["coney island", "bay 50th street"]
      })      
    } else {
      const errorResponse = new HttpErrorResponse({
        url: "testing/"+train,
        status: 404, statusText: 'Not Found'
      });

      return throwError(errorResponse)
    }
  }
}

let declarations = [ 
  TrainDetailsComponent,
  StationDetailComponent,
  FilterComponent,
  FrontTemplateComponent,
  AboutComponent,
  TrainsComponent
]

let imports = [
  MatGridListModule,
  MatCardModule,
  FormsModule,
  HttpClientModule,
  AppRoutingModule,
  MatSidenavModule,
  StoreModule.forRoot({
    filterTrainLines: filterTrainReducer,
    filterTrainStation: filterStationReducer
  })
]

function providers(trainID: string) {
  let activatedRoute = new ActivatedRouteStub({"trainID":trainID});
  return [
    { provide: ActivatedRoute, useValue: activatedRoute },
    { provide: TrainService, useClass: TestTrainService }
  ]
}

function DTrainTest() {
  let fixture: ComponentFixture<TrainDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: declarations,
      imports: imports,
      providers: providers("D")
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrainDetailsComponent);
    fixture.detectChanges();
  }));

  it('D train selected', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.textContent)
      .toContain("bay 50")
  });
}

function NTrainTest() {
  let fixture: ComponentFixture<TrainDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: declarations,
      imports: imports,
      providers: providers("N")
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrainDetailsComponent);
    fixture.detectChanges();
  }));
  
  it('N train selected', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.textContent)
      .toContain("86th")
  });
}

function UnknownTrainTest() {
  let fixture: ComponentFixture<TrainDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: declarations,
      imports: imports,
      providers: providers("0")
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrainDetailsComponent);
    fixture.detectChanges();
  }));
  
  it('Unknown train input', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.textContent)
      .toContain("404 Not Found")
  });
}

describe('TrainDetailsComponent', () => {
  describe("D train", DTrainTest)
  describe("N train", NTrainTest)
  describe("Unknown train", UnknownTrainTest)
});

