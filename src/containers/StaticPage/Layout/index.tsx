import { FC, memo } from 'react';
import DOMPurify from 'dompurify';
import { Helmet } from 'react-helmet-async';

import { useAppSelector } from '../../../hooks';
import { LayoutWrapper } from '../../../components/Layout';
import { Breadcrumbs } from '../../../components/Breadcrumbs';
import { Spinner, Title } from '../../../components/Lib';

interface Description {
	title: string
	content: string
	meta_h1: string
	meta_title: string
	meta_description: string
}

interface Data {
	alias: string
	created_at: string
	updated_at: string
	description: {
		ua: Description
		ru: Description
	}
}

interface StaticPageProps {
	title: string
	data: Data | undefined
	isLoading: boolean
}

export const LayoutStaticPage: FC<StaticPageProps> = ({ title, data, isLoading }) => {
	const { lang } = useAppSelector(state => state.langReducer);
	const { settings } = useAppSelector(state => state.settingsReducer);

	const path = [
		{
			id: 1,
			title: title,
			url: '/'
		}
	];

	const HtmlContent = memo(({ htmlString }: { htmlString: string }) => {
		const sanitizedHtml = DOMPurify.sanitize(htmlString);
		return (
			<div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
		);
	});

	return <LayoutWrapper>
		<Helmet>
			<title>{ title } | { settings.ua.config_email }</title>
		</Helmet>
		<Breadcrumbs path={ path }/>
		<Spinner height='h-60' show={ isLoading }>
			<Title title={ data ? data?.description[lang].meta_h1 : '' } />
			<HtmlContent htmlString={ data ? data?.description?.[lang].content : '' } />
		</Spinner>
	</LayoutWrapper>
};
