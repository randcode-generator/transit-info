import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainsComponent } from './trains.component';
import { FilterComponent } from '../filter/filter.component';
import { AppRoutingModule } from '../app-routing.module';
import { FrontTemplateComponent } from '../front-template/front-template.component';
import { AboutComponent } from '../about/about.component';
import { FormsModule } from '@angular/forms';
import { MatSidenavModule, MatGridListModule, MatCardModule } from '@angular/material';
import { TrainDetailsComponent } from '../train-details/train-details.component';
import { StationDetailComponent } from '../station-detail/station-detail.component';
import { StoreModule } from '@ngrx/store';
import { filterTrainReducer, filterStationReducer } from '../ngrx/reducer';
import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from '../testObjs/ActivatedRouteStub';
import { HttpClientModule } from '@angular/common/http';

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
    { provide: ActivatedRoute, useValue: activatedRoute }
  ]
}

let filterFunc = (train:string, component: TrainsComponent,
                  fixture: ComponentFixture<TrainsComponent>) => {
  let compiled = fixture.debugElement.nativeElement
  var inputfield = compiled.querySelector('input') as HTMLInputElement
  inputfield.value = train
  inputfield.dispatchEvent(new Event('keyup', {}));
  fixture.detectChanges()
  fixture.whenStable().then(()=> {
    let arr:string[] = []
    arr.push(train)
    expect(component.trains).toEqual(arr)
  })
}

let shouldBeSelected = (train:string, fixture: ComponentFixture<TrainsComponent>) => {
  let compiled = fixture.debugElement.nativeElement
  let text = compiled.querySelector('#'+train)
  let classList = text.classList
  expect(Object.keys(classList).length).toEqual(1)
  expect(classList).toContain("selected")
}

let shouldNotBeSelected = (train:string, fixture: ComponentFixture<TrainsComponent>) => {
  let compiled = fixture.debugElement.nativeElement
  let text = compiled.querySelector('#'+train)
  let classList = text.classList
  expect(Object.keys(classList).length).toEqual(0)
}

let DTrainRoute = () => {
  let component: TrainsComponent;
  let fixture: ComponentFixture<TrainsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: imports,
      declarations: declarations,
      providers: providers("D")
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('D train should be selected', () => {
    shouldBeSelected("D", fixture)
  });

  it('N train should not be selected', () => {
    shouldNotBeSelected("N", fixture)
  });

  it('Filter N', () => {
    filterFunc("N", component, fixture)
  });

  it('Filter D', () => {
    filterFunc("D", component, fixture)
  });
}

let NTrainRoute = () => {
  let component: TrainsComponent;
  let fixture: ComponentFixture<TrainsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: imports,
      declarations: declarations,
      providers: providers("N")
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('D train should not be selected', () => {
    shouldNotBeSelected("D", fixture)
  });

  it('N train should be selected', () => {
    shouldBeSelected("N", fixture)
  });

  it('Filter N', () => {
    filterFunc("N", component, fixture)
  });

  it('Filter D', () => {
    filterFunc("D", component, fixture)
  });
}

let UnknownTrainRoute = () => {
  let component: TrainsComponent;
  let fixture: ComponentFixture<TrainsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: imports,
      declarations: declarations,
      providers: providers("")
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('D train should not be selected', () => {
    shouldNotBeSelected("D", fixture)
  });

  it('N train should not be selected', () => {
    shouldNotBeSelected("N", fixture)
  });

  it('Filter N', () => {
    filterFunc("N", component, fixture)
  });

  it('Filter D', () => {
    filterFunc("D", component, fixture)
  });
}

describe('TrainsComponent', () => {
  describe('When route is D train', DTrainRoute);
  describe('When route is N train', NTrainRoute);
  describe('When route is unknown', UnknownTrainRoute);
});
