import { FC, useEffect, useState } from 'react';

import { baseDataAPI } from '../../../services/baseDataService';
import { FilterAltComponent } from '../../../components/Catalog/FilterAlt';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { changeSection, changeSubsection, setParams, reset } from '../../../store/reducers/filterSlice';
import { Section, Subsection } from '../../../models/filter';
import { setCarFilter } from '../../../store/reducers/filterCarSlice';

interface FilterAltProps {
	isOpenFilter: boolean
	closeFilter: () => void
}

export const FilterAlt: FC<FilterAltProps> = ({ isOpenFilter, closeFilter }) => {
	const [ element, setElement ] = useState<HTMLElement | null>(null);
	const { filter, isSend } = useAppSelector(state => state.filterCarReducer);
	const { filter: filterBrand } = useAppSelector(state => state.filterReducer);
	const dispatch = useAppDispatch();
	const { data } = baseDataAPI.useFetchBaseDataQuery('');
	const { data: dataAkum } = baseDataAPI.useFetchDataAkumQuery('');
	const { data: model, refetch: modelRefetch } = baseDataAPI.useFetchAutoModelQuery(`${filter.brand}`);
	const { data: modelYear } = baseDataAPI.useFetchAutoYearQuery(`${filter.model}`);
	const { data: modelKit, refetch: modelKitRefetch } = baseDataAPI.useFetchAutoModelKitQuery(`${filter.model}/${filter.year}`);
	const { data: manufModels } = baseDataAPI.useFetchManufModelsQuery(`${filterBrand.brand || '0'}`);

	useEffect(() => {
		if(isSend) {
			dispatch(changeSubsection(Subsection.ByCars));
		}
	}, [dispatch, isSend]);

	const handleClick = (value: Subsection) => {
		dispatch(changeSubsection(value));
	}

	const onClick = (value: Section) => {
		dispatch(reset());
		dispatch(changeSection(value));
	}

	const onChange = (name: string, value: number | string | undefined | null, element: HTMLElement) => {
		if(name === 'brand') {
			dispatch(setParams({ model_id: null }));
		}
		setElement(element);
		dispatch(setParams({ [name]: value }));
	}

	const onChangeByCar = (name: string, value: number | string | undefined) => {
		dispatch(setCarFilter({ ...filter, [name]: value }));
		if(name === 'model') {
			modelRefetch();
		} else if(name === 'modification' || name === 'year') {
			modelKitRefetch();
		}
	}

	return <FilterAltComponent
		element={ element }
		data={ data }
		isOpenFilter={ isOpenFilter }
		closeFilter={ closeFilter }
		handleClick={ handleClick }
		onClick={ onClick }
		onChange={ onChange }
		onChangeByCar={ onChangeByCar }
		setElement={ setElement }
		model={ model }
		modelYear={ modelYear }
		modelKit={ modelKit }
		manufModels={ manufModels }
		dataAkum={ dataAkum }
	/>
};
