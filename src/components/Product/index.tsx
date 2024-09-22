import { FC, Dispatch, SetStateAction } from 'react';
import './index.scss';

import { useAppSelector, useAppTranslation } from '../../hooks';
import { InfoBlock } from './InfoBlock';
import { ActionsBlock } from './ActionsBlock';
import { ImgGallery } from './ImageGallery';
import { CharacteristicsBlock } from './CharacteristicsBlock';
import { countryCodeTransform, Link } from '../../lib';
import { CountryInfo, Quantity, Rating, Spinner } from '../Lib';
import { CartIcon } from "../Lib/Icons";
import truckIcon from '../../assets/icons/truck-icon.svg';
import { Language } from '../../models/language';
import type { ProductProps } from '../../models/product';
import noPhoto from '../../assets/no-photo.s400.jpg';

interface ProductComponentProps {
	data: ProductProps | undefined
	isLoading: boolean
	offerId: number
	quantity: number
	onChange: (e: { target: HTMLInputElement }) => void
	handleClick: (id: number) => void
	onSubmit: () => void
	setQuantity: Dispatch<SetStateAction<number>>
	handleModalOpen: (type: 'QuickOrder' | 'OnlineInstallment' | 'DeliveryCalculation') => void
}

export const ProductComponent: FC<ProductComponentProps> = (
	{
		data,
		isLoading,
		offerId,
		quantity,
		onChange,
		onSubmit,
		handleClick,
		handleModalOpen,
		setQuantity
	}) => {
	const { lang } = useAppSelector(state => state.langReducer);
	const { cartItems } = useAppSelector(state => state.cartReducer);
	const t = useAppTranslation();

	const { id = 0, full_name = '', offers = [], min_price = 0, photo, model, labels } = data?.data || {};
	const offer = offers.find(item => item.offer_id === offerId);

	const imgArr = data?.data.photos.urls ? data.data.photos.urls.map(item => {
		return {
			original: item.big,
			thumbnail: item.small
		}
	}) : [];

	const images = [{
		original: photo?.url_part2 || '',
		thumbnail: photo?.url_part || '',
	}, ...imgArr];

	const icon = (season: string) => {
		if(season === '1') {
			return <img src="/images/sun-icon.svg" alt=""/>
		} else if(season === '2') {
			return <img src="/images/snow-icon.svg" alt=""/>
		} else if(season === '3') {
			return <img src="/images/cloud-icon.svg" alt=""/>
		}

		return null;
	}

	const onSetQuantity = (_: number,quan: number) => {
		setQuantity(quan);
	}

	return <section className='product-page flex flex-col lg:flex-row justify-between gap-1 xl:gap-x-6 mt-10'>
		<div className='max-w-[900px] flex-1 pr-3 xl:pr-5'>
			<Spinner height='h-96' show={ isLoading }>
				{data?.result &&
					<div className='flex flex-col md:flex-row items-center md:items-start md:border-b border-[#DEE2EB]'>
						<div className='gallery w-64 relative mb-7 pt-10 pb-5'>
							<div className='absolute z-10 -mt-10 w-full flex justify-between items-start'>
								<div>
									{labels?.length !== 0 && labels?.map(item => {
										return <div key={item.label_id}
																className='text-center text-xs font-semibold text-white uppercase py-1.5 px-2.5 max-w-max rounded-sm my-1'
																style={{backgroundColor: item.label.color}}>
											{lang === Language.UA ? item.label.name : item.label.name_ru}
										</div>
									})}
									{ model?.season && icon(model?.season) }
								</div>
								{ model?.brand_image && <img className='max-w-28 object-contain' src={ model?.brand_image } alt=""/> }
							</div>
							{ photo?.url_part === '' ? <img src={ noPhoto } alt="" /> : <ImgGallery images={images } /> }
						</div>
						<ActionsBlock className='flex md:hidden'/>
						<div className='flex-1 md:ml-6 xl:ml-20'>
							<h1 className='text-2xl font-bold mt-8 md:mt-0'>{ full_name }</h1>
							<div className='flex justify-between items-center mt-5'>
								<div className=''>
									<div className='text-[15px] text-gray-500 mr-5 max-w-max mb-2'>Артикул: {id}</div>
									<Rating commentsCount={undefined} commentsAvgRate={0}/>
								</div>
								<ActionsBlock className='hidden md:flex' />
							</div>
							<div className='mt-7 md:mt-11'>
								<div className='flex items-end'>
									<div className='mr-2.5 text-xl font-medium'>{t('from')}</div>
									<div className='text-4xl font-bold mr-2.5'>{min_price} ₴</div>
									<div className='text-xl font-medium'>/шт.</div>
								</div>
								<div className='mt-3 text-gray-500'>{t('from')} <span className='font-bold'>{min_price * 4}</span> за 4
									шт.
								</div>
							</div>
							<div className='offers mt-7'>
								{offers.map(item => {
									return <div key={item.offer_id} onClick={() => handleClick(item.offer_id)}
															className='offers__item cursor-pointer grid md:grid-cols-9 gap-4 mt-3 py-3.5 md:py-0 px-5 md:px-0 bg-white md:bg-transparent border md:border-0 rounded-full'>
										<div className='input flex flex-row md:col-span-2 relative'>
											<input type="checkbox" onChange={() => handleClick(item.offer_id)} checked={item.offer_id === offerId} className='appearance-none h-6 w-6 bg-white rounded-full border border-zinc-400 hover:border-blue-500 checked:border-blue-500 transition-all duration-200 peer'/>
											<div
												className='h-4 w-4 absolute inset-1 rounded-full peer-checked:border-blue-500 peer-checked:bg-blue-500'/>
											<label className='flex ml-2.5 md:ml-7 flex-col justify-center text-sm font-medium cursor-pointer'>{item.quantity} шт.</label>
										</div>
										<div className='country md:col-span-4'>
											<CountryInfo country={lang === Language.UA ? item.country : item.country_ru} countryCode={countryCodeTransform(item.country)} year={item.year}/>
										</div>
										<div className='price md:col-span-2 text-lg md:text-sm font-bold content-center'>{item.price} грн</div>
									</div>
								})}
							</div>
						</div>
					</div>}
			</Spinner>
			<div className='purchase-information grid justify-self-stretch mt-5 md:mt-10'>
				<Quantity id={ 0 } quantity={ quantity } offerQuantity={ (Number(offer?.quantity) || 0) } price={ offer?.price } onChange={ onChange } setQuantity={ onSetQuantity } />
				<button
					onClick={() => handleModalOpen('DeliveryCalculation')}
					className='delivery-calculation btn white mt-6 text-sm font-medium w-full md:w-72'>
					<img className='mr-2.5' src={truckIcon} alt=""/>
					{t('delivery calculation', true)}
				</button>
				<div className='buttons-buy md:justify-self-end'>
					{cartItems.find(item => item.id === offerId) ?
						<Link to={`/cart`} className='btn success uppercase w-full md:w-72'>
							<span className='ml-2.5'>{ lang === Language.UA ? 'Перейти до кошика' : 'Перейти в корзину' }</span>
						</Link> :
						<button onClick={() => onSubmit()} className='btn primary uppercase w-full md:w-72'>
							<CartIcon className='stroke-white'/>
							<span className='ml-2.5'>{t('buy')}</span>
						</button>
					}
					<button onClick={() => handleModalOpen('QuickOrder')}
									className='btn white uppercase mt-2.5 w-full md:w-72'>
						<span className='ml-2.5'>{t('quick order')}</span>
					</button>
				</div>
			</div>
			<CharacteristicsBlock data={ data } />
		</div>
		<InfoBlock/>
	</section>
};
