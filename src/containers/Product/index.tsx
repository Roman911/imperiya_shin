import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { baseDataAPI } from '../../services/baseDataService';
import { addToStorage, getFromStorage } from '../../lib';
import { useAppDispatch, useAppTranslation } from '../../hooks';
import { addCart } from '../../store/reducers/cartSlice';
import { changeSection } from '../../store/reducers/filterSlice';
import Modal from '../Modals';
import { AddAskModal } from '../Modals/AddAsk';
import { QuickOrder } from '../Modals/QuickOrder';
import { Callback } from '../Modals/Callback';
import { DeliveryCalculation } from '../Modals/DeliveryCalculation';
import { OnlineInstallment } from '../../components/Modals';
import { LayoutWrapper } from '../../components/Layout';
import { ProductComponent } from '../../components/Product';
import { Support } from '../../components/Home';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Section } from '../../models/filter';
import { SimilarProducts } from './SimilarProducts';
import { RecentlyViewed } from './RecentlyViewed';
import { Bookmarks } from './Bookmarks';

export const Product = () => {
	const [isModalActive, setModalActive] = useState(false);
	const [offerId, setOfferId] = useState(0);
	const [quantity, setQuantity] = useState(1);
	const dispatch = useAppDispatch();
	const [modalType, setModalType] = useState('QuickOrder');
	const location = useLocation();
	const match = location.pathname.match(/(\d+)$/);
	const { data, isLoading } = baseDataAPI.useFetchProductQuery(match![1]);
	const t = useAppTranslation();
	const section = /dia/.test(location.pathname) ? Section.Disks : /ah/.test(location.pathname) ? Section.Battery : Section.Tires;
	const offer = data?.data.offers.find(item => item.offer_id === offerId);
	const id: string[] = [];
	const pushIfExists = (key: string, value: string | number | undefined) => {
		if (value) id.push(`${key}=${value}`);
	};

	if (section === Section.Disks) {
		pushIfExists('width', data?.data.offer_group.width);
		pushIfExists('radius', data?.data.offer_group.diameter);
		pushIfExists('typedisk', data?.data.offer_group.id_typedisc);
	} else if (section === Section.Tires) {
		pushIfExists('width', data?.data.offer_group.width);
		pushIfExists('height', data?.data.offer_group.height);
		pushIfExists('radius', data?.data.offer_group.diameter);
	}

	useEffect(() => {
		const storage = getFromStorage('reducerRecentlyViewed');
		const matchValue = match?.[0] ? Number(match[0]) : undefined;

		if (typeof matchValue === 'number' && !isNaN(matchValue)) {
			const updatedStorage = storage.filter((item: { id: number, section: Section }) => item.id !== matchValue);
			const deleteElement = updatedStorage.length === 4 ? updatedStorage.slice(1,3) : updatedStorage;
			addToStorage('reducerRecentlyViewed', [...deleteElement, {id: matchValue, section}]);
		}
	}, [match, section]);

	useEffect(() => {
		if(data) {
			setOfferId(data.data.offers[0].offer_id);
		}
	}, [data]);

	useEffect(() => {
		if(data) {
			if(section === 'disks') {
				dispatch(changeSection(Section.Disks));
			} else if(section === 'battery') {
				dispatch(changeSection(Section.Battery));
			}
		}
	}, [data, dispatch, section]);

	const handleModalOpen = (type: 'QuickOrder' | 'OnlineInstallment' | 'DeliveryCalculation' | 'Callback' | 'AddAsk') => {
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
			url: `/catalog/${section === 'disks' ? section + '?typeproduct=3' : section === 'battery' ? '?typeproduct=4' : section}`
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
		const cartStorage = getFromStorage('reducerCart');
		const cart = [ ...cartStorage, { id: offerId, section, quantity }];
		dispatch(addCart({ id: offerId, section, quantity }));
		addToStorage('reducerCart', cart);
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
				section={ section }
			/>
		</LayoutWrapper>
		<div className='container mx-auto'>
			<SimilarProducts id={ id.join('&') } />
			<RecentlyViewed />
			<Bookmarks />
		</div>
		<Support />
		{isModalActive && (
			<Modal onClose={ handleModalClose } size={modalType === 'OnlineInstallment' ? 'max-w-6xl' : 'sm:max-w-lg'}>
				{ modalType === 'QuickOrder' &&
					<QuickOrder offerId={ offerId } quantity={ quantity } offerItem={ data?.data?.offers?.find(item => item.offer_id === offerId) } setModalActive={ setModalActive } />}
				{ modalType === 'OnlineInstallment' && <OnlineInstallment /> }
				{ modalType === 'DeliveryCalculation' && <DeliveryCalculation offer_id={ data?.data.id } handleModalClose={ handleModalClose } /> }
				{ modalType === 'OnlineInstallment' && <OnlineInstallment /> }
				{ modalType === 'Callback' && <Callback productId={ data?.data?.offers?.find(item => item.offer_id === offerId)?.product_id } quantity={ quantity } /> }
				{ modalType === 'AddAsk' && <AddAskModal productId={ data?.data?.offers?.find(item => item.offer_id === offerId)?.product_id } name={ data?.data.full_name } /> }
			</Modal>
		)}
	</div>
};
