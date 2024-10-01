import { Helmet } from 'react-helmet-async';

import { config } from '../../config';
import { baseDataAPI } from '../../services/baseDataService';
import { addToStorage, getFromStorage, removeFromStorage } from '../../lib';
import { useAppDispatch, useAppSelector, useAppTranslation } from '../../hooks';
import { removeCart, setQuantity } from '../../store/reducers/cartSlice';
import { LayoutWrapper } from '../../components/Layout';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { NoResult, Spinner, Title } from '../../components/Lib';
import { CartComponent } from '../../components/Cart';
import { Language } from '../../models/language';

export const Cart = () => {
	const t = useAppTranslation();
	const dispatch = useAppDispatch();
	const { lang } = useAppSelector(state => state.langReducer);
	const { cartItems } = useAppSelector(state => state.cartReducer);
	const id = cartItems.map(item => item.id).join(',');
	const { data, isLoading } = baseDataAPI.useFetchProductsQuery({id: `?Offer_id=${id}`});
	const path = [{ id: 1, title: t('cart', true), url: '/' }];

	const removeProduct = (id: number) => {
		removeFromStorage('reducerCart', id);
		dispatch(removeCart(id));
	};

	const onSetQuantity = (id: number, quantity: number) => {
		const storage = getFromStorage('reducerCart');
		const item = storage.find((i: { id: number, section: string, quantity: number }) => i.id === id);
		addToStorage('reducerCart', [...storage.filter((i: { id: number }) => i.id !== id), { ...item, quantity }]);
		dispatch(setQuantity({ ...item, quantity }));
	}

	return <LayoutWrapper>
		<Helmet>
			<title>{ t('cart', true) } | { config.domain }</title>
		</Helmet>
		<Breadcrumbs path={ path } />
		<Title title='cart' />
		<Spinner height='h-40' show={ isLoading }>
			{ cartItems.length > 0 && data?.result ? <CartComponent
					data={ data }
					cartItems={ cartItems }
					removeProduct={ removeProduct }
					setQuantity={ onSetQuantity }
				/> :
				<NoResult
					noResultText={ lang === Language.UA ? 'Ви ще не додали до кошику жодного товару' : 'Вы еще не добавили в корзину ни одного товара' }
				/> }
		</Spinner>
	</LayoutWrapper>
};
