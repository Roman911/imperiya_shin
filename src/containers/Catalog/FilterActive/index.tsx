import { FC, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { baseDataAPI } from '../../../services/baseDataService';
import { useAppDispatch, useAppSelector, useAppSearchParams } from '../../../hooks';
import { removeParam, reset } from '../../../store/reducers/filterSlice';
import { FilterActiveComponent } from '../../../components/Catalog/FilterActive';
import { Section } from '../../../models/filter';

interface FilterActiveProps {
	className: string
}

export const FilterActive: FC<FilterActiveProps> = ({ className }) => {
	const { filter, section } = useAppSelector(state => state.filterReducer);
	const [ , setSearchParams ] = useSearchParams();
	const dispatch = useAppDispatch();
	const searchParams = useAppSearchParams();
	const { data } = baseDataAPI.useFetchBaseDataQuery('');
	const { data: dataAkum } = baseDataAPI.useFetchDataAkumQuery('');
	const { data: manufModels } = baseDataAPI.useFetchManufModelsQuery(`${filter.brand}`);

	useEffect(() => {
		dispatch(reset());
	}, [dispatch]);

	const clearParam = (name: string) => {
		dispatch(removeParam({[name]: null}));
		setSearchParams(params => {
			params.delete(name);
			return params;
		});
	}

	const clearAllParams = () => {
		dispatch(reset());
		setSearchParams(section === Section.Disks ? 'typeproduct=3' : section === Section.Battery ? 'typeproduct=4' : '');
	}

	return <FilterActiveComponent
		data={ data }
		className={ className }
		searchParams={ searchParams }
		clearParam={ clearParam }
		clearAllParams={ clearAllParams }
		manufModels={ manufModels }
		dataAkum={ dataAkum }
		section={ section }
	/>
};
