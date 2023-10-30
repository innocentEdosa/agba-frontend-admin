import { IconProps } from "@/types";
import * as React from "react";
import { SVGProps } from "react";
const OptionsIcon = ({
  size = 20,
  color,
  fill = "currentColor",
  ...props
}: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 20 20"
    {...props}
    fill="none">
    <path
      fill={fill}
      d="M11.667 10a1.667 1.667 0 1 0-3.334 0 1.667 1.667 0 0 0 3.334 0Zm0 5a1.667 1.667 0 1 0-3.334 0 1.667 1.667 0 0 0 3.334 0Zm0-10a1.667 1.667 0 1 0-3.334 0 1.667 1.667 0 0 0 3.334 0Z"
    />
  </svg>
);
export default OptionsIcon;
