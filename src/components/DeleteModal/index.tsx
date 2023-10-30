import { Button, Modal } from "@/atoms";
import { ButtonVariant } from "@/types";
import styles from "./deleteModal.module.css";
import { TrashIcon } from "@/Vectors";

type DeleteModalProps = {
  title: string;
  message: string;
  confirmationText?: string;
  cancelText?: string;
  confirmationAction: () => void;
  cancelAction: () => void;
  show: boolean;
};

const DeleteModal = ({
  title,
  message,
  confirmationText = "Yes, I want to delete",
  cancelText = "Cancel",
  cancelAction,
  confirmationAction,
  show,
}: DeleteModalProps) => {
  return (
    <Modal show={show} onDismiss={cancelAction}>
      <div className={styles.modal}>
        <span className={styles.deleteIcon}>
          <TrashIcon size={16} />
        </span>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.text}>{message}</p>
        <div className={styles.btnGroup}>
          <Button
            variant={ButtonVariant.Ghost}
            onClick={cancelAction}
            className={styles.btn}>
            {cancelText}
          </Button>
          <Button
            variant={ButtonVariant.Danger}
            onClick={confirmationAction}
            className={styles.btn}>
            {confirmationText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
