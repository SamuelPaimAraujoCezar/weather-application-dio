import { HeaderData } from './../../../../../shared/models/header-data';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { Units } from './../../../../../shared/models/units.enum';
import { Bookmark } from './../../../../../shared/models/bookmark';
import { CityWeather } from 'src/app/shared/models/weather';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Store, select } from '@ngrx/store';

import * as fromHomeActions from '../../state/home.actions';
import * as fromHomeSelectors from '../../state/home.selectors';
import * as fromBookmarksSelectors from '../../../bookmarks/state/bookmarks.selectors';
import * as fromConfigActions from '../../../../../shared/state/config/config.actions';
import * as fromConfigSelectors from '../../../../../shared/state/config/config.selectors';


@Component({
  selector: 'wea-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit, OnDestroy {

  headerData: HeaderData = {
    title: 'Início',
    icon: 'home',
    routeUrl: ''
  }

  cityWeather: CityWeather;
  bookmarkOption: string;

  loading$: Observable<boolean>;
  error$: Observable<boolean>;

  query: any;

  searchControl: FormControl;
  searchControlWithAutocomplete: FormControl;

  unit$: Observable<Units>

  private componentDestroyed$ = new Subject();

  constructor(private store: Store) {
    const headerData = this.headerData;
    store.dispatch(fromConfigActions.updateHeader({ headerData }));
   }

  ngOnInit(): void {
    this.searchControl = new FormControl('', Validators.required);
    this.searchControlWithAutocomplete = new FormControl(undefined);

    this.searchControlWithAutocomplete.valueChanges.pipe(takeUntil(this.componentDestroyed$))
      .subscribe((cityId) => {
        if (cityId) {
          this.store.dispatch(fromHomeActions.loadCurrentWeatherById({ id: cityId.toString() }));
          this.query = Number(cityId);
        }
      });

    this.store.pipe(
        select(fromHomeSelectors.selectCurrentWeather),
        takeUntil(this.componentDestroyed$),
      ).subscribe(value => {
        this.cityWeather = value;
        if (this.cityWeather) {
          this.checkIfIsBookmarked();
        }
      });

    this.loading$ = this.store.pipe(select(fromHomeSelectors.selectCurrentWeatherLoading));
    this.error$ = this.store.pipe(select(fromHomeSelectors.selectCurrentWeatherError));

    this.unit$ = this.store.pipe(select(fromConfigSelectors.selectUnitConfig));
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.unsubscribe();
    this.store.dispatch(fromHomeActions.clearHomeState());
  }

  doSearch(): void {
      this.query = this.searchControl.value.toString();
      const query = this.query;

      this.store.dispatch(fromHomeActions.loadCurrentWeather({ query }));
      this.searchControl.reset(); 
  }

  onToggleBookmark(): void {
    const bookmark = new Bookmark();
    bookmark.id = this.cityWeather.city.id;
    bookmark.name = this.cityWeather.city.name;
    bookmark.country = this.cityWeather.city.country;
    bookmark.coord = this.cityWeather.city.coord;
    this.store.dispatch(fromHomeActions.toggleBookmark({ entity: bookmark }));
  }

  resetSearch(): void {
    if (typeof this.query === 'string') {
      const query = this.query;
      this.store.dispatch(fromHomeActions.loadCurrentWeather({ query }));
    } 
    
    if (typeof this.query === 'number') {
      const id = this.query.toString();
      this.store.dispatch(fromHomeActions.loadCurrentWeatherById({ id }));
    }
  }

  private checkIfIsBookmarked(): void {
    this.store.pipe(
      select(fromBookmarksSelectors.selectBookmarksList),
      takeUntil(this.componentDestroyed$),
    ).subscribe(bookmarks => {
      if (!!bookmarks.find(bookmark => bookmark.id === this.cityWeather.city.id)) {
        this.bookmarkOption = 'Remover dos favoritos';
      } else {
        this.bookmarkOption = 'Adicionar aos favoritos';
      } 
    });
  }
}
