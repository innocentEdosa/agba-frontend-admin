import React from "react";
import styles from "./switch.module.css";
import clsx from "clsx";
import { Direction, SwitchProps } from "@/types";

const Switch = ({
  label,
  className,
  direction = Direction.Horizontal,
  ...attributes
}: SwitchProps) => {
  return (
    <label className={styles.wrapper} data-direction={direction}>
      {label && <span className={styles.label}>{label}</span>}
      <div className={styles.checkboxWrapper}>
        <input
          type="checkbox"
          role="switch"
          className={styles.input}
          {...attributes}
        />
        <div className={styles.checkbox}>
          <span
            className={clsx(styles.checkboxValue, styles.checkboxValueFalse)}
            aria-hidden="true">
            No
          </span>
          <span
            className={clsx(styles.checkboxValue, styles.checkboxValueTrue)}
            aria-hidden="true">
            Yes
          </span>
        </div>
      </div>
    </label>
  );
};

export default Switch;
