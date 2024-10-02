import { baseDataAPI } from '../../../services/baseDataService';
import { useAppSelector, useAppTranslation } from '../../../hooks';
import { ProductList } from '../../ProductList';
import { Spinner, Title } from '../../../components/Lib';
import { Section } from '../../../models/filter';

export const Bookmarks = () => {
	const t = useAppTranslation();
	const { bookmarksItems } = useAppSelector(state => state.bookmarksReducer);

	const tires = bookmarksItems.filter((item: { id: number, section: Section }) => item.section === Section.Tires)
		.map((item: { id: number, section: Section }) => item.id);
	const disks = bookmarksItems.filter((item: { id: number, section: Section }) => item.section === Section.Disks)
		.map((item: { id: number, section: Section }) => item.id);
	const battery = bookmarksItems.filter((item: { id: number, section: Section }) => item.section === Section.Battery)
		.map((item: { id: number, section: Section }) => item.id);
	const { data: dataTires } = baseDataAPI.useFetchProductsQuery({ id: `?product_ids=${tires.join(',')}`, length: tires.length || 1 });
	const { data: dataDisks } = baseDataAPI.useFetchProductsQuery({ id: `?typeproduct=3&product_ids=${disks.join(',')}`, length: disks.length || 1 });
	const { data: dataBattery, isLoading } = baseDataAPI.useFetchProductsQuery({ id: `?typeproduct=4&product_ids=${battery.join(',')}`, length: battery.length || 1 });
	const showItems = [];

	if(dataTires) showItems.push(...dataTires.data.products);
	if (dataDisks) showItems.push(...dataDisks.data.products);
	if (dataBattery) showItems.push(...dataBattery.data.products);
	const productsFilter = showItems.filter(item => bookmarksItems.findIndex((i: { id: number }) => i.id === item.product_id) !== -1);

	if(bookmarksItems.length === 0) return null;

	return <>
		<Title title={ t('favorites', true) } />
		<Spinner height='h-40' show={ isLoading } >
			<ProductList
				classnames='grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-3 md:px-0'
				data={{ products: productsFilter, total_count: showItems.length }}
			/>
		</Spinner>
	</>
};
