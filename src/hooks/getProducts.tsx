import { useEffect, useState } from 'react';
import { baseDataAPI } from '../services/baseDataService';
import { Section } from '../models/filter';
import { Product } from '../models/products';

interface ProductItem {
	id: number;
	section: Section;
	quantity?: number;
}

export const useAppGetProducts = (products: ProductItem[] = []) => {
	const [groupedIds, setGroupedIds] = useState<{ tires: number[]; disks: number[]; battery: number[] }>({
		tires: [],
		disks: [],
		battery: [],
	});

	const [groupedItems, setGroupedItems] = useState<{ tiresItems: Product[]; disksItems: Product[]; batteryItems: Product[] }>({
		tiresItems: [],
		disksItems: [],
		batteryItems: [],
	});

	const [newProducts, setNewProducts] = useState<Product[]>([]);

	const { data: dataTires } = baseDataAPI.useFetchProductsQuery({
		id: `?product_ids=${groupedIds.tires.join(',')}`,
		length: groupedIds.tires.length || 1,
	});
	const { data: dataDisks } = baseDataAPI.useFetchProductsQuery({
		id: `?typeproduct=3&product_ids=${groupedIds.disks.join(',')}`,
		length: groupedIds.disks.length || 1,
	});
	const { data: dataBattery, isLoading } = baseDataAPI.useFetchProductsQuery({
		id: `?typeproduct=4&product_ids=${groupedIds.battery.join(',')}`,
		length: groupedIds.battery.length || 1,
	});

	// Group products by their section and update grouped IDs state
	useEffect(() => {
		const grouped = products.reduce(
			(acc, product) => {
				switch (product.section) {
					case Section.Tires:
						acc.tires.push(product.id);
						break;
					case Section.Disks:
						acc.disks.push(product.id);
						break;
					case Section.Battery:
						acc.battery.push(product.id);
						break;
					default:
						break;
				}
				return acc;
			},
			{ tires: [], disks: [], battery: [] } as { tires: number[]; disks: number[]; battery: number[] }
		);
		setGroupedIds(grouped);
	}, [products]);

	// Update grouped items based on data fetched from API
	useEffect(() => {
		setGroupedItems({
			tiresItems: dataTires?.data?.products || [],
			disksItems: dataDisks?.data?.products || [],
			batteryItems: dataBattery?.data?.products || [],
		});
	}, [dataTires, dataDisks, dataBattery]);

	// Sort and update new products based on the original products array
	useEffect(() => {
		const allProducts = [...groupedItems.tiresItems, ...groupedItems.disksItems, ...groupedItems.batteryItems];
		const sortedProducts = products
			.map((product) => allProducts.find((item) => item.product_id === product.id))
			.filter((item): item is Product => !!item); // Type narrowing to ensure no undefined values

		setNewProducts(sortedProducts);
	}, [groupedItems, products]);

	return {
		products: newProducts,
		isLoading,
	};
};
