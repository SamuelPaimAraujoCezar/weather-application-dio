import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BookmarksPage } from './containers/bookmarks/bookmarks.page';
import { MaterialModule } from './../../../shared/material/material.module';
import { ComponentsModule } from './../../../shared/components/components.module';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { bookmarksReducer } from './state/bookmarks.reducer';
import { BookmarksEffects } from './state/bookmarks.effects';

@NgModule({
  declarations: [
    BookmarksPage
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ComponentsModule,
    StoreModule.forFeature('bookmarks', bookmarksReducer),
    EffectsModule.forFeature([BookmarksEffects]),
  ]
})
export class BookmarksModule { }
