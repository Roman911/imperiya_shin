import { FC } from 'react';

interface CountryInfoProps {
	country: string
	countryCode: string | null
	year: number
}

export const CountryInfo: FC<CountryInfoProps> = ({ country, countryCode, year }) => {
	return <div className='flex items-center'>
		{ countryCode && <img className='h-6 w-6 rounded-full' src={`/images/flags/${countryCode}.svg`} alt=""/> }
		<p className='ml-2.5 text-sm'>{ country }{year > 0 && ', ' + year }</p>
	</div>
}
