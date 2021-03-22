import { Bookmark } from './../../../../shared/models/bookmark';
import { createReducer, Action, on} from '@ngrx/store';

import * as fromHomeActions from '../../home/state/home.actions';
import * as fromBookmarksActions from './bookmarks.actions';

export interface BookmarksState {
    bookmarks: Bookmark[];
}

export const bookmarksInitialState: BookmarksState = {
    bookmarks: [],
}

const reducer = createReducer(
    bookmarksInitialState,
    on(fromHomeActions.toggleBookmark, (state, { entity }) => ({
        ...state,
        bookmarks: onToggleBookmark(state.bookmarks, entity),
    })),
    on(fromBookmarksActions.removeBookmark, (state, { id }) => ({
        ...state,
        bookmarks: state.bookmarks.filter(bookmark => bookmark.id !== id),
    })),
    on(fromBookmarksActions.updateBookmarksList, (state, { bookmarks }) => ({
      ...state,
      bookmarks,
    })),
);

export function bookmarksReducer(state: BookmarksState | undefined, action: Action) {
    return reducer(state, action);
}

function onToggleBookmark(bookmarks: Bookmark[], entity: Bookmark): Bookmark[] {
    if (!!bookmarks.find(bookmark => bookmark.id === entity.id)) {
        return bookmarks.filter(bookmark => bookmark.id !== entity.id)
    }
    return [...bookmarks, entity]
}