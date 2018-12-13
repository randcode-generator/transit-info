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

describe('TrainsComponent', () => {
  let component: TrainsComponent;
  let fixture: ComponentFixture<TrainsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppRoutingModule,
        FormsModule,
        MatSidenavModule,
        MatGridListModule,
        MatCardModule,
        StoreModule.forRoot({
          filterTrainLines: filterTrainReducer,
          filterTrainStation: filterStationReducer
        })
      ],
      declarations: [ 
        TrainsComponent,
        FilterComponent,
        FrontTemplateComponent,
        AboutComponent,
        TrainDetailsComponent,
        StationDetailComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
