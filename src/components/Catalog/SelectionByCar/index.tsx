import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '../../../hooks';
import { baseDataAPI } from '../../../services/baseDataService';
import { Section, Subsection } from '../../../models/filter';
import { Link } from '../../../lib';

export const SelectionByCar = () => {
	const navigate = useNavigate();
	const { section, subsection } = useAppSelector(state => state.filterReducer);
	const { filter } = useAppSelector(state => state.filterCarReducer);
	const { data } = baseDataAPI.useFetchKitTyreSizeQuery(`${filter.modification}`);
	const { data: diskSize } = baseDataAPI.useFetchKitDiskSizeQuery(`${filter.modification}`);

	useEffect(() => {
		if(data?.length !== 0) {
			navigate(`?width=${ data?.[0].width }&height=${ data?.[0].height }&radius=${ data?.[0].diameter }`)
		}
	}, [data, navigate]);

	if(subsection === Subsection.ByParams || data?.length === 0) return null;

	return <div className='mb-5 border-y py-4'>
		<div className='text-gray-500'>Ваш авто:</div>
		<div className='font-bold mt-2'>
			{ `${ data?.[0].kits.car2_model.car2_brand.name } ${ data?.[0].kits.car2_model.name } ${ data?.[0].kits.name } (${ data?.[0].kits.year })` }
		</div>
		<h6 className='text-gray-500 mt-4'>Заводські</h6>
		<div className='flex gap-2 text-sm font-bold mt-2'>
			{section === Section.Tires ? data?.filter(i => i.type === 1).map(item => {
				return <Link className='text-blue-500' key={ item.value } to={ `?width=${ item.width }&height=${ item.height }&radius=${ item.diameter }` } >
					{ `${ item.width }/${ item.height } R${ item.diameter }` }
				</Link>
			}) : diskSize?.filter(i => i.type === 1).map(item => {
				return <Link className='text-blue-500' key={ item.value } to={ `?typeproduct=3&width=${ item.width }&radius=${ item.diameter }&krepeg=${ item.kits.bolt_count }x${ item.kits.pcd }&et=${ item.et }&dia=${ item.kits.dia }` } >
					{ `${ item.width }x${ item.diameter } ${ item.kits.bolt_count }x${ item.kits.pcd } ET${ item.et } DIA${ item.kits.dia }` }
				</Link>})}
		</div>
		<h6 className='text-gray-500 mt-4'>Альтернатива</h6>
		<div className='flex flex-wrap gap-2 text-sm font-bold mt-2'>
			{section === Section.Tires ? data?.filter(i => i.type === 2).map(item => {
				return <Link className='text-blue-500' key={ item.value } to={ `?width=${ item.width }&height=${ item.height }&radius=${ item.diameter }` } >
					{ `${ item.width }/${ item.height } R${ item.diameter }` }
				</Link>
			}) : diskSize?.filter(i => i.type === 2).map(item => {
				return <Link className='text-blue-500' key={ item.value } to={ `?typeproduct=3&width=${ item.width }&radius=${ item.diameter }&krepeg=${ item.kits.bolt_count }x${ item.kits.pcd }&et=${ item.et }&dia=${ item.kits.dia }` } >
					{ `${ item.width }x${ item.diameter } ${ item.kits.bolt_count }x${ item.kits.pcd } ET${ item.et } DIA${ item.kits.dia }` }
				</Link>})}
		</div>
	</div>
};
