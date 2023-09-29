import clsx from "clsx";
import React from "react";
import style from "./textarea.module.css";

export type TextareaProps = {
  label?: string;
  className?: string;
  error?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = ({
  label,
  className = "",
  error,
  ...attributes
}: TextareaProps) => {
  return (
    <label className={style.wrapper}>
      {label && <span className={style.label}>{label}</span>}{" "}
      <div>
        <div className={clsx(style.textAreaWrapper, className)}>
          <textarea rows={3} data-error={!!error} {...attributes} />
        </div>
        {error && <span className={style.error}>{error}</span>}
      </div>
    </label>
  );
};

export default Textarea;
