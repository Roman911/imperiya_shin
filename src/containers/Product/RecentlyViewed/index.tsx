import { baseDataAPI } from '../../../services/baseDataService';
import { useAppTranslation } from '../../../hooks';
import { ProductList } from '../../ProductList';
import { Spinner, Title } from '../../../components/Lib';

export const RecentlyViewed = () => {
	const t = useAppTranslation();
	const storage: number[] = localStorage.reducerRecentlyViewed ? JSON.parse(localStorage.reducerRecentlyViewed) : [];
	const { data, isLoading } = baseDataAPI.useFetchProductsQuery({ id: `?product_ids=${storage.join(',')}`, length: 4 });

	return <>
		<Title title={ t('recently viewed', true) } />
		<Spinner height='h-40' show={ isLoading } >
			<ProductList
				classnames='grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-3 md:px-0'
				data={ data?.data }
			/>
		</Spinner>
	</>
};
