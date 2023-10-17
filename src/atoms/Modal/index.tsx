import { Dialog, DialogOverlay, DialogContent } from "@reach/dialog";
import "@reach/dialog/styles.css";
import styles from "./modal.module.css";
import clsx from "clsx";

type ModalProps = {
  children: JSX.Element | JSX.Element[];
  show: boolean;
  onDismiss: () => void;
  transparent?: boolean;
};

const Modal = ({
  children,
  show = false,
  transparent = false,
  ...props
}: ModalProps) => {
  return (
    <DialogOverlay className={styles.wrapper} {...props} isOpen={show}>
      <DialogContent
        className={clsx(styles.modalContent, {
          [styles.bgTransparent]: transparent,
        })}>
        {children}
      </DialogContent>
    </DialogOverlay>
  );
};

export default Modal;
