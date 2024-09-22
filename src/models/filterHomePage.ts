import type { Options } from './baseData';

interface Filters {
	focusValue?: number | string
	label: string
	name: string
	options: Options[] | undefined
}

export interface OnChange {
	(name: string, value: number | string | undefined): void
}

export interface FilterProps {
	filters: Filters[]
	onChange: OnChange
	onSubmit: () => void
}
