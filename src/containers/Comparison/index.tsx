import { Helmet } from 'react-helmet-async';

import { config } from '../../config';
import { removeFromStorage, resetStorage } from '../../lib';
import { useAppDispatch, useAppSelector, useAppTranslation } from '../../hooks';
import { removeComparison, reset } from '../../store/reducers/comparisonSlice';
import { LayoutWrapper } from '../../components/Layout';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { NoResult, Spinner, Title } from '../../components/Lib';
import { ComparisonComponent } from '../../components/Comparison';
import { Language } from '../../models/language';
import { baseDataAPI } from '../../services/baseDataService';
import { Support } from '../../components/Home';
import { Section } from '../../models/filter';

export const Comparison = () => {
	const dispatch = useAppDispatch();
	const t = useAppTranslation();
	const { lang } = useAppSelector(state => state.langReducer);
	const noDataText = lang === Language.UA ? 'Ви ще не додали в обране жодного товару' : 'Вы еще не добавили в избранное ни одного товара';
	const { comparisonItems } = useAppSelector(state => state.comparisonReducer);
	const tires = comparisonItems.filter((item: { id: number, section: Section }) => item.section === Section.Tires)
		.map((item: { id: number, section: Section }) => item.id);
	const disks = comparisonItems.filter((item: { id: number, section: Section }) => item.section === Section.Disks)
		.map((item: { id: number, section: Section }) => item.id);
	const battery = comparisonItems.filter((item: { id: number, section: Section }) => item.section === Section.Battery)
		.map((item: { id: number, section: Section }) => item.id);
	const { data: dataTires } = baseDataAPI.useFetchProductsQuery({ id: `?product_ids=${tires.join(',')}`, length: tires.length || 1 });
	const { data: dataDisks } = baseDataAPI.useFetchProductsQuery({ id: `?typeproduct=3&product_ids=${disks.join(',')}`, length: disks.length || 1 });
	const { data: dataBattery, isLoading } = baseDataAPI.useFetchProductsQuery({ id: `?typeproduct=4&product_ids=${battery.join(',')}`, length: battery.length || 1 });
	const showItems = [];

	if(dataTires) showItems.push(...dataTires.data.products);
	if (dataDisks) showItems.push(...dataDisks.data.products);
	if (dataBattery) showItems.push(...dataBattery.data.products);
	const productsFilter = showItems.filter(item => comparisonItems.findIndex((i: { id: number }) => i.id === item.product_id) !== -1);

	const path = [
		{
			id: 1,
			title: t('comparison', true),
			url: '/'
		}
	];

	const handleClick = (id: number) => {
		dispatch(removeComparison(id));
		removeFromStorage('reducerComparison', id)
	}

	const resetEverything = () => {
		dispatch(reset());
		resetStorage('reducerComparison');
	}

	return <LayoutWrapper >
		<Helmet>
			<title>{ t('comparison', true) } | { config.domain }</title>
		</Helmet>
		<Breadcrumbs path={ path } />
		<Title title='comparison' />
		{comparisonItems.length > 0 ? <Spinner height='h-40' show={ isLoading } >
			<ComparisonComponent
				data={{ products: productsFilter, total_count: showItems.length }}
				resetEverything={ resetEverything }
				handleClick={ handleClick }
			/>
		</Spinner> : <NoResult noResultText={ noDataText } />}
		<Support />
	</LayoutWrapper>
};
