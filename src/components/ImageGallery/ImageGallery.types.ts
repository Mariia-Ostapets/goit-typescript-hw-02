import { Image } from "../App/App.types";

export interface ImageGalleryProps {
  items: Image[];
  onImageClick: (url: string, alt: string) => void;
}
