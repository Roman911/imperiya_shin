import { FC } from "react";
import classNames from "classnames";

import { Section } from '../../../../models/filter';

interface TabProps {
	name: Section
	section: Section
	isOpen: boolean
	handleClick: (value: Section) => void
	label: string
}

export const Tab: FC<TabProps> = ({ name, section, handleClick, label }) => {
	const buttonClassNames = classNames('text-base xl:text-3xl uppercase font-bold md:mr-1.5 xl:mr-2.5 px-4 py-2 w-full md:w-auto relative border-b-4', {
		'md:pointer-events-none text-amber-500 border-amber-500': section === name,
		'text-white': section !== name,
	});

	return (
		<div className='w-full md:w-auto mt-2.5 md:mt-0'>
			<button onClick={ () => handleClick(name) } className={ buttonClassNames }>
				{ label }
			</button>
		</div>
	);
};
