import { Direction } from "./shared";

export type InputProps = {
  label?: string;
  className?: string;
  error?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  direction?: Direction;
} & React.InputHTMLAttributes<HTMLInputElement>;
