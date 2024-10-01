import { FC, useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import { config } from '../../../config';
import { baseDataAPI } from '../../../services/baseDataService';
import { useAppDispatch, useAppSelector, useAppSearchParams } from '../../../hooks';
import { setParams } from '../../../store/reducers/filterSlice';
import { ProductList } from '../../ProductList';
import { FilterByCar, Paginate, SelectionByCar, ShowMore } from '../../../components/Catalog';
import { FilterActive } from '../FilterActive';
import { Language } from '../../../models/language';
import { NoResult, Spinner } from '../../../components/Lib';

interface CatalogContentProps {
	openFilter: () => void
}

export const CatalogContent: FC<CatalogContentProps> = ({ openFilter }) => {
	const [ paginateCount, setPaginateCount ] = useState(0);
	const [ itemsProduct, setItemsProduct ] = useState(config.catalog.itemsProduct);
	const location = useLocation();
	const dispatch = useAppDispatch();
	const [ , setSearchParams ] = useSearchParams();
	const { lang } = useAppSelector(state => state.langReducer);
	const { data, isLoading } = baseDataAPI.useFetchProductsQuery({ id: location?.search, length: itemsProduct, start: paginateCount * config.catalog.itemsProduct });
	const searchParams = useAppSearchParams();

	useEffect(() => {
		dispatch(setParams(searchParams));
	}, [dispatch, searchParams]);

	const handleClick = (param1: string, param2: string) => {
		setSearchParams(params => {
			params.set(param1, param2)
			return params
		});
	}

	const handlePageClick = (event: { selected: number; }) => {
		setPaginateCount(event.selected);
		setItemsProduct(config.catalog.itemsProduct);
	};

	const onClickShowMore = () => {
		setItemsProduct(prevState => prevState + config.catalog.itemsProduct);
	}

	return (
		<div className='flex-1'>
			<FilterByCar openFilter={ openFilter } handleClick={ handleClick } />
			<SelectionByCar />
			<FilterActive className='hidden lg:flex'/>
			<Spinner height='h-60' show={isLoading} size='large'>
				{data?.result ? <ProductList
					classnames='grid-cols-1 sm:grid-cols-2 md:grid-cols-3'
					data={data?.data}
				/> : <NoResult
					noResultText={lang === Language.UA ?
						'На жаль, по заданих параметрах товарів не знайдено' :
						'К сожалению, по заданным параметрам товаров не найдено'
					}
				/>}
			</Spinner>
			{ data?.result && paginateCount * config.catalog.itemsProduct + itemsProduct < data.data.total_count &&
				<ShowMore onClickShowMore={ onClickShowMore } title={ lang === Language.UA ? 'Показати більше' : 'Показать больше' } /> }
			{ data?.result && data.data.total_count > 12 &&
				<Paginate
					itemsPerPage={ config.catalog.itemsProduct }
					paginateCount={ paginateCount }
					total_count={ data?.data.total_count }
					handlePageClick={ handlePageClick }
				/>}
		</div>
	)
};
