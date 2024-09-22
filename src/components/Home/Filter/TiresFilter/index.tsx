import { FC } from 'react';
import classNames from 'classnames';

import { useAppTranslation } from '../../../../hooks';
import { MySelect } from '../Select';
import type { FilterProps } from '../../../../models/filterHomePage';

interface TiresFilterProps extends FilterProps {
	additionalFilter?: 'tires' | 'disks'
}

export const TiresFilter: FC<TiresFilterProps> = ({ filters, onChange, onSubmit, additionalFilter }) => {
	const t = useAppTranslation();

	return <>
		<div className={ classNames('grid gap-2.5 md:mt-7', { 'grid-cols-1 md:grid-cols-6': additionalFilter, 'grid-cols-1 md:grid-cols-3 lg:grid-cols-6': !additionalFilter }) }>
			{filters.map((item, index) => {
				const style = classNames(index < 3 ? 'md:col-span-2' : 'md:col-span-3');
				return <div key={item.name} className={ additionalFilter ? style : '' }>
					<MySelect
						name={item.name}
						label={item.label}
						options={item.options}
						onChange={onChange}
					/>
				</div>
			})}
			<button
				onClick={() => onSubmit()}
				className={classNames('btn md:h-[70px] mt-4 secondary w-full uppercase', { 'md:col-span-6': additionalFilter, 'md:mt-0': !additionalFilter })}
			>
				{t('choose')}
			</button>
		</div>
	</>
};
