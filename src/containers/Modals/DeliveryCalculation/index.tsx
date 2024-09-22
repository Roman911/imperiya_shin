import { useState } from 'react';

import { baseDataAPI } from '../../../services/baseDataService';
import { DeliveryCalculationComponent } from '../../../components/Modals';

export const DeliveryCalculation = ({ offer_id }: { offer_id: number | undefined }) => {
	const [city, setCity] = useState<number | string | undefined>('');
	const [cityRef, setCityRef] = useState<number | string | undefined>('');
	const [showDescription, setShowDescription] = useState<boolean>(false);
	const { data } = baseDataAPI.useFetchNpSearchQuery(city);
	const { data: dataNpDocumentPrice } = baseDataAPI.useFetchNpDocumentPriceQuery({ offer_id, ref: cityRef, count: 1 });
	const cityOptions = data?.[0].Addresses?.map((item: { MainDescription: string, Ref: string }) => {
		return { value: item.Ref, label: item.MainDescription }
	});

	const onChange = (_name: string, value: number | string | undefined) => {
		setCityRef(value);
	}

	const handleClick = () => {
		setShowDescription(true)
	}

	return <DeliveryCalculationComponent
		setCity={ setCity }
		cityOptions={ cityOptions }
		onChange={ onChange }
		handleClick={ handleClick }
		showDescription={ showDescription }
		dataNpDocumentPrice={ dataNpDocumentPrice?.[0] }
	/>
};
