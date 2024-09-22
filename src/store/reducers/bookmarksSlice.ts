import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface BookmarksState {
	bookmarksItems: number[]
}

const initialState: BookmarksState = {
	bookmarksItems: [],
}

export const bookmarksSlice = createSlice({
	name: 'bookmarks',
	initialState,
	reducers: {
		addBookmarks: (state, actions: PayloadAction<number>) => {
			state.bookmarksItems.push(actions.payload);
		},
		addBookmarksFromStorage: (state, actions: PayloadAction<number[]>) => {
			state.bookmarksItems = actions.payload;
		},
		removeBookmarks: (state, actions: PayloadAction<number>) => {
			state.bookmarksItems = state.bookmarksItems.filter(item => item !== actions.payload);
		},
	},
});

export const { addBookmarks, removeBookmarks, addBookmarksFromStorage } = bookmarksSlice.actions

export default bookmarksSlice.reducer
