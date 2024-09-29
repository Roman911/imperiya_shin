import { FC, MouseEvent } from 'react';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { addBookmarks, removeBookmarks } from '../../../store/reducers/bookmarksSlice';
import { addComparison, removeComparison } from '../../../store/reducers/comparisonSlice';

import type { Product } from '../../../models/products';
import { ProductCardComponent } from '../../../components/ProductCard'

interface ProductCardProps {
	item: Product
}

export const ProductCard: FC<ProductCardProps> = ({ item }) => {
	const { bookmarksItems } = useAppSelector(state => state.bookmarksReducer);
	const { comparisonItems } = useAppSelector(state => state.comparisonReducer);
	const dispatch = useAppDispatch();

	const isBookmarks = bookmarksItems.length > 0 && bookmarksItems.includes(item.group);
	const isComparison = comparisonItems.length > 0 && comparisonItems.includes(item.group);

	const addToBookmarks = (event: MouseEvent<HTMLButtonElement>, id: number) => {
		event.preventDefault();
		dispatch(isBookmarks ? removeBookmarks(id) : addBookmarks(id));
		const storage = localStorage.reducerBookmarks ? JSON.parse(localStorage.reducerBookmarks) : [];
		localStorage.setItem('reducerBookmarks', JSON.stringify(  storage.includes(id) ? [...storage.filter((item: number) => item !== id)] : [...storage, id]));
	};

	const addToComparison = (event: MouseEvent<HTMLButtonElement>, id: number) => {
		event.preventDefault();
		dispatch(isComparison ? removeComparison(id) : addComparison(id));
		const storage = localStorage.reducerComparison ? JSON.parse(localStorage.reducerComparison) : [];
		localStorage.setItem('reducerComparison', JSON.stringify(storage.includes(id) ? [...storage.filter((item: number) => item !== id)] : [...storage, id]));
	};

	return <ProductCardComponent
		item={ item }
		addToDefense={ addToBookmarks }
		isBookmarks={ isBookmarks }
		isComparison={ isComparison }
		addToComparison={ addToComparison }
	/>
};
