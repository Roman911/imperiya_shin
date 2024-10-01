import { Helmet } from 'react-helmet-async';

import { config } from '../../config';
import { baseDataAPI } from '../../services/baseDataService';
import { useAppSelector, useAppTranslation } from '../../hooks';
import { ProductList } from '../ProductList';
import { LayoutWrapper } from '../../components/Layout';
import { NoResult, Spinner, Title } from '../../components/Lib';
import { Language } from '../../models/language';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Section } from '../../models/filter';

export const Bookmarks = () => {
	const { lang } = useAppSelector(state => state.langReducer);
	const t = useAppTranslation();
	const noDataText = lang === Language.UA ? 'Ви ще не додали в обране жодного товару' : 'Вы еще не добавили в избранное ни одного товара';
	const { bookmarksItems } = useAppSelector(state => state.bookmarksReducer);
	const tires = bookmarksItems.filter((item: { id: number, section: Section }) => item.section === Section.Tires)
		.map((item: { id: number, section: Section }) => item.id);
	const disks = bookmarksItems.filter((item: { id: number, section: Section }) => item.section === Section.Disks)
		.map((item: { id: number, section: Section }) => item.id);
	const battery = bookmarksItems.filter((item: { id: number, section: Section }) => item.section === Section.Battery)
		.map((item: { id: number, section: Section }) => item.id);
	const { data: dataTires } = baseDataAPI.useFetchProductsQuery({ id: `?product_ids=${tires.join(',')}`, length: tires.length || 1 });
	const { data: dataDisks } = baseDataAPI.useFetchProductsQuery({ id: `?typeproduct=3&product_ids=${disks.join(',')}`, length: disks.length || 1 });
	const { data: dataBattery, isLoading } = baseDataAPI.useFetchProductsQuery({ id: `?typeproduct=4&product_ids=${battery.join(',')}`, length: battery.length || 1 });
	const showItems = [];

	if(dataTires) showItems.push(...dataTires.data.products);
	if (dataDisks) showItems.push(...dataDisks.data.products);
	if (dataBattery) showItems.push(...dataBattery.data.products);
	const productsFilter = showItems.filter(item => bookmarksItems.findIndex((i: { id: number }) => i.id === item.product_id) !== -1);

	const path = [
		{
			id: 1,
			title: t('favorites', true),
			url: '/'
		}
	]

	return <LayoutWrapper>
		<Helmet>
			<title>{ t('favorites', true) } | { config.domain }</title>
		</Helmet>
		<Breadcrumbs path={ path }/>
		<Title title='favorites' />
		{bookmarksItems.length > 0 ? <Spinner height='h-40' show={ isLoading } >
			<ProductList
				classnames='grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
				data={{ products: productsFilter, total_count: showItems.length }}
			/>
		</Spinner> : <NoResult noResultText={ noDataText } />}
	</LayoutWrapper>
};
