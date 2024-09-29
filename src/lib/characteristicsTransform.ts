type VehicleType = {
	icon: 'light' | 'suv' | 'cargo' | 'motorcycle' | 'bus' | 'special';
	name: string;
	to: string;
};

export const SeasonTransform = (season: string) => {
	const seasonMap: Record<string, { icon: string; name: string } | null> = {
		'1': { icon: '/images/sun-icon.svg', name: 'summer' },
		'2': { icon: '/images/snow-icon.svg', name: 'winter' },
		'3': { icon: '/images/cloud-icon.svg', name: 'all season' },
	};

	return seasonMap[season] || null;
};

export const VehicleTypeTransform = (type: string): VehicleType | undefined => {
	const vehicleTypeMap: { [key: string]: VehicleType } = {
		'1': { icon: 'light', name: 'light', to: '/catalog/tires?vehicle_type=1' },
		'2': { icon: 'suv', name: 'SUVs', to: '/catalog/tires?vehicle_type=2' },
		'3': { icon: 'cargo', name: 'cargo', to: '/catalog/tires?typeproduct=2&vehicle_type=3' },
		'4': { icon: 'cargo', name: 'cargo', to: '/catalog/tires?typeproduct=2&vehicle_type=3' },
		'5': { icon: 'cargo', name: 'cargo', to: '/catalog/tires?typeproduct=2&vehicle_type=3' },
		'6': { icon: 'cargo', name: 'cargo', to: '/catalog/tires?typeproduct=2&vehicle_type=3' },
		'7': { icon: 'motorcycle', name: 'motorcycles', to: '/catalog/tires?vehicle_type=7' },
		'8': { icon: 'bus', name: 'buses', to: '/catalog/tires?vehicle_type=8' },
		'9': { icon: 'special', name: 'special equipment', to: '/catalog/tires?typeproduct=2&vehicle_type=9' },
		'10': { icon: 'special', name: 'special equipment', to: '/catalog/tires?typeproduct=2&vehicle_type=9' },
		'11': { icon: 'special', name: 'special equipment', to: '/catalog/tires?typeproduct=2&vehicle_type=9' },
	};

	return vehicleTypeMap[type];
};