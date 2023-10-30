import clsx from "clsx";
import React, { ForwardedRef, forwardRef } from "react";
import style from "./textarea.module.css";
import { Direction, TextareaProps } from "@/types";

const Textarea = (
  {
    label,
    className = "",
    error,
    direction = Direction.Horizontal,
    ...attributes
  }: TextareaProps,
  ref: ForwardedRef<HTMLTextAreaElement>
) => {
  return (
    <label className={style.wrapper} data-direction={direction}>
      {label && <span className={style.label}>{label}</span>}
      <div>
        <div className={clsx(style.textAreaWrapper, className)}>
          <textarea
            ref={ref}
            cols={500}
            rows={3}
            data-error={!!error}
            {...attributes}
          />
        </div>
        {error && <span className={style.error}>{error}</span>}
      </div>
    </label>
  );
};

export default forwardRef(Textarea);
