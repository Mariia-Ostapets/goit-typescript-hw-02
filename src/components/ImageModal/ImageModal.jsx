import css from "./ImageModal.module.css";
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function ImageModal({
  modalIsOpen,
  closeModal,
  modalImage,
  modalAlt,
}) {
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
