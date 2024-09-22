import { Helmet } from 'react-helmet-async';

import { useAppDispatch, useAppSelector, useAppTranslation } from '../../hooks';
import { removeComparison, reset } from '../../store/reducers/comparisonSlice';
import { LayoutWrapper } from '../../components/Layout';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { NoResult, Spinner, Title } from '../../components/Lib';
import { ComparisonComponent } from '../../components/Comparison';
import { Language } from "../../models/language.ts";
import { baseDataAPI } from "../../services/baseDataService.ts";

export const Comparison = () => {
	const dispatch = useAppDispatch();
	const { lang } = useAppSelector(state => state.langReducer);
	const { comparisonItems } = useAppSelector(state => state.comparisonReducer);
	const { data, isLoading } = baseDataAPI.useFetchProductsQuery({ id: `?product_ids=${comparisonItems.join(',')}` })
	const t = useAppTranslation();
	const noDataText = lang === Language.UA ? 'Ви ще не додали в обране жодного товару' : 'Вы еще не добавили в избранное ни одного товара';

	const path = [
		{
			id: 1,
			title: t('comparison', true),
			url: '/'
		}
	];

	const handleClick = (id: number) => {
		const storage = localStorage.reducerComparison ? JSON.parse(localStorage.reducerComparison) : [];
		dispatch(removeComparison(id));
		localStorage.setItem('reducerComparison', JSON.stringify(storage.filter((item: number) => item !== id)));
	}

	const resetEverything = () => {
		dispatch(reset());
		localStorage.setItem('reducerComparison', JSON.stringify([]));
	}

	return <LayoutWrapper >
		<Helmet>
			<title>{ t('comparison', true) } | luxshina.ua</title>
		</Helmet>
		<Breadcrumbs path={ path } />
		<Title title='comparison' />
		{comparisonItems.length > 0 ? <Spinner height='h-40' show={ isLoading } >
			<ComparisonComponent
				data={ data?.data }
				resetEverything={ resetEverything }
				handleClick={ handleClick }
			/>
		</Spinner> : <NoResult noResultText={ noDataText } />}
	</LayoutWrapper>
};
