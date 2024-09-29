import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import { config } from '../../config';
import { baseDataAPI } from '../../services/baseDataService';
import { useAppSelector, useAppTranslation } from '../../hooks';
import { ProductList } from '../ProductList';
import { LayoutWrapper } from '../../components/Layout';
import { NoResult, Spinner, Title } from '../../components/Lib';
import { Language } from '../../models/language';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Paginate } from '../../components/Catalog/Paginate';

export const Search = () => {
	const [ paginateCount, setPaginateCount ] = useState(0);
	const { lang } = useAppSelector(state => state.langReducer);
	const { search } = useAppSelector(state => state.searchReducer);
	const { data, isLoading } = baseDataAPI.useFetchProductsQuery({ id: `?name=${search}`, length: config.catalog.itemsProduct, start: paginateCount * config.catalog.itemsProduct });
	const t = useAppTranslation();
	const noDataText = lang === Language.UA ? 'На жаль, нічого не знайдено' : 'На жаль, нічого не знайдено';
	const path = [
		{
			id: 1,
			title: t('search', true),
			url: '/'
		}
	]

	return <LayoutWrapper>
		<Helmet>
			<title>{ t('search', true) } | { config.domain }</title>
		</Helmet>
		<Breadcrumbs path={ path }/>
		<Title title='search' />
		{search.length > 2 ? <Spinner height='h-40' show={ isLoading } >
			<ProductList classnames='grid-cols-1 md:grid-cols-2 lg:grid-cols-4' data={ data?.data } />
		</Spinner> : <NoResult noResultText={ noDataText } />}
		{data?.result && data.data.total_count > 12 &&
			<Paginate
				itemsPerPage={ config.catalog.itemsProduct }
				paginateCount={ paginateCount }
				total_count={ data?.data.total_count }
				setPaginateCount={ setPaginateCount }
			/>
		}
	</LayoutWrapper>
};
