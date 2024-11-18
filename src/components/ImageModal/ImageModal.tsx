import css from "./ImageModal.module.css";
import Modal from "react-modal";
import { ImageModalProps } from "./ImageModal.types";

Modal.setAppElement("#root");

export default function ImageModal({
  modalIsOpen,
  closeModal,
  modalImage,
  modalAlt,
}: ImageModalProps) {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      className={css.modal}
    >
      <img className={css.modalImage} src={modalImage} alt={modalAlt} />;
    </Modal>
  );
}
