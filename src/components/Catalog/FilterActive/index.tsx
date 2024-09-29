import { FC } from 'react';
import classNames from 'classnames';

import { useAppTranslation } from '../../../hooks';
import { CloseIcon } from '../../Lib/Icons';
import type { BaseDataProps, ManufModels } from '../../../models/baseData';
import type { AkumProps } from '../../../models/akumData';
import { Section } from '../../../models/filter';

interface IFilter {
	[key: string]: string
}

interface FilterActiveProps {
	data: BaseDataProps | undefined
	dataAkum: AkumProps | undefined
	className: string
	searchParams: IFilter
	clearParam: (name: string) => void
	clearAllParams: () => void
	manufModels: ManufModels[] | undefined
	section: Section
}

export const FilterActiveComponent: FC<FilterActiveProps> = (
	{
		data,
		dataAkum,
		className,
		searchParams,
		clearParam,
		clearAllParams,
		manufModels,
		section
	}) => {
	const t = useAppTranslation();

	const renderItem = (name: string, label: string | null) => {
		return <div key={ name } className='p-1 bg-gray-500 text-white text-sm font-medium rounded-full flex items-center gap-1 hover:bg-gray-600'>
			<span className='ml-1.5'>{ label }</span>
			<button onClick={() => clearParam(name)}>
				<CloseIcon className='fill-[#A8AFB6]'/>
			</button>
		</div>
	}

	return <div
		className={
		classNames('mb-4 flex-wrap justify-end gap-x-2 gap-y-3 lg:gap-4 text-end bg-blue-50 lg:bg-transparent p-4 lg:p-0', className)}
	>
		{Object.keys(searchParams).filter(item => searchParams[item]).map(item => {
			let label = searchParams[item as keyof IFilter];
			if(item === 'brand') {
				if(section === Section.Battery) {
					const brand = dataAkum?.brand_akum?.find(i => i.value === +searchParams[item as keyof IFilter]);
					label = brand ? brand.label : '';
				} else if(section === Section.Disks) {
					const brand = data?.brand_disc?.find(i => i.value === +searchParams[item as keyof IFilter]);
					label = brand ? brand.label : '';
				} else {
					const brand = data?.brand?.find(i => i.value === +searchParams[item as keyof IFilter]);
					label = brand ? brand.label : '';
				}
			}
			if(item === 'model_id') {
				const modelId = manufModels?.find(i => i.value === +searchParams[item as keyof ManufModels]);
				label = modelId ? modelId.label : '';
			}
			if(item === 'sezon') {
				if(searchParams[item] === '1') {
					label = t('summer', true);
				} else if(searchParams[item] === '2') {
					label = t('winter', true);
				} else if(searchParams[item] === '3') {
					label = t('all season', true);
				} else {
					return;
				}
			}
			if(item === 'only_studded') {
				label = 'Шип';
			}
			if(item === 'typedisk') {
				if(searchParams[item] === '1') {
					label = t('steel', true);
				} else if(searchParams[item] === '2') {
					label = t('forged', true);
				} else if(searchParams[item] === '3') {
					label = t('cast', true);
				} else {
					return;
				}
			}
			return renderItem(item, label)
		})}
		{Object.keys(searchParams).length !== 0 && <button onClick={() => clearAllParams()} className='flex items-center gap-2 text-sm font-medium group text-gray-500'>
			{t('reset everything', true)}
			<CloseIcon className='fill-[#B9B9BA] hidden lg:block'/>
		</button>}
	</div>
};
