import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import { useAppDispatch, useAppSelector, useAppTranslation } from '../../hooks';
import { setParams, changeSection } from '../../store/reducers/filterSlice';

import { generateUrl, parseUrl } from './seo';
import { FilterAlt } from './FilterAlt';
import { CatalogContent } from './CatalogContent/CatalogContent';
import { LayoutWrapper } from '../../components/Layout';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Support } from '../../components/Home';
import { Section } from '../../models/filter';

export const Catalog = () => {
	const [ isOpenFilter, setOpenFilter ] = useState(false);
	const { filter, section } = useAppSelector(state => state.filterReducer);
	const t = useAppTranslation();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const params = useParams();

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

	const pathBySection = (section: Section) => {
		switch (section) {
			case Section.Tires:
				return 'tires/';
			case Section.Disks:
				return 'disks/';
			default:
				return section;
		}
	}

	const onSubmit = () => {
		console.log('submit', filter);
		const searchUrl = generateUrl({width: 205, height: 65});
		const rout = `/catalog/${pathBySection(section)}`;
		navigate(rout + searchUrl);
	}

	return <LayoutWrapper>
		<Helmet>
			<title>{ t(section, true) } | luxshina.ua</title>
		</Helmet>
		<Breadcrumbs path={ path } />
		<div className='py-5 lg:flex'>
			<FilterAlt isOpenFilter={ isOpenFilter } closeFilter={ closeFilter } />
			<CatalogContent openFilter={ openFilter } onSubmit={onSubmit} />
		</div>
		<Support />
	</LayoutWrapper>
};
