import { FC } from 'react';

import { useAppTranslation } from '../../../hooks';

interface TitleProps {
	title: string
	className?: string
}

export const Title: FC<TitleProps> = ({ title, className='my-5 text-3xl md:text-4xl font-bold px-3 md:px-0' }) => {
	const t = useAppTranslation();

	return <h2 className={ className }>{ t(title, true) }</h2>
}
