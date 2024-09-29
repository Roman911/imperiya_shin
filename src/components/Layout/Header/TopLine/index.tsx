import { Language } from '../../../../containers/Layout/Header/Language';
import { useAppTranslation } from '../../../../hooks';
import { Link } from '../../../../lib';
import { Contacts } from '../../../../containers/Contacts';
import { links } from './links';

export const TopLine = () => {
	const t = useAppTranslation();

	return <div className='bg-black text-white'>
		<div className='container mx-auto flex justify-between py-1 px-4'>
			<Contacts className='' />
			<nav className='gap-2 lg:gap-x-7 items-center hidden lg:flex'>
				{links.map((item, index) => {
					return <Link
						key={index}
						to={item.link}
						className='text-xs 2xl:text-sm font-medium uppercase'>
						{t(item.title)}
					</Link>
				})}
			</nav>
			<div className='flex items-center'>
				<Language/>
			</div>
		</div>
	</div>
};
