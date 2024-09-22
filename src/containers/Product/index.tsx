import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { baseDataAPI } from '../../services/baseDataService';
import { useAppDispatch, useAppTranslation } from '../../hooks';
import { addCart } from '../../store/reducers/cartSlice';
import { changeSection } from '../../store/reducers/filterSlice';
import { ProductList } from '../ProductList';
import Modal from '../Modals';
import { QuickOrder } from '../Modals/QuickOrder';
import { DeliveryCalculation } from '../Modals/DeliveryCalculation';
import { OnlineInstallment } from '../../components/Modals';
import { LayoutWrapper } from '../../components/Layout';
import { ProductComponent } from '../../components/Product';
import { TextSeo } from '../../components/Home';
import { Spinner, Title } from '../../components/Lib';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Section } from '../../models/filter';

type CartItem = {
	id: number;
	quantity: number;
};

export const Product = () => {
	const [isModalActive, setModalActive] = useState(false);
	const [offerId, setOfferId] = useState(0);
	const [quantity, setQuantity] = useState(1);
	const dispatch = useAppDispatch();
	const [modalType, setModalType] = useState('QuickOrder');
	const location = useLocation();
	const match = location.pathname.match(/(\d+)$/);
	const { data, isLoading } = baseDataAPI.useFetchProductQuery(match![1]);
	const { data: dataProduct, isLoading: productIsLoading } = baseDataAPI.useFetchProductsQuery({ id: '', length: 4 });
	const t = useAppTranslation();
	const section = /dia/.test(location.pathname) ? 'disks' : 'tires';
	const offer = data?.data.offers.find(item => item.offer_id === offerId);

	useEffect(() => {
		if(data) {
			setOfferId(data.data.offers[0].offer_id);
		}
	}, [data]);

	useEffect(() => {
		if(data && section === 'disks') {
			dispatch(changeSection(Section.Disks));
		}
	}, [data, dispatch, section]);

	const handleModalOpen = (type: 'QuickOrder' | 'OnlineInstallment' | 'DeliveryCalculation') => {
		setModalActive(true);
		setModalType(type)
	};

	const handleModalClose = () => {
		setModalActive(false);
	};

	const path = [
		{
			id: 1,
			title: t(section, true),
			url: `/catalog/${section === 'disks' ? section + '?typeproduct=3' : section}`
		},
		{
			id: 2,
			title: data ? data?.data.full_name : '',
			url: `/${section}`
		}
	];

	const handleClick = (id: number) => {
		setOfferId(id);
		setQuantity(1);
	}

	const onChange = (e: { target: HTMLInputElement }) => {
		const value = e.target.value;
		const onlyNumbers = value.replace(/\D/g, '');
		const numericValue = Number(onlyNumbers);

		setQuantity(numericValue < Number(offer?.quantity) ? numericValue : Number(offer?.quantity));
	}

	const onSubmit = () => {
		const cartStorage = localStorage.reducerCart ? JSON.parse(localStorage.reducerCart) as CartItem[] : [];
		const cart = [ ...cartStorage, { id: offerId, quantity }];
		dispatch(addCart({ id: offerId, quantity }));
		localStorage.setItem('reducerCart', JSON.stringify(cart));
	}

	return <div>
		<LayoutWrapper>
			<Breadcrumbs path={ path } />
			<ProductComponent
				data={ data }
				quantity={ quantity }
				handleModalOpen={ handleModalOpen }
				isLoading={ isLoading }
				offerId={ offerId }
				onChange={ onChange }
				handleClick={ handleClick }
				setQuantity={ setQuantity }
				onSubmit={ onSubmit }
			/>
		</LayoutWrapper>
		<div className='container mx-auto'>
			<Title title={ t('similar products', true) } />
			<Spinner height='h-40' show={ productIsLoading } >
				<ProductList
					classnames='grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-3 md:px-0'
					data={ dataProduct?.data }
				/>
			</Spinner>
			<Title title='recently viewed' />
			<Spinner height='h-40' show={ productIsLoading } >
				<ProductList
					classnames='grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-3 md:px-0'
					data={ dataProduct?.data }
				/>
			</Spinner>
		</div>
		<TextSeo />
		{isModalActive && (
			<Modal onClose={ handleModalClose } size={modalType === 'OnlineInstallment' ? 'max-w-6xl' : 'sm:max-w-lg'}>
				{ modalType === 'QuickOrder' && <QuickOrder /> }
				{ modalType === 'OnlineInstallment' && <OnlineInstallment /> }
				{ modalType === 'DeliveryCalculation' && <DeliveryCalculation offer_id={ data?.data.id } /> }
			</Modal>
		)}
	</div>
};
