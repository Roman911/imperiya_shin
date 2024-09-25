import { FC } from 'react';
import Select, { SingleValue, StylesConfig } from 'react-select';

import type { Options } from '../../../../models/baseData';

interface SelectProps {
	name: string
	label: string
	isDisabled?: boolean
	options: Options[] | undefined
	onChange: (name: string, value: number | string | undefined) => void
}

type IsMulti = false;

const colourStyles: StylesConfig<Options | undefined, IsMulti> = {
	control: (styles) => ({
		...styles,
		padding: '16px 4px 16px 16px',
		borderColor: 'transparent',
		backgroundColor: '#EDF1F5',
		':hover': {
			borderColor: '#8CC9FF',
			boxShadow: '0 0 0 1px #8CC9FF',
		}
	}),
	singleValue: (styles) => ({
		...styles,
		fontSize: 18,
		fontWeight: 500,
		color: '#050505',
	}),
	placeholder: (styles) => ({
		...styles,
		fontSize: 18,
		fontWeight: 500,
		color: '#050505',
	}),
	indicatorSeparator: (styles) => ({
		...styles,
		display: 'none'
	}),
	dropdownIndicator: (styles) => ({
		...styles,
		color: '#A8ACB2',
		':hover': {
			color: '#A8ACB2',
		},
	}),
	clearIndicator: (styles) => ({
		...styles,
		color: '#A8ACB2',
		':hover': {
			color: '#A8ACB2',
		},
	}),
	menuList: (provided) => {
		return {
			...provided,
			'::-webkit-scrollbar': {
				width: '10px',
				borderRadius: '2px',
				backgroundColor: '#E4E4E5',
			},
			'::-webkit-scrollbar-thumb': {
				backgroundColor: '#ABAFB2',
				border: '2px solid #E4E4E5',
				borderRadius: '6px',
			}
		};
	},
};

export const MySelect: FC<SelectProps> = ({ name, label, options = [], isDisabled = false, onChange }) => {
	const handleChange = (value: SingleValue<Options | undefined>) => {
		onChange(name, value?.value);
	}

	return <Select
		options={options}
		styles={colourStyles}
		placeholder={label}
		isClearable={true}
		isDisabled={isDisabled}
		onChange={handleChange}
	/>
}
