import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';

import { Bookmark } from 'src/app/shared/models/bookmark';
import { HeaderData } from 'src/app/shared/models/header-data';
import { BookmarksState } from '../../state/bookmarks.reducer';

import * as fromBookmarksActions from '../../state/bookmarks.actions';
import * as fromBookmarksSelectors from '../../state/bookmarks.selectors';
import * as fromConfigActions from '../../../../../shared/state/config/config.actions';

@Component({
  selector: 'wea-bookmarks',
  templateUrl: './bookmarks.page.html',
  styleUrls: ['./bookmarks.page.scss']
})
export class BookmarksPage implements OnInit, OnDestroy {

  headerData: HeaderData = {
    title: 'Favoritos',
    icon: 'bookmark',
    routeUrl: '/bookmarks'
  }

  bookmarks: Bookmark[];

  searchControlWithAutocomplete = new FormControl(undefined);

  private componentDestroyed$ = new Subject();

  constructor(private store: Store<BookmarksState>) {
    const headerData = this.headerData;
    store.dispatch(fromConfigActions.updateHeader({ headerData }));
  }

  ngOnInit() {
    this.store.pipe(
      select(fromBookmarksSelectors.selectBookmarksList),
      takeUntil(this.componentDestroyed$),
    ).subscribe(value => this.bookmarks = value);

    this.searchControlWithAutocomplete.valueChanges
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((cityId) =>
        this.store.dispatch(fromBookmarksActions.toggleBookmarkById({ id: cityId }))
      );
  }

  ngOnDestroy() {
    this.componentDestroyed$.next();
    this.componentDestroyed$.unsubscribe();
  }

  removeBookmark(id: number) {
    this.store.dispatch(fromBookmarksActions.removeBookmark({ id }));
  }

}
