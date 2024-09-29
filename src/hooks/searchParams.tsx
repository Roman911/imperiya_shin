import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

interface FilterParams {
	[key: string]: string;
}

const PARAM_KEYS = [
	'width',
	'height',
	'radius',
	'sezon',
	'only_studded',
	'brand',
	'model_id',
	'country',
	'year',
	'load',
	'speed',
	'omolog',
	'krepeg',
	'typedisk',
	'colir',
	'jemnist',
	'puskovii_strum',
	'tip_elektrolitu',
	'tip_korpusu',
	'napruga',
	'poliarnist',
	'li',
	'si'
] as const;

export const useAppSearchParams = () => {
	const [filter, setFilter] = useState<FilterParams>({});
	const [searchParams] = useSearchParams();

	useEffect(() => {
		const newFilter: FilterParams = {};

		PARAM_KEYS.forEach(key => {
			const value = searchParams.get(key);
			if(value) newFilter[key] = value;
		});

		setFilter(newFilter);
	}, [searchParams]);

	return filter;
};
