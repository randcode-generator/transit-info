import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontTemplateComponent } from './front-template.component';
import { TrainsComponent } from '../trains/trains.component';
import { MatSidenavModule, MatGridListModule, MatCardActions, MatCardModule } from '@angular/material';
import { TrainDetailsComponent } from '../train-details/train-details.component';
import { FilterComponent } from '../filter/filter.component';
import { AppRoutingModule } from '../app-routing.module';
import { AboutComponent } from '../about/about.component';
import { StationDetailComponent } from '../station-detail/station-detail.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { filterTrainReducer, filterStationReducer } from '../ngrx/reducer';
import { HttpClientModule } from '@angular/common/http';

describe('FrontTemplateComponent', () => {
  let component: FrontTemplateComponent;
  let fixture: ComponentFixture<FrontTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        MatSidenavModule,
        MatGridListModule,
        MatCardModule,
        StoreModule.forRoot({
          filterTrainLines: filterTrainReducer,
          filterTrainStation: filterStationReducer
        })
      ],
      declarations: [
        FrontTemplateComponent,
        TrainsComponent,
        TrainDetailsComponent,
        FilterComponent,
        AboutComponent,
        StationDetailComponent
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
