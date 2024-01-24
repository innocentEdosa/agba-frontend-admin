import React from "react";
import styles from "./style.module.css";
import { createPortal } from "react-dom";
import { usePopper } from "react-popper";
import { CloseIcon } from "@/Vectors";

const Description = ({
  text,
  maxWordCount = 20,
}: {
  text: string;
  maxWordCount?: number;
}) => {
  // truncate text if it exceeds maxLength
  // show a "read more" button if text is truncated
  // when read more is clicked or hovered, show an absolute positioned modal containing the full text
  const isTextTruncated = text.split(" ").length > maxWordCount;
  const truncatedText = text.split(" ").slice(0, maxWordCount).join(" ");
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [referenceElement, setReferenceElement] =
    React.useState<HTMLDivElement | null>(null);
  const [popperElement, setPopperElement] =
    React.useState<HTMLDivElement | null>(null);
  const { styles: popperStyles, attributes } = usePopper(
    referenceElement,
    popperElement,
    {
      placement: "top",
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, 10],
          },
        },
        {
          name: "flip",
          options: {
            fallbackPlacements: ["left", "bottom", "right"],
          },
        },
      ],
    }
  );

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div ref={setReferenceElement} className={styles.wrapper}>
      <p>{!isTextTruncated && text}</p>
      {isTextTruncated && (
        <div>
          <p className={styles.text}>{truncatedText} </p>
          <button
            className={styles.seeMoreBtn}
            onClick={isModalOpen ? handleModalClose : handleModalOpen}>
            {isModalOpen ? "...See less" : "  ...See more"}
          </button>
        </div>
      )}

      {/* add a modal via react portal to show complete text on 
      hover or when see more button is clicked */}
      {isModalOpen &&
        createPortal(
          <div
            ref={setPopperElement}
            className={styles.modal}
            style={popperStyles.popper}
            {...attributes.popper}>
            <p className={styles.modal__text}>{text}</p>
            <button className={styles.modal__close} onClick={handleModalClose}>
              <CloseIcon />
            </button>
          </div>,
          document.body
        )}
    </div>
  );
};

export default Description;
