import { FC } from 'react';
import classNames from 'classnames';

import { HeartIcon, LibraIcon, MailIcon, PhoneCircuitIcon, ShareIcon } from '../../Lib/Icons';

interface ActionsBlockProps {
	className: string
}

export const ActionsBlock: FC<ActionsBlockProps> = ({ className }) => {
	return <div className={ classNames('gap-1.5 xl:gap-2.5 h-full', className) }>
		<div className='p-3 bg-blue-50 rounded-full group hover:cursor-pointer'>
			<PhoneCircuitIcon className='stroke-gray-500 group-hover:stroke-blue-500'/>
		</div>
		<div className='p-3 bg-blue-50 rounded-full group hover:cursor-pointer'>
			<MailIcon className='stroke-gray-500 group-hover:stroke-blue-500'/>
		</div>
		<div className='p-3 bg-blue-50 rounded-full group hover:cursor-pointer'>
			<ShareIcon className='fill-gray-500 group-hover:fill-blue-500'/>
		</div>
		<div className='p-3 bg-blue-50 rounded-full group hover:cursor-pointer'>
			<HeartIcon className='stroke-gray-500 group-hover:stroke-blue-500 w-4 h-4'/>
		</div>
		<div className='p-3 bg-blue-50 rounded-full group hover:cursor-pointer'>
			<LibraIcon className='fill-gray-500 group-hover:fill-blue-500 w-4 h-4'/>
		</div>
	</div>
};
