import { ComponentsModule } from './../../../shared/components/components.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MaterialModule } from './../../../shared/material/material.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomePage } from './containers/home/home.page';

import { HomeEffects } from './state/home.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { homeReducer } from './state/home.reducer';
import { CurrentWeatherComponent } from './components/current-weather/current-weather.component';
import { UnitSelectorComponent } from './containers/unit-selector/unit-selector.component';


@NgModule({
  declarations: [
    HomePage,
    CurrentWeatherComponent,
    UnitSelectorComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    RouterModule,
    ComponentsModule,
    StoreModule.forFeature('home', homeReducer),
    EffectsModule.forFeature([HomeEffects]),
  ]
})
export class HomeModule { }
