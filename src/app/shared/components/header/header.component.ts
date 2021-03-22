import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../state/app.reducer';
import { HeaderData } from './../../models/header-data';

import * as fromConfigSelectors from '../../state/config/config.selectors';

@Component({
  selector: 'wea-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  headerData$: Observable<HeaderData>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.headerData$ = this.store.pipe(select(fromConfigSelectors.selectUnitHeader));
  }
}
