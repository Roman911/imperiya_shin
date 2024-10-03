import { Helmet } from 'react-helmet-async';

import { config } from '../../config';
import { removeFromStorage, resetStorage } from '../../lib';
import { useAppGetProducts, useAppDispatch, useAppSelector, useAppTranslation } from '../../hooks';
import { removeComparison, reset } from '../../store/reducers/comparisonSlice';
import { LayoutWrapper } from '../../components/Layout';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { NoResult, Spinner, Title } from '../../components/Lib';
import { ComparisonComponent } from '../../components/Comparison';
import { Language } from '../../models/language';
import { Support } from '../Layout/Support';

export const Comparison = () => {
	const dispatch = useAppDispatch();
	const t = useAppTranslation();
	const { lang } = useAppSelector(state => state.langReducer);
	const noDataText = lang === Language.UA ? 'Ви ще не додали в обране жодного товару' : 'Вы еще не добавили в избранное ни одного товара';
	const { comparisonItems } = useAppSelector(state => state.comparisonReducer);
	const { products, isLoading} = useAppGetProducts(comparisonItems);

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
				data={{ products, total_count: products.length }}
				resetEverything={ resetEverything }
				handleClick={ handleClick }
			/>
		</Spinner> : <NoResult noResultText={ noDataText } />}
		<Support />
	</LayoutWrapper>
};
