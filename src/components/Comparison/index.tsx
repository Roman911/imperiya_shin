import { FC } from 'react';

import { useAppSelector, useAppTranslation } from '../../hooks';
import type { Data } from '../../models/products';
import {Language} from "../../models/language.ts";
import {CartIcon} from "../Lib/Icons";
import {CloseButton} from "../Lib";

interface ComparisonProps {
	data: Data | undefined
	resetEverything: () => void
	handleClick: (id: number) => void
}

export const ComparisonComponent: FC<ComparisonProps> = ({ data, resetEverything, handleClick }) => {
	const { lang } = useAppSelector(state => state.langReducer);
	const t = useAppTranslation();

	return <div className='flex relative'>
		<div className='w-28 md:w-60 px-2'>
			<div className='relative pt-9 md:pt-2 pb-2'>
				{ lang === Language.UA ? 'Скинути все' : 'Сбросить все' }
				<CloseButton handleClick={ resetEverything } />
			</div>
			<div className='mt-48 md:mt-52 text-center md:text-end font-bold'>
				<div className='pr-2.5 h-11 md:leading-[44px] border-b border-transparent'>Сезон:</div>
				<div className='pr-2.5 h-11 md:leading-[44px] border-b border-transparent'>{t('car type', true)}:</div>
				<div className='pr-2.5 h-11 md:leading-[44px] border-b border-transparent'>Ширина:</div>
				<div className='pr-2.5 h-11 md:leading-[44px] border-b border-transparent'>{t('profile height', true)}:</div>
				<div className='pr-2.5 h-11 md:leading-[44px] border-b border-transparent'>{t('diameter', true)}:</div>
				<div className='pr-2.5 h-11 md:leading-[44px] border-b border-transparent'>{t('country', true)}:</div>
				<div className='pr-2.5 h-11 md:leading-[44px] border-b border-transparent'>{t('price', true)}:</div>
			</div>
		</div>
		<div className='flex-1 w-[calc(100%-15rem)]'>
			<div className='flex overflow-x-auto overflow-y-hidden whitespace-nowrap max-w-full'>
				{data?.products.map(item => {
					return <div key={item.group}>
						<div className='w-60 relative m-1'>
							<CloseButton handleClick={ () => handleClick(item.product_id) } />
							<img src={ item.default_photo } alt=""/>
							<div className='absolute bottom-0 px-2 text-center bg-gray-500 rounded-sm h-20 flex items-center justify-center w-full whitespace-normal'>
								<p className='text-white text-center font-bold'>{item.full_name}</p>
							</div>
						</div>
						<div className='divide-y divide-[#D0D4D9] text-center'>
							<div className='h-11 leading-[44px]'>{item.season}</div>
							<div className='h-11 leading-[44px]'>{item.vehicle_type}</div>
							<div className='h-11 leading-[44px]'>175</div>
							<div className='h-11 leading-[44px]'>65</div>
							<div className='h-11 leading-[44px]'>{item.diameter}</div>
							<div
								className='h-11 leading-[44px]'>{lang === Language.UA ? item.best_offer.country : item.best_offer.country_ru}</div>
							<div className='h-11 leading-[44px] font-bold bg-[#E1E8F5]'>{item.best_offer.price} ₴</div>
							<div className='pt-8 pb-14'>
								<button onClick={() => console.log('buy')} className='btn primary uppercase w-full md:w-52 mx-auto'>
									<CartIcon className='stroke-white'/>
									<span className='ml-2.5'>{t('buy')}</span>
								</button>
							</div>
						</div>
					</div>
				})}
			</div>
		</div>
	</div>
};
