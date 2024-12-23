import { useEffect, useMemo, ReactNode } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { baseDataAPI } from '../../services/baseDataService';
import { getFromStorage } from '../../lib';
import { useAppDispatch } from '../../hooks';
import { setSettings } from '../../store/reducers/settingsSlice';
import { addBookmarksFromStorage } from '../../store/reducers/bookmarksSlice';
import { addComparisonFromStorage } from '../../store/reducers/comparisonSlice';
import { addCartFromStorage } from '../../store/reducers/cartSlice';
import { Header } from './Header';
import { Footer } from '../../components/Layout/Footer';

export const Layout = ({ children }: { children?: ReactNode }) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { data: settings } = baseDataAPI.useFetchSettingsQuery('');
	const bookmarksStorage = useMemo(() => getFromStorage('reducerBookmarks'), []);
	const comparisonStorage = useMemo(() => getFromStorage('reducerComparison'), []);
	const cartStorage = useMemo(() => getFromStorage('reducerCart'), []);

	useEffect(() => {
		if(settings) dispatch(setSettings(settings));
	}, [navigate, settings, dispatch]);

	useEffect(() => {
		if(bookmarksStorage.length !== 0) dispatch(addBookmarksFromStorage(bookmarksStorage));
		if(comparisonStorage.length !== 0) dispatch(addComparisonFromStorage(comparisonStorage));
		if(cartStorage.length !== 0) dispatch(addCartFromStorage(cartStorage));
	}, [bookmarksStorage, cartStorage, comparisonStorage, dispatch]);

	useEffect(() => {
		if (settings?.[0].body_html) {
			const script1 = document.createElement('script');
			script1.src = settings?.[0].head_html;
			script1.async = true;
			document.body.appendChild(script1);

			const script2 = document.createElement('script');
			script2.innerHTML = settings?.[0].body_html;
			document.body.appendChild(script2);

			return () => {
				document.body.removeChild(script1);
				document.body.removeChild(script2);
			};
		}
	}, [settings]);

	return <>
		<Header/>
		{children || <Outlet/>}
		<Footer/>
	</>
};
