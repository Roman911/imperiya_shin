export type PhoneLogo = 'vodafone' | 'kievstar' | 'lifecell';

interface SocialItem {
	link: string
	logo: string
}

export interface Config {
	domain: string
	startYear: number
	social: {
		links: SocialItem[]
	}
	catalog: {
		itemsProduct: number
	}
	filterAlt: {
		submitFloatShowTime: number
	}
	deliveryCalculation: {
		postpaid: {
			const: number
			cof: number
		}
	}
}
