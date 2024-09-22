import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import { Link } from '../../../lib';
import { useAppDispatch, useAppTranslation } from '../../../hooks';
import { setParams } from '../../../store/reducers/filterSlice';

import { BusIcon, CargoIcon, CarIcon, MotorcyclesIcon, SpecialEquipmentIcon, SuvIcon } from '../Icons';

import { typeCatLinks } from './links';
import type { LinkComponentProps } from '../../../models/linkComponent';

interface TypeCarLinksProps {
	section: 'header' | 'catalog'
	onClick?: () => void
}

const Icons = {
	light: CarIcon,
	bus: BusIcon,
	cargo: CargoIcon,
	motorcycle: MotorcyclesIcon,
	special: SpecialEquipmentIcon,
	suv: SuvIcon,
};

interface ILinkComponent extends LinkComponentProps {
	section: 'header' | 'catalog'
	icon: keyof typeof Icons
	iconStyles?: string
	iconStylesActive?: string
	vehicleType: string[]
}

const LinkComponent: FC<ILinkComponent> = (
	{
		section,
		to,
		icon,
		label,
		onClick,
		iconStyles,
		iconStylesActive,
		vehicleType
	}) => {
	const [searchParams] = useSearchParams();
	const vehicleTypeSearchParams = searchParams.get('vehicle_type');
	const active = vehicleTypeSearchParams && vehicleType.includes(vehicleTypeSearchParams);
	const IconComponent = Icons[icon];

	return <Link
		to={to}
		onClick={onClick}
		className={classNames('flex items-center group',
			{'flex-col': section === 'catalog', 'mt-3 gap-2.5': section === 'header'}
		)}
	>
		<IconComponent className={
			classNames(
				'transition  group-hover:fill-blue-500',
				!active && iconStyles,
				active && iconStylesActive,
				{ 'fill-blue-500': active, 'fill-gray-500': !active }
			)
		}/>
		<span className={
			classNames(
				'transition group-hover:text-blue-500',
				{ 'text-blue-500': active },
				{ 'text-sm': section === 'catalog', 'group-hover:underline': section === 'header' }
			)
		}>
			{ label }
		</span>
	</Link>
}

export const TypeCarLinks: FC<TypeCarLinksProps> = ({ onClick, section }) => {
	const dispatch = useAppDispatch();
	const t = useAppTranslation();

	const handleClick = () => {
		if(onClick) onClick();
		dispatch(setParams({ 'vehicle_type': null }));
	}

	return <>
		{typeCatLinks.map(item => {
			return <LinkComponent
				key={ item.label }
				section={ section }
				to={ item.to }
				icon={ item.icon as keyof typeof Icons }
				label={ t(item.label, true) }
				onClick={ handleClick }
				iconStyles={ item.iconStyles }
				iconStylesActive={ item.iconStylesActive }
				vehicleType={ item.vehicleType }
			/>
		})}
	</>
};
