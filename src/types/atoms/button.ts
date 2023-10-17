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
