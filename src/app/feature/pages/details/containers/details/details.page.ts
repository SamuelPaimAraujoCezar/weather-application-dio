import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppState } from 'src/app/shared/state/app.reducer';
import { Units } from 'src/app/shared/models/units.enum';
import { CityDailyWeather } from 'src/app/shared/models/weather';
import { HeaderData } from 'src/app/shared/models/header-data';

import { Store, select } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';

import * as fromDetailsActions from '../../state/details.actions';
import * as fromDetailsSelectors from '../../state/details.selectors';
import * as fromConfigActions from '../../../../../shared/state/config/config.actions';
import * as fromConfigSelectors from '../../../../../shared/state/config/config.selectors';

import * as queryParamsUtils from '../../../../../shared/utils/query-params.utils';

@Component({
  selector: 'wea-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss']
})
export class DetailsPage implements OnInit {

  headerData: HeaderData = {
    title: 'Detalhes',
    icon: 'feed',
    routeUrl: 'details',
  }

  details$: Observable<CityDailyWeather>;
  loading$: Observable<boolean>;
  error$: Observable<boolean>;

  unit$: Observable<Units>

  constructor(private store: Store<AppState>, private router: Router) {
    const queryParams = queryParamsUtils.createQueryParamsObject(router);    
    const headerData: HeaderData = {
      ...this.headerData,
      queryParams,
    }
    this.store.dispatch(fromConfigActions.updateHeader({ headerData }));
  }

  ngOnInit(): void {
    this.store.dispatch(fromDetailsActions.loadWeatherDetails());

    this.details$ = this.store.pipe(select(fromDetailsSelectors.selectDetailsEntity),);

    this.loading$ = this.store.pipe(select(fromDetailsSelectors.selectDetailsLoading));

    this.error$ = this.store.pipe(select(fromDetailsSelectors.selectDetailsError));

    this.unit$ = this.store.pipe(select(fromConfigSelectors.selectUnitConfig));
  }

  tryAgain(): void {
    this.store.dispatch(fromDetailsActions.loadWeatherDetails());
  }

}
