import { Dispatch, FC, SetStateAction, useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';

import './index.scss';

interface PaginateProps {
	itemsPerPage: number
	paginateCount: number
	total_count: number | undefined
	setPaginateCount: Dispatch<SetStateAction<number>>
}

export const Paginate: FC<PaginateProps> = ({ itemsPerPage, total_count = 0, setPaginateCount }) => {
	const [ itemOffset, setItemOffset ] = useState(0);
	const [ pageRangeDisplayed, setPageRangeDisplayed ] = useState(3);

	useEffect(() => {
		if(window.innerWidth < 768) {
			setPageRangeDisplayed(5);
		}
	}, [])

	const endOffset = itemOffset + itemsPerPage;
	console.log(`Loading items from ${itemOffset} to ${endOffset}`);
	const pageCount = Math.ceil(total_count / itemsPerPage);

	const handlePageClick = (event: { selected: number; }) => {
		const newOffset = (event.selected * itemsPerPage) % total_count;
		console.log(
			`User requested page number ${event.selected}, which is offset ${newOffset}`
		);
		setPaginateCount(event.selected);
		setItemOffset(newOffset);
	};

	return <ReactPaginate
		//forcePage={5}
		className='paginate'
		breakLabel='...'
		nextLabel='>'
		onPageChange={ handlePageClick }
		pageRangeDisplayed={ pageRangeDisplayed }
		marginPagesDisplayed={ 2 }
		pageCount={ pageCount }
		previousLabel='<'
		renderOnZeroPageCount={ null }
	/>
}
