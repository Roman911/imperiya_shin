import { FC, useState } from 'react';
import classNames from 'classnames';

import { useAppSelector, useAppTranslation } from '../../../hooks';
import { ChevronDownIcon, InfoIcon } from '../../Lib/Icons';
import { TooltipWithIcon } from '../../Lib';
import { Link } from '../../../lib';
import { Comments } from '../Comments';
import type { ProductProps } from '../../../models/product';
import { Language } from '../../../models/language';

const tabs = [
	{ label: 'main characteristics' },
	{ label: 'description' },
	{ label: 'reviews' }
];

interface CharacteristicsBlockProps {
	data: ProductProps | undefined
}

export const CharacteristicsBlock: FC<CharacteristicsBlockProps> = ({ data }) => {
	const [tab, setTab] = useState('main characteristics');
	const [showOptions, setShowOptions] = useState(false);
	const { section } = useAppSelector(state => state.filterReducer);
	const { lang } = useAppSelector(state => state.langReducer);
	const t = useAppTranslation();

	const link = (to: string) => {
		if(section === 'tires') {
			return `/catalog/tires?${to}`
		} else {
			return `/catalog/disks?typeproduct=3&${to}`
		}
	};

	return <section className='mt-8 md:mt-16'>
		<div className='gap-x-2.5 border-b border-[#E0E4E8] hidden md:flex'>
			{tabs.map((item, index) => {
				return <button
					key={index}
					onClick={ () => setTab(item.label) }
					className={classNames('py-4 px-5 rounded-t text-sm font-bold uppercase focus:outline-none focus:shadow-outline-blue transition-all duration-300', {
						'bg-zinc-200 text-[#575C66]': tab !== item.label,
						'bg-[#171719] text-white': tab === item.label
					})}>
					{t(item.label)}
				</button>
			})}
		</div>
		<div className='relative text-left md:hidden'>
			<button type='button' onClick={() => setShowOptions(prev => !prev)}
							className='flex items-center w-full justify-between px-3.5 py-2 bg-white border border-[#CDD0D9] rounded-sm font-medium'
							id='menu-button'>
				{ t(tab, true) }
				<div className={ classNames('transition-transform', {'rotate-180': showOptions}) }>
					<ChevronDownIcon className='stroke-black'/>
				</div>
			</button>
			<div
				className={classNames('absolute left-0 z-10 w-full border border-[#CDD0D9] bg-white shadow-lg rounded-sm', { hidden: !showOptions })} tabIndex={-1}>
				<div className="text-black px-3.5 py-2">
					{ tabs.map((item, index) => {
						return <button
							key={ index }
							onClick={ () => {
								setTab(item.label);
								setShowOptions(false);
							} }
							className='w-full text-start py-2 font-medium'
						>
							{ t(item.label, true) }
						</button>
					}) }
				</div>
			</div>
		</div>
		{ tab === 'main characteristics' && <div className='flex flex-col md:flex-row my-6 md:my-4 md:gap-10'>
			<div className='flex-1'>
				{data?.data.offer_group.width && <div className='flex md:my-4 text-sm font-medium'>
					<div
						className='w-full flex items-center text-[#575C66] after:flex-1 after:min-w-6 after:border-b after:border-dashed after:border-[#AEB6C2] after:h-px after:mt-3 after:mx-2'>
						<TooltipWithIcon label={ lang === Language.UA ? 'Ширина шини в міліметрах' : 'Ширина шины в миллиметрах' } />
						<span className='ml-2.5'>
							{ t('width', true) }
						</span>
					</div>
					<Link to={link(`width=${data?.data.offer_group.width}`)} className='text-blue-500 max-w-max w-full hover:underline'>
						{ data?.data.offer_group.width }
					</Link>
				</div>}
				{data?.data.offer_group.height && <div className='flex my-4 text-sm font-medium'>
					<div
						className='w-full flex items-center text-[#575C66] after:flex-1 after:min-w-6 after:border-b after:border-dashed after:border-[#AEB6C2] after:h-px after:mt-3 after:mx-2'>
						<TooltipWithIcon
							label={lang === Language.UA ?
								'Висота шини у відсотках від ширини, якщо висота зазначена, вважається рівною 82' :
								'Высота шины в процентах от ширины, если высота указана, считается равной 82'}
						/>
						<span className='ml-2.5'>
							{ t('height', true) }
						</span>
					</div>
					<Link to={link(`height=${data?.data.offer_group.height}`)} className='text-blue-500 max-w-max w-full hover:underline'>
						{ data?.data.offer_group.height }
					</Link>
				</div>}
				{data?.data.offer_group.diameter && <div className='flex my-4 text-sm font-medium'>
					<div
						className='w-full flex items-center text-[#575C66] after:flex-1 after:min-w-6 after:border-b after:border-dashed after:border-[#AEB6C2] after:h-px after:mt-3 after:mx-2'>
						<TooltipWithIcon
							label={lang === Language.UA ?
								'Внутрішній діаметр шини в дюймах' :
								'Внутренний диаметр шины в дюймах'}
						/>
						<span className='ml-2.5'>
							{ t('diameter', true) }
						</span>
					</div>
					<Link to={link(`radius=${data?.data.offer_group.diameter}`)} className='text-blue-500 max-w-max w-full hover:underline'>
						{ data?.data.offer_group.diameter }
					</Link>
				</div>}
				<div className='flex my-4 text-sm font-medium'>
					<div
						className='w-full flex items-center text-[#575C66] after:flex-1 after:min-w-6 after:border-b after:border-dashed after:border-[#AEB6C2] after:h-px after:mt-3 after:mx-2'>
						<InfoIcon className='fill-[#7D92B2] mr-2.5 mb-0.5'/>
						{t('speed index', true)}
					</div>
					<Link to={link(`radius=${data?.data.offer_group.diameter}`)}
								className='text-blue-500 max-w-max w-full hover:underline'>
						{lang === Language.UA ? data?.data.offer_group.speed_index : data?.data.offer_group.speed_index_ru }
					</Link>
				</div>
				<div className='flex my-4 text-sm font-medium'>
					<div
						className='w-full flex items-center text-[#575C66] after:flex-1 after:min-w-6 after:border-b after:border-dashed after:border-[#AEB6C2] after:h-px after:mt-3 after:mx-2'>
						<InfoIcon className='fill-[#7D92B2] mr-2.5 mb-0.5'/>
						{ t('load index', true) }
					</div>
					<Link to={link(`radius=${data?.data.offer_group.diameter}`)} className='text-blue-500 max-w-max w-full hover:underline'>
						{ lang === Language.UA ? data?.data.offer_group.load_index : data?.data.offer_group.load_index_ru }
					</Link>
				</div>
			</div>
			<div className='flex-1'>
				<div className='flex md:my-4 text-sm font-medium'>
					<div
						className='w-full flex items-center text-[#575C66] after:flex-1 after:min-w-6 after:border-b after:border-dashed after:border-[#AEB6C2] after:h-px after:mt-3 after:mx-2'>
						{ t('brand', true) }
					</div>
					<Link to={link(`brand=${data?.data.brand.id}`)} className='text-blue-500 max-w-max w-full hover:underline'>
						{ data?.data.brand.name }
					</Link>
				</div>
				<div className='flex my-4 text-sm font-medium'>
					<div
						className='w-full flex items-center text-[#575C66] after:flex-1 after:min-w-6 after:border-b after:border-dashed after:border-[#AEB6C2] after:h-px after:mt-3 after:mx-2'>
						{ t('model', true) }
					</div>
					<Link to={link(`model=${data?.data.brand.id}`)} className='text-blue-500 max-w-max w-full hover:underline'>
						{ data?.data.brand.name }
					</Link>
				</div>
				<div className='flex my-4 text-sm font-medium'>
					<div
						className='w-full flex items-center text-[#575C66] after:flex-1 after:min-w-6 after:border-b after:border-dashed after:border-[#AEB6C2] after:h-px after:mt-3 after:mx-2'>
						{ t('appointment', true) }
					</div>
					<div className='text-blue-500'>легкові</div>
				</div>
				<div className='flex my-4 text-sm font-medium'>
					<div
						className='w-full flex items-center text-[#575C66] after:flex-1 after:min-w-6 after:border-b after:border-dashed after:border-[#AEB6C2] after:h-px after:mt-3 after:mx-2'>
						Сезон
					</div>
					<Link to={link(`sizon=${data?.data.model.season}`)} className='text-blue-500 max-w-max w-full hover:underline'>
						{ data?.data.model.season }
					</Link>
				</div>
				<div className='flex my-4 text-sm font-medium'>
					<div
						className='w-full flex items-center text-[#575C66] after:flex-1 after:min-w-6 after:border-b after:border-dashed after:border-[#AEB6C2] after:h-px after:mt-3 after:mx-2'>
						{ t('type size', true) }
					</div>
					<Link to={link(`width=${data?.data.offer_group.width}&height=${data?.data.offer_group.height}&radius=${data?.data.offer_group.diameter}`)} className='text-blue-500 max-w-max w-full hover:underline'>
						{ `${data?.data.offer_group.width}/${data?.data.offer_group.height} R${data?.data.offer_group.diameter}` }
					</Link>
				</div>
			</div>
		</div> }
		{ tab === 'description' && <div className='my-5 md:my-6 leading-7'>
			<p>
				Lorem ipsum dolor sit amet consectetur. Mattis maecenas odio turpis in eu massa adipiscing etiam elementum.
				Risus eu sit euismod amet aliquam. Imperdiet id adipiscing enim maecenas tempor nisi viverra. Malesuada in
				tellus duis ut dictum quam. Facilisi nunc parturient pulvinar a rhoncus nisi sed.
			</p>
			<p className='mt-4'>
				Neque sed dui lorem enim augue sed malesuada. Aliquet egestas est viverra sit eu volutpat. Nec congue imperdiet
				et eget non id facilisis. Blandit pellentesque eu accumsan nunc ornare felis magna eu. Imperdiet id adipiscing
				enim maecenas tempor nisi viverra. Malesuada in tellus duis ut dictum quam. Facilisi nunc parturient pulvinar a
				rhoncus nisi sed.
			</p>
		</div> }
		{ tab === 'reviews' && <Comments
			review={ data?.data.review }
			lang={ lang }
			model_id={ data?.data.model.id }
			product_id={ data?.data.id }
			trc_id={ data?.data.trc_id }
		/>}
	</section>
};
