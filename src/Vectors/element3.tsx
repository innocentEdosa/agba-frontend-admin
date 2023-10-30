import { IconProps } from "@/types";
import * as React from "react";
import { SVGProps } from "react";

const Element3Icon = ({
  size = 20,
  color,
  fill = "currentColor",
  ...props
}: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    {...props}
    viewBox="0 0 20 20"
    fill="none">
    <path
      fill={fill}
      d="M18.333 7.1V3.317c0-1.175-.533-1.65-1.858-1.65h-3.367c-1.325 0-1.858.475-1.858 1.65v3.775c0 1.183.533 1.65 1.858 1.65h3.367c1.325.008 1.858-.467 1.858-1.642Zm0 9.375v-3.367c0-1.325-.533-1.858-1.858-1.858h-3.367c-1.325 0-1.858.533-1.858 1.858v3.367c0 1.325.533 1.858 1.858 1.858h3.367c1.325 0 1.858-.533 1.858-1.858ZM8.75 7.1V3.317c0-1.175-.533-1.65-1.858-1.65H3.525c-1.325 0-1.858.475-1.858 1.65v3.775c0 1.183.533 1.65 1.858 1.65h3.367C8.217 8.75 8.75 8.275 8.75 7.1Zm0 9.375v-3.367c0-1.325-.533-1.858-1.858-1.858H3.525c-1.325 0-1.858.533-1.858 1.858v3.367c0 1.325.533 1.858 1.858 1.858h3.367c1.325 0 1.858-.533 1.858-1.858Z"
    />
  </svg>
);
export default Element3Icon;
