import { IconProps } from "@/types";

const CloseIcon = ({
  size = 24,
  color,
  fill = "currentColor",
  ...props
}: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}>
    <path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18 18 6M6 6l12 12"
    />
  </svg>
);

export default CloseIcon;
