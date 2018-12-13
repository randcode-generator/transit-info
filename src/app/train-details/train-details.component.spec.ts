import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainDetailsComponent } from './train-details.component';
import { StationDetailComponent } from '../station-detail/station-detail.component';
import { FilterComponent } from '../filter/filter.component';
import { MatGridListModule, MatCardModule, MatSidenavModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';
import { FrontTemplateComponent } from '../front-template/front-template.component';
import { AboutComponent } from '../about/about.component';
import { TrainsComponent } from '../trains/trains.component';
import { StoreModule } from '@ngrx/store';
import { filterTrainReducer, filterStationReducer } from '../ngrx/reducer';

describe('TrainDetailsComponent', () => {
  let component: TrainDetailsComponent;
  let fixture: ComponentFixture<TrainDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TrainDetailsComponent,
        StationDetailComponent,
        FilterComponent,
        FrontTemplateComponent,
        AboutComponent,
        TrainsComponent
       ],
       imports: [
         AppRoutingModule,
         FormsModule,
         HttpClientModule,
         MatGridListModule,
         MatCardModule,
         MatSidenavModule,
         StoreModule.forRoot({
           filterTrainLines: filterTrainReducer,
           filterTrainStation: filterStationReducer
         })
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
