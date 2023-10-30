import { IconProps } from "@/types";
import * as React from "react";
import { SVGProps } from "react";

const HamburgerIcon = ({
  size = 24,
  color,
  fill = "currentColor",
  ...props
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    {...props}
    fill="transparent"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <path
      d="M4 6h16M4 12h16M4 18h16"
      stroke={fill}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default HamburgerIcon;
