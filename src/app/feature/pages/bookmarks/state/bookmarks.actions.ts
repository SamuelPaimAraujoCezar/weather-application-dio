import { createAction, props } from '@ngrx/store';

import { Bookmark } from '../../../../shared/models/bookmark';

export const removeBookmark = createAction(
    '[Bookmarks] Remove Bookmark',
    props<{ id: number }>(),
);

export const toggleBookmarkById = createAction(
    '[Bookmarks] Toggle Bookmarks By Id',
    props<{ id: number }>(),
);

export const updateBookmarksList = createAction(
    '[Bookmarks] Update Bookmarks List',
    props<{ bookmarks: Bookmark[] }>(),
);