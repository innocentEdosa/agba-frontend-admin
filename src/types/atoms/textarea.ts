import { Direction } from "./shared";

export type TextareaProps = {
  label?: string;
  className?: string;
  error?: string;
  direction?: Direction;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;
