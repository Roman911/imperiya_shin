import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from './redux';
import {Section} from '../models/filter';

export const useAppSubmit = () => {
	const [ params, setParams ] = useState<string[]>([]);
	const [ searchParams, setSearchParams ] = useSearchParams();
	const { filter, section } = useAppSelector(state => state.filterReducer);

	// General function to update params list
	const updateParamsList = useCallback((key: string, value: string | null | undefined) => {
		setParams(prevParams => {
			const updatedParams = prevParams.filter(param => !param.startsWith(`${key}=`));
			if(value) updatedParams.push(`${key}=${value}`);
			return updatedParams;
		});
	}, []);

	// Update params when filter changes
	useEffect(() => {
		updateParamsList('width', filter.width ?? '');
		updateParamsList('height', filter.height ?? '');
		updateParamsList('brand', filter.brand ?? '');
		updateParamsList('radius', filter.radius ?? '');
		updateParamsList('sezon', filter.sezon ?? '');
		updateParamsList('only_studded', filter.only_studded ?? '');
		updateParamsList('model_id', filter.model_id ?? '');
		updateParamsList('country', filter.country ?? '');
		updateParamsList('year', filter.year ?? '');
		updateParamsList('load', filter.load ?? '');
		updateParamsList('speed', filter.speed ?? '');
		updateParamsList('omolog', filter.omolog ?? '');
		updateParamsList('krepeg', filter.krepeg ?? '');
		updateParamsList('typedisk', filter.typedisk ?? '');
		updateParamsList('colir', filter.colir ?? '');
		updateParamsList('jemnist', filter.jemnist ?? '');
		updateParamsList('puskovii_strum', filter.puskovii_strum ?? '');
		updateParamsList('tip_elektrolitu', filter.tip_elektrolitu ?? '');
		updateParamsList('tip_korpusu', filter.tip_korpusu ?? '');
		updateParamsList('napruga', filter.napruga ?? '');
		updateParamsList('poliarnist', filter.poliarnist ?? '');
		updateParamsList('vehicle_type', filter.vehicle_type ?? '');
		updateParamsList('li', filter.li ?? '');
		updateParamsList('si', filter.si ?? '');
		updateParamsList('only_c', filter.only_c ?? '');
		updateParamsList('only_xl', filter.only_xl ?? '');
		updateParamsList('only_owl', filter.only_owl ?? '');
		updateParamsList('only_run_flat', filter.only_run_flat ?? '');
		updateParamsList('only_off_road', filter.only_off_road ?? '');
		updateParamsList('minPrice', filter.minPrice ?? '');
		updateParamsList('maxPrice', filter.maxPrice ?? '');
		updateParamsList('etMin', filter.etMin ?? '');
		updateParamsList('etMax', filter.etMax ?? '');
		updateParamsList('diaMin', filter.diaMin ?? '');
		updateParamsList('diaMax', filter.diaMax ?? '');
		updateParamsList('minShirina', filter.minShirina ?? '');
		updateParamsList('maxShirina', filter.maxShirina ?? '');
		updateParamsList('minVisota', filter.minVisota ?? '');
		updateParamsList('maxVisota', filter.maxVisota ?? '');
		updateParamsList('minDovzina', filter.minDovzina ?? '');
		updateParamsList('maxDovzina', filter.maxDovzina ?? '');
	}, [
		filter.width,
		filter.height,
		filter.brand,
		filter.model_id,
		updateParamsList,
		filter.radius,
		filter.sezon,
		filter.only_studded,
		filter.krepeg,
		filter.typedisk,
		filter.country,
		filter.year,
		filter.load,
		filter.speed,
		filter.omolog,
		filter.colir,
		filter.jemnist,
		filter.puskovii_strum,
		filter.tip_elektrolitu,
		filter.tip_korpusu,
		filter.napruga,
		filter.poliarnist,
		filter.vehicle_type,
		filter.li,
		filter.si,
		filter.only_c,
		filter.only_xl,
		filter.only_owl,
		filter.only_run_flat,
		filter.only_off_road,
		filter.minPrice,
		filter.maxPrice,
		filter.etMin,
		filter.etMax,
		filter.diaMin,
		filter.diaMax,
		filter.minShirina,
		filter.maxShirina,
		filter.minVisota,
		filter.maxVisota,
		filter.minDovzina,
		filter.maxDovzina,
	]);

	// Function to handle form submit (update URL)
	const handleSubmit = useCallback(() => {
		const sectionTypeMap: Record<Section, string> = {
			[Section.Disks]: 'typeproduct=3&',
			[Section.Battery]: 'typeproduct=4&',
			[Section.Tires]: filter.vehicle_type ? 'typeproduct=2&' : '',
			[Section.Car]: '',
		};
		const joinedParams = `${sectionTypeMap[section] || ''}${params.join('&')}`;
		if (searchParams.toString() !== joinedParams) {
			setSearchParams(joinedParams);
		}
	}, [filter.vehicle_type, params, searchParams, section, setSearchParams]);

	return { params, handleSubmit };
};
