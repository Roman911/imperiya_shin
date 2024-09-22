import { FC } from 'react';
import ImageGallery from 'react-image-gallery';
import './index.scss';

interface ImageGalleryProps {
	images: Array<{
		original: string
		thumbnail: string
	}>
}

export const ImgGallery: FC<ImageGalleryProps> = ({ images }) => {
	return <ImageGallery
		items={ images }
		showPlayButton={ false }
	/>
};
