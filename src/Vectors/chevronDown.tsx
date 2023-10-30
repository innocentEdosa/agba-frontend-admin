import { IconProps } from "@/types";
import * as React from "react";
import { SVGProps } from "react";

const ChevronDown = ({
  size = 20,
  color,
  fill = "currentColor",
  ...props
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <path
      d="M15.833 7.5 10 13.333 4.167 7.5"
      stroke="currentColor"
      strokeWidth={1.667}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ChevronDown;
