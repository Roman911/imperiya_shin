export type PhoneLogo = 'vodafone' | 'kievstar' | 'lifecell';

interface PhoneItem {
	logo: PhoneLogo;
	value: string;
}

interface SocialItem {
	link: string
	logo: string
}

export interface Config {
	domain: string
	startYear: number
	contacts: {
		freePhone: string
		phone: PhoneItem[]
		email: string
		address: {
			ua: string
			ru: string
		}
		workSchedule: {
			ua: string
			ru: string
		}
	}
	social: {
		links: SocialItem[]
	}
	catalog: {
		itemsProduct: number
	}
	filterAlt: {
		submitFloatShowTime: number
	}
}