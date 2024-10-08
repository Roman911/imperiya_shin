import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import { useAppDispatch, useAppSelector, useAppTranslation } from '../../hooks';
import { setParams, changeSection, resetFilter } from '../../store/reducers/filterSlice';

import { parseUrl } from './seo';
import { FilterAlt } from './FilterAlt';
import { CatalogContent } from './CatalogContent';
import { LayoutWrapper } from '../../components/Layout';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Support } from '../Layout/Support';
import { Section } from '../../models/filter';
import { FetchBrand } from './FetchBrand';
import { FetchModel } from './FetchModel';

export const Catalog = () => {
	const [ isOpenFilter, setOpenFilter ] = useState(false);
	const { settings } = useAppSelector(state => state.settingsReducer);
	const { filter, section } = useAppSelector(state => state.filterReducer);
	const { brand, model } = useAppSelector(state => state.brandAliasReducer);
	const { lang } = useAppSelector(state => state.langReducer);
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

	const titleDefault = `${t(section, true)} | ${settings.ua.config_name}`;

	return <LayoutWrapper>
		{ (filter?.model_id && model) ? <FetchModel model={ model } lang={ lang } /> :
			(filter?.brand && brand) ? <FetchBrand brand={ brand } lang={ lang } /> :
				<Helmet>
					<title>{titleDefault}</title>
					<meta name='description' content={titleDefault}/>
				</Helmet>
		}
		<Breadcrumbs path={path}/>
		<div className='py-5 lg:flex'>
			<FilterAlt isOpenFilter={ isOpenFilter } closeFilter={ closeFilter } />
			<CatalogContent openFilter={ openFilter } />
		</div>
		<Support />
	</LayoutWrapper>
};
