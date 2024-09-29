import { FC } from 'react';
import classNames from 'classnames';

import { config } from '../../config';

import { formatPhoneNumber } from '../../lib';

import vodafoneLogo from '../../assets/vodafone-logo.png';
import kievstarLogo from '../../assets/kievstar-logo.png';
import lifecellLogo from '../../assets/life-logo.png';

import { PhoneLogo } from '../../models/config';

const phoneLogos: Record<PhoneLogo, string> = {
	vodafone: vodafoneLogo,
	kievstar: kievstarLogo,
	lifecell: lifecellLogo,
};

interface ContactsProps {
	className?: string
}

export const Contacts: FC<ContactsProps> = ({ className = 'text-white' }) => {
	return <div className={classNames('py-1 font-semibold', className)}>
		{config.contacts.phone.map(item => {
			return <div key={item.value} className='flex items-center'>
				<img src={phoneLogos[item.logo]} alt={item.logo + '-logo'}/>
				<a href={`tel:${item.value}`} className='ml-2.5'>
					{formatPhoneNumber(item.value)}
				</a>
			</div>
		})}
	</div>
};
