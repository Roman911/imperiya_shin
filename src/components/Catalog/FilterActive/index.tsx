import { FC } from 'react';
import classNames from 'classnames';

import { useAppTranslation } from '../../../hooks';
import { CloseIcon } from '../../Lib/Icons';
import type { BaseDataProps, ManufModels } from '../../../models/baseData';
import type { AkumProps } from '../../../models/akumData';
import { Section } from '../../../models/filter';
import { IFilter } from '../../../containers/Catalog/seoType';

interface FilterActiveProps {
	data: BaseDataProps | undefined
	dataAkum: AkumProps | undefined
	className: string
	searchParams: IFilter | undefined
	clearParam: (name: keyof IFilter) => void
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

	const renderItem = (name: keyof IFilter, label: string | number | null) => {
		return (
			<div key={name} className='p-1 bg-gray-500 text-white text-sm font-medium rounded-full flex items-center gap-1 hover:bg-gray-600'>
				<span className="ml-1.5">{label}</span>
				<button onClick={() => clearParam(name)}>
					<CloseIcon className="fill-[#A8AFB6]" />
				</button>
			</div>
		);
	};

	return <div
		className={
		classNames('mb-4 flex-wrap justify-end gap-x-2 gap-y-3 lg:gap-4 text-end bg-blue-50 lg:bg-transparent p-4 lg:p-0', className)}
	>
		{searchParams && Object.keys(searchParams || {}).filter(item => searchParams && searchParams[item as keyof IFilter]).map(item => {
			let label = searchParams[item as keyof IFilter];

			// Example: Additional check if label is null or undefined
			if (label == null) return null; // Skip rendering if label is null

			if (item === 'brand') {
				if (section === Section.Battery && dataAkum?.brand_akum) {
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-expect-error
					const brand = dataAkum.brand_akum.find(i => i.value === +searchParams[item as keyof IFilter]);
					label = brand ? brand.label : '';
				}

				else if (section === Section.Disks && data?.brand_disc) {
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-expect-error
					const brand = data.brand_disc.find(i => i.value === +searchParams[item as keyof IFilter]);
					label = brand ? brand.label : '';
				}

				else if (data?.brand) {
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-expect-error
					const brand = data.brand.find(i => i.value === +searchParams[item as keyof IFilter]);
					label = brand ? brand.label : '';
				}
			}

			if (item === 'model_id') {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-expect-error
				const modelId = manufModels?.find(i => i.value === +searchParams[item as keyof IFilter]);
				label = modelId ? modelId.label : '';
			}

			if (item === 'sezon') {
				if (searchParams[item] === '1') {
					label = t('summer', true);
				} else if (searchParams[item] === '2') {
					label = t('winter', true);
				} else if (searchParams[item] === '3') {
					label = t('all season', true);
				} else {
					return null; // Return null if the season value is not valid
				}
			}

			if (item === 'only_studded') {
				label = 'Шип';
			}

			if (item === 'typedisk') {
				if (searchParams[item] === '1') {
					label = t('steel', true);
				} else if (searchParams[item] === '2') {
					label = t('forged', true);
				} else if (searchParams[item] === '3') {
					label = t('cast', true);
				} else {
					return null; // Return null if the type value is not valid
				}
			}

			// Double-check that label is not null or undefined before rendering
			if (label == null) return null;

			return renderItem(item as keyof IFilter, searchParams[item as keyof IFilter] || null);
		})}
		{searchParams && Object.keys(searchParams).length !== 0 && <button onClick={() => clearAllParams()} className='flex items-center gap-2 text-sm font-medium group text-gray-500'>
			{t('reset everything', true)}
			<CloseIcon className='fill-[#B9B9BA] hidden lg:block'/>
		</button>}
	</div>
};
