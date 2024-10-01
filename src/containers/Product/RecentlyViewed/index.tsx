import { baseDataAPI } from '../../../services/baseDataService';
import { useAppTranslation } from '../../../hooks';
import { getFromStorage } from '../../../lib';
import { ProductList } from '../../ProductList';
import { Spinner, Title } from '../../../components/Lib';
import { Section } from '../../../models/filter';

export const RecentlyViewed = () => {
	const t = useAppTranslation();
	const storage = getFromStorage('reducerRecentlyViewed');
	const tires = storage.filter((item: { id: number, section: Section }) => item.section === Section.Tires)
		.map((item: { id: number, section: Section }) => item.id);
	const disks = storage.filter((item: { id: number, section: Section }) => item.section === Section.Disks)
		.map((item: { id: number, section: Section }) => item.id);
	const battery = storage.filter((item: { id: number, section: Section }) => item.section === Section.Battery)
		.map((item: { id: number, section: Section }) => item.id);
	const { data: dataTires } = baseDataAPI.useFetchProductsQuery({ id: `?product_ids=${tires.join(',')}`, length: tires.length || 1 });
	const { data: dataDisks } = baseDataAPI.useFetchProductsQuery({ id: `?typeproduct=3&product_ids=${disks.join(',')}`, length: disks.length || 1 });
	const { data: dataBattery, isLoading } = baseDataAPI.useFetchProductsQuery({ id: `?typeproduct=4&product_ids=${battery.join(',')}`, length: battery.length || 1 });
	const showItems = [];

	if(dataTires) showItems.push(...dataTires.data.products);
	if (dataDisks) showItems.push(...dataDisks.data.products);
	if (dataBattery) showItems.push(...dataBattery.data.products);
	const productsFilter = showItems.filter(item => storage.findIndex((i: { id: number }) => i.id === item.product_id) !== -1);

	return <>
		<Title title={ t('recently viewed', true) } />
		<Spinner height='h-40' show={ isLoading } >
			<ProductList
				classnames='grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-3 md:px-0'
				data={{ products: productsFilter, total_count: showItems.length }}
			/>
		</Spinner>
	</>
};
