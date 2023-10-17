import React from "react";
import style from "./button.module.css";
import clsx from "clsx";
import { ButtonGenre, ButtonProps, ButtonVariant } from "@/types";

const Button = ({
  children,
  variant = ButtonVariant.Primary,
  genre = ButtonGenre.Default,
  className = "",
  ...attributes
}: ButtonProps) => {
  return (
    <button
      data-variant={variant}
      data-genre={genre}
      className={clsx(style.button, className)}
      {...attributes}>
      {children}
    </button>
  );
};

export default Button;
