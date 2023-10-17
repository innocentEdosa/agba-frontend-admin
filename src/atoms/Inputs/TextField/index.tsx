import clsx from "clsx";
import React from "react";
import style from "./input.module.css";
import { Direction, InputProps } from "@/types";

const TextField = ({
  label,
  className = "",
  error,
  startIcon,
  endIcon,
  direction = Direction.Horizontal,
  ...attributes
}: InputProps) => {
  return (
    <label className={style.wrapper} data-direction={direction}>
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

export default TextField;
