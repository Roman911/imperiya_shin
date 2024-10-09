import { FC, useEffect } from 'react';

import { config } from '../../../../config';
import { useAppSubmit } from '../../../../hooks';

interface SubmitFloatProps {
	element: HTMLElement | null
	btnTitle: string
	setElement: (value: null) => void
}

export const SubmitFloat: FC<SubmitFloatProps> = ({ element, btnTitle, setElement }) => {
	const { handleSubmit } = useAppSubmit();

	const handleClick = () => {
		setElement(null);
		handleSubmit();
	}

	useEffect(() => {
		if(element) {
			const timer = setTimeout(() => setElement(null), config.filterAlt.submitFloatShowTime);

			return () => {
				clearTimeout(timer);
			}
		}
	}, [element, setElement]);

	if(!element) return null

	return <button
		onClick={() => handleClick()}
		className="absolute z-[100] -right-28 bg-blue-500 py-1 px-4 text-white text-sm before:content[' '] before:bg-blue-500 before:w-3 before:h-3 before:absolute before:-left-1.5 before:rotate-45 before:inset-y-1/2 before:-translate-y-2/4"
		style={{
			top: (
				element.getBoundingClientRect().top - document.body.getBoundingClientRect().top - 304
			) + 'px',
		}}
	>
		{ btnTitle }
	</button>
};
