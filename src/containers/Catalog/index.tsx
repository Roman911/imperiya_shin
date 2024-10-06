import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import { config } from '../../config';
import { useAppDispatch, useAppSelector, useAppTranslation } from '../../hooks';
import { setParams, changeSection, resetFilter } from '../../store/reducers/filterSlice';

import { parseUrl } from './seo';
import { FilterAlt } from './FilterAlt';
import { CatalogContent } from './CatalogContent';
import { LayoutWrapper } from '../../components/Layout';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Support } from '../Layout/Support';
import { Section } from '../../models/filter';

export const Catalog = () => {
	const [ isOpenFilter, setOpenFilter ] = useState(false);
	const { section } = useAppSelector(state => state.filterReducer);
	const t = useAppTranslation();
	const dispatch = useAppDispatch();
	const params = useParams();

	useEffect(() => {
		dispatch(resetFilter());
	}, [dispatch]);

	useEffect(() => {
		if(section !== params.section) {
			dispatch(changeSection(params.section as Section))
		}
	}, [dispatch, params.section, section]);

	useEffect(() => {
		if(params['*']) {
			const url = parseUrl(params['*']);
			dispatch(setParams(url));
		}

	}, [dispatch, params]);

	const path = [
		{
			id: 1,
			title: t(section, true),
			url: '/catalog/tires/'
		}
	]

	const closeFilter = () => {
		setOpenFilter(false);
	}

	const openFilter = () => {
		setOpenFilter(true);
	}

	return <LayoutWrapper>
		<Helmet>
			<title>{ t(section, true) } | { config.domain }</title>
		</Helmet>
		<Breadcrumbs path={ path } />
		<div className='py-5 lg:flex'>
			<FilterAlt isOpenFilter={ isOpenFilter } closeFilter={ closeFilter } />
			<CatalogContent openFilter={ openFilter } />
		</div>
		<Support />
	</LayoutWrapper>
};
