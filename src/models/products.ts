interface Model {
	name: string
	model_images: []
}

interface BestOffer {
	id: number
	price: string
	post_id: number
	city: string
	city_ru: string
	year: number
	country: string
	country_ru: string
	quantity: number
}

export interface Product {
	full_name: string
	default_photo: string
	group: number
	product_id: number
	trc_id: number
	min_price: number
	max_price: number
	season: string
	vehicle_type: string
	popularity: number
	model_id: number
	brand: number
	offers: BestOffer[]
	brand_name: string
	diameter: string
	page_url: string
	model: Model
	best_offer: BestOffer
	labels: []
}

export interface Data {
	total_count: number
	products: Product[]
}

export interface ProductsProps {
	result: boolean
	data: Data
}
