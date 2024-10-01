import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { Section } from '../../models/filter';

interface Item {
	id: number
	section: Section
}

export interface BookmarksState {
	bookmarksItems: Item[]
}

const initialState: BookmarksState = {
	bookmarksItems: [],
}

export const bookmarksSlice = createSlice({
	name: 'bookmarks',
	initialState,
	reducers: {
		addBookmarks: (state, actions: PayloadAction<Item>) => {
			state.bookmarksItems.push(actions.payload);
		},
		addBookmarksFromStorage: (state, actions: PayloadAction<Item[]>) => {
			state.bookmarksItems = actions.payload;
		},
		removeBookmarks: (state, actions: PayloadAction<number>) => {
			state.bookmarksItems = state.bookmarksItems.filter(item => item.id !== actions.payload);
		},
	},
});

export const { addBookmarks, removeBookmarks, addBookmarksFromStorage } = bookmarksSlice.actions

export default bookmarksSlice.reducer
