import { useEffect, useMemo, ReactNode } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

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
		const script = document.createElement('noscript');
		script.innerHTML = '<iframe src="https://www.googletagmanager.com/ns.html?id=G-MPBS7BE0VP"\n' +
			'height="0" width="0" style="display:none;visibility:hidden"></iframe>';
		document.body.appendChild(script);
	}, []);

	return <>
		<Helmet>
			<script>
				{ `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
				new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
				j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
				'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
				})(window,document,'script','dataLayer','G-MPBS7BE0VP');` }
			</script>
		</Helmet>
		<Header/>
		{children || <Outlet/>}
		<Footer/>
	</>
};
