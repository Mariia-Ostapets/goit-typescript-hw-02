import css from "./ImageGallery.module.css";
import ImageCard from "../ImageCard/ImageCard";
import { ImageGalleryProps } from "./ImageGallery.types";

export default function ImageGallery({ items, onImageClick }:ImageGalleryProps) {
  return (
    <ul className={css.galleryList}>
      {items.map((item) => (
        <li className={css.galleryItem} key={item.id}>
          <ImageCard
            small={item.urls.small}
            regular={item.urls.regular}
            alt_description={item.alt_description}
            onModalOpen={onImageClick}
          />
        </li>
      ))}
    </ul>
  );
}
