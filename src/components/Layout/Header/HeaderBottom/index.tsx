import { useRef, useState, type MouseEvent, type SetStateAction } from 'react';
import classNames from 'classnames';

import { useAppDispatch, useAppTranslation, useClickOutside } from '../../../../hooks';
import { resetFilter } from '../../../../store/reducers/filterSlice';
import { Link } from '../../../../lib';
import { CarDiskFilter } from './CarDiskFilter';
import { CarTireFilter } from './CarTireFilter';
import { ChevronDownIcon } from '../../../Lib/Icons';
import { links } from '../links';

export const HeaderBottom = () => {
	const [ open, setOpen ] = useState( false );
	const filterRef = useRef<HTMLDivElement>(null);
	const [ section, setSection ] = useState( 'tires' );
	const dispatch = useAppDispatch();
	const t = useAppTranslation();

	const closeFilter = () => {
		setOpen(false);
	}

	useClickOutside({ ref: filterRef, open, onClose: closeFilter });

	const handleClick = (event: MouseEvent<HTMLButtonElement>, value: SetStateAction<string>) => {
		event.stopPropagation();
		setOpen(!(open && section === value));
		if (section !== value) {
			setSection(value);
		}
	};

	return <div className='relative bg-blue-500 hidden lg:block'>
		<nav className='container mx-auto max-w-7xl flex justify-center items-center text-white text-lg font-semibold'>
			<button onClick={event => handleClick(event, 'tires')} type="button"
							className={classNames('inline-flex items-center gap-x-1.5 group transition hover:bg-blue-600 py-4 px-8', {'bg-blue-600': open && section === 'tires'})}>
				<span>{ t('cartires', true) }</span>
				<span className={classNames('transition', {'rotate-180': open && section === 'tires'})}>
					<ChevronDownIcon className='stroke-white transition' />
				</span>
			</button>
			<button onClick={event => handleClick(event, 'disks')} type="button"
							className={classNames('inline-flex items-center gap-x-1.5 group transition hover:bg-blue-600 py-4 px-8', {'bg-blue-600': open && section === 'disks'})}>
				<span>Автодиски</span>
				<span className={classNames('transition', {'rotate-180': open && section === 'disks'})}>
					<ChevronDownIcon className='stroke-white transition' />
				</span>
			</button>
			{links.map((item, index) => {
				return <Link key={ index } onClick={ () => dispatch(resetFilter()) } className='py-4 px-8 hover:bg-blue-600' to={ item.url }>
					{ t(item.title, true) }
				</Link>
			})}
			<div
				ref={filterRef}
				className={classNames('absolute left-0 right-0 top-14 z-20 flex w-full', {'hidden': !open})}>
				<div className='w-full overflow-hidden bg-white shadow-lg ring-1 ring-gray-900/5 pt-8 text-black font-normal'>
					<div className='flex-auto max-w-7xl grid grid-cols-4 mx-auto px-4'>
						{section === 'tires' ? <CarTireFilter closeFilter={closeFilter}/> :
							<CarDiskFilter closeFilter={closeFilter}/>}
					</div>
					<Link onClick={closeFilter} className='block w-full bg-[#F0F2F5] py-5 hover:bg-[#E9EBF0] text-center mt-6'
								to={`/catalog/${section}/`}>
						{t('all tires', true)}
					</Link>
				</div>
			</div>
		</nav>
	</div>
};
