import { FC, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAppTranslation } from '../../../../hooks';

interface SelectFromTo {
	name: string
	nameMin: string
	nameMax: string
	from: number
	to: number
	title: string
	btnTitle: string
	minus?: boolean
}

export const SelectFromTo: FC<SelectFromTo> = ({ nameMin, nameMax,  from, to, title, btnTitle, minus }) => {
	const [minMax, setMinMax] = useState({ min: '', max: '' });
	const [, setSearchParams] = useSearchParams();
	const t = useAppTranslation();

	const onChange = (param: string, value: string) => {
		const onlyNumbers = value.replace( minus ? /[^\d-]/g : /\D/g, '');
		setMinMax({...minMax, [param]: onlyNumbers});
	}

	const handleClick = () => {
		const updateParams = (key: string, value: string) => {
			setSearchParams(params => {
				if (value.length > 0) {
					params.set(key, value);
				} else {
					params.delete(key);
				}
				return params;
			});
		};

		updateParams(nameMin, minMax.min);
		updateParams(nameMax, minMax.max);
	};

	return <div className='mt-5'>
		<div className='text-sm font-bold text-gray-500 uppercase'>{ title }</div>
		<div className='flex gap-2 mt-3'>
			<div
				className='flex h-10 rounded mx-auto bg-white p-0.5 mt-4 lg:mt-0 border border-gray-300 w-full lg:max-w-[600px]'>
				<input
					type="text"
					value={ minMax.min }
					maxLength={ 6 }
					onChange={ event => onChange('min', event.target.value) }
					className="w-full flex bg-transparent pl-4 text-[15px] text-gray-500 font-medium outline-0"
					placeholder={ `${ t('from', true) } ${ from }` }
				/>
			</div>
			<div
				className='flex h-10 rounded mx-auto bg-white p-0.5 mt-4 lg:mt-0 border border-gray-300 w-full lg:max-w-[600px]'>
				<input
					type="text"
					value={ minMax.max }
					maxLength={ 6 }
					onChange={ event => onChange('max', event.target.value) }
					className="w-full flex bg-transparent pl-4 text-[15px] text-gray-500 font-medium outline-0"
					placeholder={ `До ${ to }` }
				/>
			</div>
		</div>
		<button onClick={() => handleClick()} className='btn black max-w-full uppercase mt-4 mb-4'>
			{ btnTitle }
		</button>
	</div>
};
