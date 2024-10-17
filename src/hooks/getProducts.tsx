import { useEffect, useState } from 'react';
import { baseDataAPI } from '../services/baseDataService';
import { Product } from '../models/products';

interface ProductItem {
	id: number;
	section: string;
	quantity?: number;
}

export const useAppGetProducts = (products: ProductItem[] = [], byOffer?: boolean) => {
	const [groupedIds, setGroupedIds] = useState<{ tires: number[]; cargo: number[]; disks: number[]; battery: number[] }>({
		tires: [],
		cargo: [],
		disks: [],
		battery: [],
	});

	const [groupedItems, setGroupedItems] = useState<{ tiresItems: Product[]; cargoItems: Product[]; disksItems: Product[]; batteryItems: Product[] }>({
		tiresItems: [],
		cargoItems: [],
		disksItems: [],
		batteryItems: [],
	});

	const [newProducts, setNewProducts] = useState<Product[]>([]);

	const { data: dataTires } = baseDataAPI.useFetchProductsQuery({
		id: `${byOffer ? '?Offer_id' : '?product_ids'}=${groupedIds.tires.join(',')}`,
		length: groupedIds.tires.length || 1,
	});
	const { data: dataCargo } = baseDataAPI.useFetchProductsQuery({
		id: `${byOffer ? '?typeproduct=2&Offer_id' : '?typeproduct=2&product_ids'}=${groupedIds.cargo.join(',')}`,
		length: groupedIds.cargo.length || 1,
	});
	const { data: dataDisks } = baseDataAPI.useFetchProductsQuery({
		id: `${byOffer ? '?typeproduct=3&Offer_id' : '?typeproduct=3&product_ids'}=${groupedIds.disks.join(',')}`,
		length: groupedIds.disks.length || 1,
	});
	const { data: dataBattery, isLoading } = baseDataAPI.useFetchProductsQuery({
		id: `${byOffer ? '?typeproduct=4&Offer_id' : '?typeproduct=4&product_ids'}=${groupedIds.battery.join(',')}`,
		length: groupedIds.battery.length || 1,
	});

	// Group products by their section and update grouped IDs state
	useEffect(() => {
		const grouped = products.reduce(
			(acc, product) => {
				switch (product.section) {
					case 'tires':
						acc.tires.push(product.id);
						break;
					case 'cargo':
						acc.cargo.push(product.id);
						break;
					case 'disks':
						acc.disks.push(product.id);
						break;
					case 'battery':
						acc.battery.push(product.id);
						break;
					default:
						break;
				}
				return acc;
			},
			{ tires: [], cargo: [], disks: [], battery: [] } as { tires: number[]; cargo: number[]; disks: number[]; battery: number[] }
		);
		setGroupedIds(grouped);
	}, [products]);

	// Update grouped items based on data fetched from API
	useEffect(() => {
		setGroupedItems({
			tiresItems: dataTires?.data?.products || [],
			cargoItems: dataCargo?.data?.products || [],
			disksItems: dataDisks?.data?.products || [],
			batteryItems: dataBattery?.data?.products || [],
		});
	}, [dataTires, dataCargo, dataDisks, dataBattery]);

	// Sort and update new products based on the original products array
	useEffect(() => {
		const allProducts = [...groupedItems.tiresItems, ...groupedItems.cargoItems, ...groupedItems.disksItems, ...groupedItems.batteryItems];
		const sortedProducts = products
			.map((product) => allProducts.find((item) => item.product_id === product.id))
			.filter((item): item is Product => !!item); // Type narrowing to ensure no undefined values

		setNewProducts(sortedProducts);
	}, [groupedItems, products]);

	return {
		products: newProducts,
		tires: groupedIds.tires.length > 0 ? groupedItems.tiresItems : [],
		cargo: groupedIds.cargo.length > 0 ? groupedItems.cargoItems : [],
		disks: groupedIds.disks.length > 0 ? groupedItems.disksItems : [],
		battery: groupedIds.battery.length > 0 ? groupedItems.batteryItems : [],
		isLoading,
	};
};
