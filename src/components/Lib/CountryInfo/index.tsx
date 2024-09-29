import { FC } from 'react';
import classNames from 'classnames';

interface CountryInfoProps {
	country: string
	countryCode: string | null
	year: number
	mobileHidden?: boolean
}

export const CountryInfo: FC<CountryInfoProps> = ({ country, countryCode, year, mobileHidden }) => {
	return <div className='flex items-center'>
		{ countryCode && <div className='group relative'>
			<div className="absolute bottom-[calc(100%+0.2rem)] left-[50%] -translate-x-[50%] hidden group-hover:block md:group-hover:hidden w-auto">
				<div className="bottom-full right-0 rounded bg-black px-4 py-1 text-xs text-white w-max text-center">
					{country}
					<svg className="absolute top-full h-2 w-8 xl:w-full text-black" x="0px" y="0px" viewBox="0 0 255 255">
						<polygon className="fill-current" points="0,0 127.5,127.5 255,0"/>
					</svg>
				</div>
			</div>
			<img className='h-6 w-6 rounded-full' src={`/images/flags/${countryCode}.svg`} alt=""/>
		</div>}
		<p className='ml-2.5 text-sm'>
			<span className={classNames({'hidden sm:inline': mobileHidden})}>
				{ country + ', ' }
			</span>{year > 0 && year}
		</p>
	</div>
};
