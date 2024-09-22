import { Link } from '../../../lib';
import { useAppSelector, useAppTranslation } from '../../../hooks';

import deliveryIcon from '../../../assets/icons/delivery-icon.svg';
import paymentIcon from '../../../assets/icons/payment-icon.svg';
import guaranteeIcon from '../../../assets/icons/guarantee-icon.svg';

export const InfoBlock = () => {
	const { lang } = useAppSelector(state => state.langReducer);
	const { settings } = useAppSelector(state => state.settingsReducer);
	const t = useAppTranslation();

	return <div className='lg:w-64'>
		<div className=' bg-white rounded-sm border border-gray-200 px-5'>
			<div className='border-b border-gray-200 pb-4'>
				<Link to='/shipment' className='mt-6 flex items-center gap-x-2.5 font-medium text-blue-500 group'>
					<img src={deliveryIcon} alt=""/>
					<span className='group-hover:underline'>Доставка</span>
				</Link>
				<Link to='/payment' className='mt-6 flex items-center gap-x-2.5 font-medium text-blue-500 group'>
					<img src={paymentIcon} alt=""/>
					<span className='group-hover:underline'>Оплата</span>
				</Link>
				<Link to='/guarantee-and-refund' className='mt-6 flex items-center gap-x-2.5 font-medium text-blue-500 group'>
					<img src={guaranteeIcon} alt=""/>
					<span className='group-hover:underline'>{t('warranty and returns', true)}</span>
				</Link>
			</div>
			<div className='mt-5 text-sm  leading-9 whitespace-pre-wrap'>
				{settings[lang].config_address}
			</div>
		</div>
	</div>
};
