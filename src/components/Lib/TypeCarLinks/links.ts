export const typeCatLinks = [
	{
		label: 'light',
		to: '/catalog/tires?vehicle_type=1', // 'vehicle_type=1,2
		icon: 'light',
		vehicleType: ['1'],
	},
	{
		label: 'SUVs',
		to: '/catalog/tires?vehicle_type=2',
		icon: 'suv',
		iconStyles: 'stroke-gray-500 group-hover:stroke-blue-500',
		iconStylesActive: 'stroke-blue-500',
		vehicleType: ['2'],
	},
	{
		label: 'buses',
		to: '/catalog/tires?vehicle_type=8',
		icon: 'bus',
		vehicleType: ['8'],
	},
	{
		label: 'cargo',
		to: '/catalog/tires?typeproduct=2&vehicle_type=3', // vehicle_type=3,4,5,6
		icon: 'cargo',
		vehicleType: ['3','4','5','6'],
	},
	{
		label: 'special equipment',
		to: '/catalog/tires?typeproduct=2&vehicle_type=9', //vehicle_type=9,10,11
		icon: 'special',
		vehicleType: ['9','10','11'],
	},
	{
		label: 'motorcycles',
		to: '/catalog/tires?vehicle_type=7',
		icon: 'motorcycle',
		vehicleType: ['7'],
	},
];
