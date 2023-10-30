export enum CheckboxSize {
  Small = "small",
  Medium = "medium",
  Large = "large",
}

export type CheckboxProps = {
  label: string;
  size?: CheckboxSize;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">;
