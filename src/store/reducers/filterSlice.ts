import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { IFilter, Section, Subsection } from '../../models/filter';

export interface FilterState {
	section: Section
	subsection: Subsection
	filter: IFilter
}

const initialState: FilterState = {
	section: Section.Tires,
	subsection: Subsection.ByParams,
	filter: {
		width: null,
		height: null,
		radius: null,
		sezon: null,
		brand: null,
		model_id: null,
		country: null,
		year: null,
		load: null,
		speed: null,
		omolog: null,
		krepeg: null,
		typedisk: null,
		colir: null,
		brand_disc: null,
		jemnist: null,
		puskovii_strum: null,
		tip_elektrolitu: null,
		tip_korpusu: null,
		napruga: null,
		poliarnist: null,
		vehicle_type: null,


		pcd: null,

		price_from: null,
		price_to: null,
		city: null,
		model: null,
		speed_index: null,
		load_index: null,
		ply_rating: null,
		dia_from: null,
		dia_to: null,
		color: null,
		et_from: null,
		et_to: null,
		bolt_count_pcd: null,
		only_xl: false,
		only_owl: false,
		only_retread: false,
		only_provider_with_tax: false,
		homologation: null,
		vehicle_type_alt: null,
		only_run_flat: false,
		only_flange_protector: false,
		only_studded: null,
		only_off_road: false,
		only_c: false,
		only_not_c: false,
		only_reinforced: false,
	}
}

export const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		changeSubsection: (state, actions: PayloadAction<Subsection>) => {
			state.subsection = actions.payload;
		},
		changeSection: (state, actions: PayloadAction<Section>) => {
			state.section = actions.payload;
		},
		setParams: (state, actions: PayloadAction<IFilter>) => {
			state.filter = {...state.filter, ...actions.payload}
		},
		removeParam: (state, actions: PayloadAction<IFilter>) => {
			state.filter = {...state.filter, ...actions.payload}
		},
		reset: () => initialState,
	},
});

export const { changeSubsection, changeSection, setParams, removeParam, reset } = filterSlice.actions;

export default filterSlice.reducer;
