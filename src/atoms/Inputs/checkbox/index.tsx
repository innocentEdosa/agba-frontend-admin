import React, { ForwardedRef, forwardRef } from "react";
import styles from "./checkbox.module.css";
import { CheckMark } from "@/Vectors";
import { CheckboxProps, CheckboxSize } from "@/types";

const Checkbox = (
  { label, size = CheckboxSize.Small, ...rest }: CheckboxProps,
  ref: ForwardedRef<HTMLInputElement>
) => {
  return (
    <label className={styles.wrapper}>
      <input type="checkbox" ref={ref} className={styles.input} {...rest} />
      <div data-size={size} className={styles.checkbox}>
        <span className={styles.checkMark}>
          <CheckMark
            size={size === CheckboxSize.Small ? 10 : 12}
            color="currentColor"
          />
        </span>
      </div>
      <span className={styles.label}>{label}</span>
    </label>
  );
};

export default forwardRef(Checkbox);
