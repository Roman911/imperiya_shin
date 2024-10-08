import { baseDataAPI } from '../../../../services/baseDataService';
import { Language } from '../../../../containers/Layout/Header/Language';
import { useAppSelector } from '../../../../hooks';
import { Link } from '../../../../lib';
import { Contacts } from '../../../../containers/Contacts';

export const TopLine = () => {
	const { data } = baseDataAPI.useFetchStatiAliasAllQuery('');
	const { lang } = useAppSelector(state => state.langReducer);

	return <div className='bg-black text-white'>
		<div className='container mx-auto flex justify-between py-1 px-4'>
			<Contacts className='' />
			<nav className='gap-2 lg:gap-x-7 items-center hidden lg:flex'>
				{data?.header.map((item, index) => {
					return <Link
						key={index}
						to={ `/page/${item.slug}` }
						className='text-xs 2xl:text-sm font-medium uppercase'>
						{ item.descriptions[lang].title }
					</Link>
				})}
			</nav>
			<div className='flex items-center'>
				<Language/>
			</div>
		</div>
	</div>
};
