import { FC, useState } from 'react';
import classNames from 'classnames';

import styles from './index.module.scss';
import { useAppDispatch, useAppTranslation } from '../../../hooks';
import { changeSection } from '../../../store/reducers/filterSlice';

import { Tab } from './Tab';
import { TiresFilter } from './TiresFilter';
import { DisksFilter } from './DisksFilter';
import { FilterByCar } from '../../../containers/Home/FilterByCar';

import { Section } from '../../../models/filter';
import type { Options } from '../../../models/baseData';
import type { OnChange } from '../../../models/filterHomePage';

interface IFilterProps {
	section: Section
	data: {
		focusValue?: string
		label: string
		name: string
		options: Options[] | undefined
	}[]
	onChange: OnChange
	onSubmit: () => void
	additionalFilter?: 'tires' | 'disks'
}

export const FilterComponent: FC<IFilterProps> = ({ data, section, onChange, onSubmit, additionalFilter }) => {
	const [isOpen, setOpen] = useState(false);
	const dispatch = useAppDispatch();
	const t = useAppTranslation();

	const handleClick = (value: Section) => {
		const newOpenState = !(section === value && isOpen);
		setOpen(newOpenState);
		dispatch(changeSection(newOpenState ? value : Section.Tires));
	};

	const renderFilter = () => {
		switch(section) {
			case Section.Disks:
				return <DisksFilter filters={data} onChange={onChange} onSubmit={onSubmit} additionalFilter={ additionalFilter } />;
			case Section.Car:
				return <FilterByCar additionalFilter={ additionalFilter } />;
			default:
				return <TiresFilter filters={data} onChange={onChange} onSubmit={onSubmit} additionalFilter={ additionalFilter } />;
		}
	};

	return <div className={additionalFilter ? '' : styles['home-filter']}>
		<div className={classNames({ 'container mx-auto py-6 lg:py-16 xl:py-24 px-4': !additionalFilter })}>
			<div className={classNames('mt-2 md:mt-11 mb-8 flex justify-center gap-x-2.5 text-blue-300', { 'hidden': additionalFilter })}>
				<Tab name={Section.Tires} section={section} isOpen={isOpen} handleClick={handleClick} label={t('tires')}/>
				<Tab name={Section.Disks} section={section} isOpen={isOpen} handleClick={handleClick} label={t('disks')}/>
				<Tab name={Section.Car} section={section} isOpen={isOpen} handleClick={handleClick} label={t('by car')}/>
			</div>
			<div className="">{ renderFilter() }</div>
		</div>
	</div>
};
