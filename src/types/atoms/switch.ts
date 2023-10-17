import { Direction } from "./shared";

export type SwitchProps = {
  label?: string;
  className?: string;
  direction?: Direction;
} & React.InputHTMLAttributes<HTMLInputElement>;
