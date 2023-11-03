import { Dialog } from "@headlessui/react";
import styles from "./modal.module.css";
import clsx from "clsx";

type ModalProps = {
  children: React.ReactNode;
  show: boolean;
  onDismiss: () => void;
  transparent?: boolean;
};

const Modal = ({
  children,
  show = false,
  transparent = false,
  onDismiss,
}: ModalProps) => {
  return (
    <Dialog open={show} onClose={onDismiss} className={styles.wrapper} unmount>
      <div className={styles.overlay} aria-hidden="true" />
      <div className={styles.modal}>
        <Dialog.Panel
          className={clsx(styles.modalContent, {
            [styles.bgTransparent]: transparent,
          })}>
          {children}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default Modal;
