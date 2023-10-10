import React from "react";
import style from "./button.module.css";
import clsx from "clsx";

export enum ButtonVariant {
  Primary = "primary",
  Secondary = "secondary",
  Danger = "danger",
  Neutral = "neutral",
  Ghost = "ghost",
}

export enum ButtonGenre {
  Default = "default",
  Text = "text",
}

export type ButtonProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  genre?: ButtonGenre;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

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
