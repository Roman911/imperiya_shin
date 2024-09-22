import {Dispatch, FC, SetStateAction} from 'react';

import { useAppSelector } from '../../../hooks';
import npLogo from '../../../assets/nova-poshta-logo-white-bg.png';
import { Language } from '../../../models/language';
import { MySelect } from "../../Order/Select";

interface DeliveryCalculationProps {
	cityOptions: {
		value: string
		label: string
	}[]
	handleClick: () => void
	showDescription: boolean
	dataNpDocumentPrice: { AssessedCost: number, Cost: number } | undefined
	onChange: (name: string, value: number | string | undefined) => void
	setCity: Dispatch<SetStateAction<string | number | undefined>>
}

export const DeliveryCalculationComponent: FC<DeliveryCalculationProps> = ({ cityOptions, showDescription, dataNpDocumentPrice, handleClick, onChange, setCity }) => {
	const { lang } = useAppSelector(state => state.langReducer);

	return <>
		<div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
			<div className="mt-3 sm:ml-4 sm:mt-0 sm:text-left">
				<div className='flex items-center gap-2'>
					<img src={ npLogo } alt=""/>
					<h3 className="text-base font-semibold leading-6 text-gray-900">
						{ lang === Language.UA ? 'Розрахунок доставки' : 'Расчет доставки' }
					</h3>
				</div>
				<div className='mt-6'>
					<MySelect name='city' label='Місто' options={ cityOptions } onChange={ onChange } setCity={ setCity } />
				</div>
				{showDescription && dataNpDocumentPrice && <div>
					<p className='mt-4'>
						{ lang === Language.UA ? 'Розрахункова вартість доставки вказана за 1 шт' : 'Расчетная стоимость доставки указана за 1 шт.' }
					</p>
					<h3 className="text-base font-semibold leading-6 text-gray-900 mt-3">
						{ lang === Language.UA ? 'Вартість:' : 'Стоимость:' } { dataNpDocumentPrice.Cost } грн
					</h3>
				</div>}
			</div>
		</div>
		<div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
			<button onClick={() => handleClick()} type="button" className='btn primary w-max px-5'>
				{ lang === Language.UA ? 'Розрахувати' : 'Рассчитать' }
			</button>
		</div>
	</>
};
