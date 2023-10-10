import clsx from "clsx";
import React from "react";
import style from "./input.module.css";

export type InputProps = {
  label?: string;
  className?: string;
  error?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = ({
  label,
  className = "",
  error,
  startIcon,
  endIcon,
  ...attributes
}: InputProps) => {
  return (
    <label className={style.wrapper}>
      {label && <span className={style.label}>{label}</span>}{" "}
      <div>
        <div
          data-starticon={!!startIcon}
          data-endicon={!!endIcon}
          className={clsx(style.inputWrapper, className)}>
          {startIcon && (
            <span className={clsx(style.icon, style.startIcon)}>
              {startIcon}
            </span>
          )}
          <input data-error={!!error} type="text" {...attributes} />
          {endIcon && (
            <span className={clsx(style.icon, style.endIcon)}>{endIcon}</span>
          )}
        </div>
        {error && <span className={style.error}>{error}</span>}
      </div>
    </label>
  );
};

export default Input;
