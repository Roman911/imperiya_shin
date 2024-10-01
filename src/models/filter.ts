export enum Section {
	Tires = 'tires',
	Disks = 'disks',
	Car = 'car',
	Battery = 'battery',
}

export enum Subsection {
	ByParams = 'byParams',
	ByCars = 'byCars',
}

export interface IFilter {
	width?: null | string
	height?: null | string
	radius?: null | string
	sezon?: null | string
	brand?: null | string
	model_id?: null | string
	country?: null | string
	year?: null | string
	load?: null | string
	speed?: null | string
	omolog?: null | string
	krepeg?: null | string
	typedisk?: null | string
	colir?: null | string
	jemnist?: null | string
	puskovii_strum?: null | string
	tip_elektrolitu?: null | string
	tip_korpusu?: null | string
	napruga?: null | string
	poliarnist?: null | string
	vehicle_type?: null | string
	li?: null | string
	si?: null | string
	only_studded?: null | string
	only_c?: null | string
	only_xl?: null | string
	only_owl?: null | string
	only_run_flat?: null | string
	only_off_road?: null | string
}
