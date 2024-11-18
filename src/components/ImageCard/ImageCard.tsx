import css from "./ImageCard.module.css";
import { ImageCardProps } from "./ImageCard.types";

export default function ImageCard({
  small,
  regular,
  alt_description,
  onModalOpen,
}: ImageCardProps) {

  return (
    <img
      className={css.galleryImage}
      src={small}
      alt={alt_description}
      onClick={() => onModalOpen(regular, alt_description)}
    ></img>
  );
}
