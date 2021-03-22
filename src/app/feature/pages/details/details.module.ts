import { MaterialModule } from './../../../shared/material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DetailsPage } from './containers/details/details.page';
import { DetailsGuard } from './services/details.guard.service';
import { ComponentsModule } from './../../../shared/components/components.module';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { detailsReducer } from './state/details.reducer';
import { DetailsEffects } from './state/details.effects';
import { DailyWeatherComponent } from './components/daily-weather/daily-weather.component';

@NgModule({
  declarations: [
    DetailsPage,
    DailyWeatherComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: DetailsPage, canActivate: [ DetailsGuard ] }
    ]),
    StoreModule.forFeature('details', detailsReducer),
    EffectsModule.forFeature([DetailsEffects]),
    ComponentsModule,
    MaterialModule
  ],
  providers: [
    DetailsGuard
  ]
})
export class DetailsModule { }
