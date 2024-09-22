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
	brand_disc?: null | string
	jemnist?: null | string
	puskovii_strum?: null | string
	tip_elektrolitu?: null | string
	tip_korpusu?: null | string
	napruga?: null | string
	poliarnist?: null | string
	vehicle_type?: null | string




	bolt_count?: null | string
	pcd?: null | string

	price_from?: null | string
	price_to?: null | string
	city?: null | string
	model?: null | string
	speed_index?: null | string
	load_index?: null | string
	ply_rating?: null | string
	dia_from?: null | string
	dia_to?: null | string
	color?: null | string
	et_from?: null | string
	et_to?: null | string
	bolt_count_pcd?: null | string
	only_xl?: boolean
	only_owl?: boolean
	only_retread?: boolean
	only_provider_with_tax?: boolean
	homologation?: null | string
	vehicle_type_alt?: null | string
	only_run_flat?: boolean
	only_flange_protector?: boolean
	only_studded?: null | string
	only_off_road?: boolean
	only_c?: boolean
	only_not_c?: boolean
	only_reinforced?: boolean
}
