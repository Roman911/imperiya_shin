import { useEffect, useMemo, ReactNode } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { baseDataAPI } from '../../services/baseDataService';
import { useAppDispatch } from '../../hooks';
import { setSettings } from '../../store/reducers/settingsSlice';
import { addBookmarksFromStorage } from '../../store/reducers/bookmarksSlice';
import { addComparisonFromStorage } from '../../store/reducers/comparisonSlice';
import { addCartFromStorage } from '../../store/reducers/cartSlice';
import { Header } from './Header';
import { Footer } from '../../components/Layout/Footer';

export const Layout = ({ children }: { children?: ReactNode }) => {
	const navigate = useNavigate();
	const user = localStorage.getItem('user');
	const dispatch = useAppDispatch();
	const { data: settings } = baseDataAPI.useFetchSettingsQuery('');
	const bookmarksStorage = useMemo(() => {
		return localStorage.reducerBookmarks ? JSON.parse(localStorage.reducerBookmarks) : [];
	}, []);
	const comparisonStorage = useMemo(() => {
		return localStorage.reducerComparison ? JSON.parse(localStorage.reducerComparison) : [];
	}, []);
	const cartStorage = useMemo(() => {
		return localStorage.reducerCart ? JSON.parse(localStorage.reducerCart) : [];
	}, []);

	useEffect(() => {
		if(settings) {
			dispatch(setSettings(settings));
		}
	}, [navigate, user, settings, dispatch]);

	useEffect(() => {
		if(bookmarksStorage.length !== 0) {
			dispatch(addBookmarksFromStorage(bookmarksStorage));
		}
		if(comparisonStorage.length !== 0) {
			dispatch(addComparisonFromStorage(comparisonStorage));
		}
		if(cartStorage.length !== 0) {
			dispatch(addCartFromStorage(cartStorage));
		}
	}, [bookmarksStorage, cartStorage, comparisonStorage, dispatch]);

	return <>
		<Header />
		{ children || <Outlet /> }
		<Footer />
	</>
};
