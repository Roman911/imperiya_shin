interface IFilter {
	width?: number
	height?: number
	radius?: string
	country?: string
	year?: number
	brand?: number
	krepeg?: string
	sezon?: number
}

type OriginalType = {
	w: 'width',
	h: 'height',
	d: 'diameter',
	ctr: 'country',
	y: 'year',
};

const paramTrans: OriginalType = {
	w: 'width',
	h: 'height',
	d: 'diameter',
	ctr: 'country',
	y: 'year',
};

const digitValueToUrl = (value: number) => {
	return value.toString();
}

export const generateUrl = (filter: IFilter) => {
	const parts: string[] = [];

	const appendFilterPart = <T extends string | number | string[]>(key: keyof IFilter, transformer?: (val: T) => string) => {
		const value = filter[key];
		if (value) {
			const formattedValue = Array.isArray(value)
				? (value as string[]).join(',')
				: transformer ? transformer(value as T) : String(value);
			parts.push(`${key}=${formattedValue}`);
		}
	};

	appendFilterPart('width', digitValueToUrl);
	appendFilterPart('height', digitValueToUrl);
	appendFilterPart('radius');
	appendFilterPart('country');
	appendFilterPart('krepeg');
	appendFilterPart('year', digitValueToUrl);
	appendFilterPart('brand', digitValueToUrl);
	appendFilterPart('sezon', digitValueToUrl);

	return parts.join('&');
};

type ParsedResult = {
	[key: string]: string;
};

export const parseUrl = (url: string): ParsedResult => {
	const urlParts = url.split('/');
	if (urlParts.length === 0) return {};

	const result: ParsedResult = {};

	urlParts.forEach(item => {
		const [name, id, value] = item.split('-');

		// Use type assertion to let TypeScript know that 'name' is a valid key for 'paramTrans'
		const paramName = paramTrans[name as keyof typeof paramTrans];
		if (paramName) {
			result[paramName] = value || id || '';
		}
	});

	return result;
};
