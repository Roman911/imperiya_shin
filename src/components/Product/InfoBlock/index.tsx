import { Link } from '../../../lib';
import { useAppSelector, useAppTranslation } from '../../../hooks';
import { Contacts } from '../../../containers/Contacts';
import { Language } from '../../../models/language';

import paymentIcon from '../../../assets/icons/payment-icon.svg';
import payment2Icon from '../../../assets/icons/payment2-icon.svg';
import guaranteeIcon from '../../../assets/icons/guarantee-icon.svg';
import returnIcon from '../../../assets/icons/return-icon.svg';
import calendarIcon from '../../../assets/icons/calendar-icon.svg';

export const InfoBlock = () => {
	const { lang } = useAppSelector(state => state.langReducer);
	const { settings } = useAppSelector(state => state.settingsReducer);
	const t = useAppTranslation();

	return <div className='lg:w-64'>
		<div className=' bg-white rounded-sm border border-gray-200 px-5'>
			<div className='border-b border-gray-200 pb-4'>
				<Link to='/guarantee' className='mt-4 flex items-center gap-x-2.5 font-medium hover:text-blue-500 group'>
					<img src={guaranteeIcon} alt=""/>
					<span className='underline'>{ t('guarantee', true) }</span>
				</Link>
				<Link to='/payment' className='mt-4 flex items-center gap-x-2.5 font-medium hover:text-blue-500 group'>
					<img src={paymentIcon} alt=""/>
					<span className='underline'>Оплата</span>
				</Link>
				<Link to='/payment' className='mt-4 flex items-center gap-x-2.5 font-medium hover:text-blue-500 group'>
					<img src={payment2Icon} alt=""/>
					<span className='underline'>{ t('payment in installments', true) }</span>
				</Link>
				<Link to='/refund' className='mt-4 flex items-center gap-x-2.5 font-medium hover:text-blue-500 group'>
					<img src={returnIcon} alt=""/>
					<span className='underline'>{t('refund', true)}</span>
				</Link>
			</div>
			<div className='mt-5 text-sm  leading-9 whitespace-pre-wrap border-b border-gray-200 pb-4'>
				<h5 className='text-lg font-bold'>{lang === Language.UA ? 'Контакти' : 'Контакты'}</h5>
				{settings[lang].config_address}
				<p>
					{lang === Language.UA ? 'м. Дніпро, просп. Перемоги, 16' : 'г. Днепр, просп. Победы, 16'}
				</p>
				<p>
					{lang === Language.UA ? 'м. Київ, просп. Перемоги, 16' : 'г. Киев, ул. Победы, 16'}
				</p>
				<Contacts className='text-black'/>
				<div className='flex items-center'>
					<img src={calendarIcon} alt=""/>
					<p className='font-bold ml-2'>{lang === Language.UA ? 'Пн – Нд: 9:00 – 18:00' : 'Пн – Вс: 9:00 – 18:00'}</p>
				</div>
			</div>
			<div className='mt-5 text-sm mb-4 leading-9 whitespace-pre-wrap'>
				<h5 className='text-lg font-bold'>
					{lang === Language.UA ? 'Доставка по Україні' : 'Доставка по Украине'}
				</h5>
				{lang === Language.UA ?
					<p className='mt-3'>Самовивіз зі складу-офісу в: <strong>Києві, Харкові, Одесі, Львові.</strong></p> :
					<p className='mt-3'>Самовывоз из склада-офиса в: <strong>Киеве, Харькове, Одессе, Львове.</strong></p>}
				<p className='mt-3'><strong>
					{lang === Language.UA ? '1-3 дні (від 85 грн)' : '1-3 дня (от 85 грн)'}
				</strong></p>
				<p className='mt-3'>{lang === Language.UA ? 'Нова Пошта' : 'Новая Почта'}</p>
				<p>{lang === Language.UA ? 'УкрПошта' : 'УкрПочта'}</p>
			</div>
		</div>
	</div>
};
