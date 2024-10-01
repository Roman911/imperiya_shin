import { FC, MouseEvent } from 'react';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { addToStorage, getFromStorage, removeFromStorage } from '../../../lib';
import { addBookmarks, removeBookmarks } from '../../../store/reducers/bookmarksSlice';
import { addComparison, removeComparison } from '../../../store/reducers/comparisonSlice';

import type { Product } from '../../../models/products';
import { ProductCardComponent } from '../../../components/ProductCard'
import { Section } from '../../../models/filter';

const toggleStorageItem = (storageKey: string, id: number, section: Section, isInStorage: boolean) => {
	if (isInStorage) {
		removeFromStorage(storageKey, id);
	} else {
		const storage = getFromStorage(storageKey) || [];
		addToStorage(storageKey, [...storage, { id, section }]);
	}
};

interface ProductCardProps {
	item: Product
}

export const ProductCard: FC<ProductCardProps> = ({ item }) => {
	const dispatch = useAppDispatch();
	const { bookmarksItems } = useAppSelector(state => state.bookmarksReducer);
	const { comparisonItems } = useAppSelector(state => state.comparisonReducer);
	const isBookmarks = bookmarksItems.some(i => i.id === item.group);
	const isComparison = comparisonItems.some(i => i.id === item.group);
	const section =
		item.vehicle_type.length !== 0 ? Section.Tires :
			item.diameter.length !== 0 ? Section.Disks :
				Section.Battery;

	const handleToggle = (
		event: MouseEvent<HTMLButtonElement>,
		id: number,
		isItem: boolean,
		addAction: ({ id, section }: { id: number, section: Section }) => { type: string, payload: { id: number, section: Section }}, // Ensure actions return objects
		removeAction: ( id: number ) => { type: string, payload: number },
		storageKey: string
	) => {
		event.preventDefault();
		dispatch(isItem ? removeAction(id) : addAction({ id, section }));
		toggleStorageItem(storageKey, id, section, isItem);
	};

	return <ProductCardComponent
		item={ item }
		isBookmarks={ isBookmarks }
		isComparison={ isComparison }
		addToDefense={(e) => handleToggle(e, item.group, isBookmarks, addBookmarks, removeBookmarks, 'reducerBookmarks')}
		addToComparison={(e) => handleToggle(e, item.group, isComparison, addComparison, removeComparison, 'reducerComparison')}
	/>
};
