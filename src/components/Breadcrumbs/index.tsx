import { FC } from 'react';
import classNames from 'classnames';

import { Link } from '../../lib';
import { HomeIcon } from '../Lib/Icons';

interface BreadcrumbsItem {
	id: number
	title: string
	url: string
}

interface BreadcrumbsProps {
	path: BreadcrumbsItem[]
}

export const Breadcrumbs: FC<BreadcrumbsProps> = ({ path }) => {
	return <nav className='py-2.5'>
		<ol className='flex overflow-auto max-w-full whitespace-nowrap'>
			<li className='text-sm'>
				<Link to="/"><HomeIcon className='fill-[#575C66]'/></Link>
			</li>
			{path.map((item, index) => {
				return <li
					key={ item.id }
					className={
					classNames('text-sm before:content-["/"] pl-1.5 before:pr-1.5',
						{ 'text-[#161111] font-bold': index === path.length - 1 },
						{ 'hover:text-blue-500 text-[#575C66]': index !== path.length - 1 }
					)}
				>
					<Link
						className={
						classNames(
							{ 'underline': index !== path.length - 1 },
							{ 'pointer-events-none': index === path.length - 1 }
						)}
						to={item.url}
					>
						{ item.title }
					</Link>
				</li>
			})}
		</ol>
	</nav>
}
