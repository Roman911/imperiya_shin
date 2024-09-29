import { Config } from './models/config';

export const config: Config = {
	domain: 'imperiya-shin.ua',
	startYear: 2008,
	contacts: {
		phone: [
			{ value: '+380983456789', logo: 'kievstar' },
		],
		freePhone: '0800334257',
		email: 'info@imperiya-shin.ua',
		address: {
			ua: 'Київ вул. Березняківська, 11 \nЧернігів вул. І.Мазепи (Щорса), 53А',
			ru: 'Киев, ул. Березняковская, 11 \nЧернигов, ул. И.Мазепы (Щорса), 53А',
		},
		workSchedule: {
			ua: 'Пн ‒ Нд: з 9:00 до 18:00\n',
			ru: 'Пн ‒ Вс: с 9:00 до 18:00\n',
		},
	},
	social: {
		links: [
			{ link: 'https://t.me', logo: 'telegram' },
			{ link: 'https://www.facebook.com', logo: 'facebook' },
			{ link: 'https://www.viber.com', logo: 'viber' },
		],
	},
	catalog: {
		itemsProduct: 12
	},
	filterAlt: {
		submitFloatShowTime: 7000
	},
	deliveryCalculation: {
		postpaid: {
			const: 20,
			cof: 1.02
		}
	}
}
