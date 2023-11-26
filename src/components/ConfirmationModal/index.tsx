import { Button, Modal } from "@/atoms";
import { ButtonVariant } from "@/types";
import styles from "./deleteModal.module.css";
import { LoaderIcon, TrashIcon } from "@/Vectors";

type DeleteModalProps = {
  title: string;
  message: string;
  confirmationText?: string;
  cancelText?: string;
  confirmationAction: () => void;
  cancelAction: () => void;
  actionBtnVariant?: ButtonVariant;
  show: boolean;
  isActionProcessing?: boolean;
  showIcon?: boolean;
};

const ConfirmationModal = ({
  title,
  message,
  confirmationText = "Yes, I want to delete",
  cancelText = "Cancel",
  cancelAction,
  confirmationAction,
  actionBtnVariant = ButtonVariant.Danger,
  isActionProcessing,
  showIcon = true,
  show,
}: DeleteModalProps) => {
  return (
    <Modal show={show} onDismiss={cancelAction}>
      <div className={styles.modal}>
        {!!showIcon && (
          <span className={styles.deleteIcon}>
            <TrashIcon size={16} />
          </span>
        )}
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
            variant={actionBtnVariant}
            onClick={confirmationAction}
            className={styles.btn}>
            {!isActionProcessing && confirmationText}
            {isActionProcessing && <LoaderIcon />}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
