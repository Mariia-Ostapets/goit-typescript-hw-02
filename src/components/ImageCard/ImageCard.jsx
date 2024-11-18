import css from "./ImageCard.module.css";

export default function ImageCard({
  small,
  regular,
  altDescription,
  onModalOpen,
}) {
  return (
    <img
      className={css.galleryImage}
      src={small}
      alt={altDescription}
      onClick={() => onModalOpen(regular, altDescription)}
    ></img>
  );
}
