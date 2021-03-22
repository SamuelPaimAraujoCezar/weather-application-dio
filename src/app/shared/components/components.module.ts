import { RouterModule } from '@angular/router';
import { MaterialModule } from './../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavComponent } from './nav/nav.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DetailedWeatherComponent } from './detailed-weather/detailed-weather.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CitiesTypeaheadComponent } from './cities-typeahead/cities-typeahead.component';



@NgModule({
  declarations: [
    DetailedWeatherComponent,
    FooterComponent,
    HeaderComponent,
    NavComponent,
    CitiesTypeaheadComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    RouterModule,
  ],
  exports: [
    DetailedWeatherComponent,
    FooterComponent,
    HeaderComponent,
    NavComponent,
    CitiesTypeaheadComponent
  ]
})
export class ComponentsModule { }
