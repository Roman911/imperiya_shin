import { FC, ReactNode } from 'react';
import classNames from 'classnames';

interface LayoutProps {
	children: ReactNode
	homePage?: boolean
}

export const LayoutWrapper: FC<LayoutProps> = ({ children, homePage }) => {
	return <div className={ classNames('container mx-auto px-4 py-5 min-h-[70vh]', { 'max-w-7xl': !homePage }) }>
		{ children }
	</div>
}
