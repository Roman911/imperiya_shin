import { FC, memo } from 'react';
import { MySelect } from '../Select';
import { Language } from '../../../models/language';
import type { OrdersParamProps } from '../../../models/ordersParam';
import DOMPurify from 'dompurify';

interface Props {
	lang: Language
	onChange: (name: string, value: number | string | undefined) => void
	dataOrdersParam: OrdersParamProps | undefined
	paymentMethod: number | string | undefined
}

export const PaymentMethod: FC<Props> = ({ lang, dataOrdersParam, paymentMethod, onChange }) => {
	const paymentsOptions = dataOrdersParam?.Payments.map(item => {
		return { value: item.payments_id, label: lang === Language.UA ? item.name : item.name_ru }
	});

	const HtmlContent = memo(({ htmlString }: { htmlString: string }) => {
		const sanitizedHtml = DOMPurify.sanitize(htmlString, {
			ADD_TAGS: [ 'iframe' ],
			ADD_ATTR: [ 'allow', 'allowfullscreen', 'frameborder', 'scrolling', 'loading', 'referrerpolicy' ]
		});

		return <div dangerouslySetInnerHTML={ { __html: sanitizedHtml } }/>;
	});

	return <>
		<h4 className='font-semibold mt-6'>
			{ lang === Language.UA ? 'Виберіть спосіб оплати' : 'Выберите способ оплаты' }
		</h4>
		<MySelect name='payment_method' label='Способ оплаты' options={ paymentsOptions } onChange={ onChange }/>
		{ Number(paymentMethod) === 3 && dataOrdersParam?.Payments[2].descr && <div className='mt-4'>
			<HtmlContent htmlString={ dataOrdersParam?.Payments[2].descr || '' }/>
		</div> }
	</>
};
