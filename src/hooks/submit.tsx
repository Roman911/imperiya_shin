import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from './redux';
import {Section} from "../models/filter.ts";

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
		updateParamsList('brand_disc', filter.brand_disc ?? '');
		updateParamsList('jemnist', filter.jemnist ?? '');
		updateParamsList('puskovii_strum', filter.puskovii_strum ?? '');
		updateParamsList('tip_elektrolitu', filter.tip_elektrolitu ?? '');
		updateParamsList('tip_korpusu', filter.tip_korpusu ?? '');
		updateParamsList('napruga', filter.napruga ?? '');
		updateParamsList('poliarnist', filter.poliarnist ?? '');
		updateParamsList('vehicle_type', filter.vehicle_type ?? '');
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
		filter.brand_disc,
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
		filter.vehicle_type
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
