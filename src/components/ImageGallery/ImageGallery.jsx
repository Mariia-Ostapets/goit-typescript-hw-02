import css from "./ImageGallery.module.css";
import ImageCard from "../ImageCard/ImageCard";

export default function ImageGallery({ items, onImageClick }) {
  return (
    <ul className={css.galleryList}>
      {items.map((item) => (
        <li className={css.galleryItem} key={item.id}>
          <ImageCard
            small={item.urls.small}
            regular={item.urls.regular}
            altDescription={item.alt_description}
            onModalOpen={onImageClick}
          />
        </li>
      ))}
    </ul>
  );
}
