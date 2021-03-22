import { HeaderData } from './../../models/header-data';
import { createReducer, on } from '@ngrx/store';

import { Units } from '../../models/units.enum';
import * as fromConfigActions from './config.actions';

export interface ConfigState {
  unit: Units;
  headerData: HeaderData;
}

export const configInitialState: ConfigState = {
  unit: Units.Metric,
  headerData: {
    title: 'Início',
    icon: 'home',
    routeUrl: ''
  }
}

export const configReducer = createReducer(
  configInitialState,
  on(fromConfigActions.updateUnit, (state, { unit }) => ({
    ...state,
    unit,
  })),
  on(fromConfigActions.updateHeader, (state, { headerData }) => ({
    ...state,
    headerData,
  })),
);