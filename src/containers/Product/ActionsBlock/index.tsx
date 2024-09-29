import { FC } from 'react';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { addBookmarks, removeBookmarks } from '../../../store/reducers/bookmarksSlice';
import { addComparison, removeComparison } from '../../../store/reducers/comparisonSlice';
import { ActionsBlockComponent } from '../../../components/Product/ActionsBlock';

interface ActionsBlockProps {
	id: number
	className: string
	handleModalOpen: (type: 'QuickOrder' | 'OnlineInstallment' | 'DeliveryCalculation' | 'Callback' | 'AddAsk') => void
}

export const ActionsBlock: FC<ActionsBlockProps> = ({ id, className, handleModalOpen }) => {
	const dispatch = useAppDispatch();
	const { bookmarksItems } = useAppSelector(state => state.bookmarksReducer);
	const { comparisonItems } = useAppSelector(state => state.comparisonReducer);
	const isBookmarks = bookmarksItems.includes(id);
	const isComparison = comparisonItems.includes(id);

	const handleClickBookmarks = () => {
		dispatch(isBookmarks ? removeBookmarks(id) : addBookmarks(id));
		const storage = localStorage.reducerBookmarks ? JSON.parse(localStorage.reducerBookmarks) : [];
		localStorage.setItem('reducerBookmarks', JSON.stringify(  storage.includes(id) ? [...storage.filter((item: number) => item !== id)] : [...storage, id]));
	}

	const handleClickComparison = () => {
		dispatch(isComparison ? removeComparison(id) : addComparison(id));
		const storage = localStorage.reducerComparison ? JSON.parse(localStorage.reducerComparison) : [];
		localStorage.setItem('reducerComparison', JSON.stringify(storage.includes(id) ? [...storage.filter((item: number) => item !== id)] : [...storage, id]));
	}

	const openModal = (type: 'QuickOrder' | 'OnlineInstallment' | 'DeliveryCalculation' | 'Callback' | 'AddAsk') => {
		handleModalOpen(type);
	}

	return <ActionsBlockComponent
		className={ className }
		isBookmarks={ isBookmarks }
		isComparison={ isComparison }
		handleClickBookmarks={ handleClickBookmarks }
		handleClickComparison={ handleClickComparison }
		openModal={ openModal }
	/>;
};
