import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { MatSidenavModule, MatToolbarModule, MatGridListModule, MatCardModule, MatButtonModule } from '@angular/material';
import { TrainDetailsComponent } from './train-details/train-details.component';
import { TrainsComponent } from './trains/trains.component';
import { StationDetailComponent } from './station-detail/station-detail.component';
import { FilterComponent } from './filter/filter.component'

import { StoreModule } from '@ngrx/store';
import { filterStationReducer, filterTrainReducer } from './ngrx/reducer';
import { FrontTemplateComponent } from './front-template/front-template.component';

@NgModule({
  declarations: [
    AppComponent,
    TrainDetailsComponent,
    TrainsComponent,
    StationDetailComponent,
    FilterComponent,
    FrontTemplateComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatGridListModule,
    MatSidenavModule,
    MatCardModule,
    MatButtonModule,
    StoreModule.forRoot({
      filterTrainLines: filterTrainReducer,
      filterTrainStation: filterStationReducer
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
