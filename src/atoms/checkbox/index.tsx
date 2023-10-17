import React from "react";
import styles from "./checkbox.module.css";
import { CheckMark } from "@/Vectors";
import { CheckboxProps, CheckboxSize } from "@/types";

const Checkbox = ({ label, size = CheckboxSize.Small }: CheckboxProps) => {
  return (
    <label className={styles.wrapper}>
      <input type="checkbox" className={styles.input} />
      <div data-size={size} className={styles.checkbox}>
        <span className={styles.checkMark}>
          <CheckMark
            width={12}
            height={size === CheckboxSize.Small ? 10 : 12}
            fill="currentColor"
          />
        </span>
      </div>
      <span className={styles.label}>{label}</span>
    </label>
  );
};

export default Checkbox;
