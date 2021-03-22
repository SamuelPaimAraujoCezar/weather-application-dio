import { Injectable } from "@angular/core";

import { Bookmark } from "../../../../shared/models/bookmark";
import { CityWeather } from "../../../../shared/models/weather";
import { WeatherService } from './../../../../shared/services/weather.service';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs';
import { withLatestFrom, mergeMap, map, catchError } from 'rxjs/operators';


import { AppState } from './../../../../shared/state/app.reducer';
import * as fromBookmarksActions from './bookmarks.actions';
import * as fromBookmarksSelectors from './bookmarks.selectors';

@Injectable()
export class BookmarksEffects {

  toggleBookmarksById$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromBookmarksActions.toggleBookmarkById),
      withLatestFrom(this.store.pipe(select(fromBookmarksSelectors.selectBookmarksList))),
      mergeMap(([{ id }, bookmarks]: [{ id: number }, Bookmark[]]) => {
        if (bookmarks.some(bookmark => bookmark.id === id)) {
          return of(bookmarks);
        }
        return this.weatherService.getCityWeatherById(id.toString())
          .pipe(
            map((cityWeather: CityWeather) => {
              const bookmark = new Bookmark();
              bookmark.id = cityWeather.city.id;
              bookmark.coord = cityWeather.city.coord;
              bookmark.name = cityWeather.city.name;
              bookmark.country = cityWeather.city.country;
              return [...bookmarks, bookmark];
            }),
          );
      }),
      catchError((err, caught$) => caught$),
      map((bookmarks: Bookmark[]) => fromBookmarksActions.updateBookmarksList({ bookmarks })),
    )
  );

  constructor(private actions$: Actions,
              private store: Store<AppState>,
              private weatherService: WeatherService) {
  }
}