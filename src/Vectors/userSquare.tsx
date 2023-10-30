import { IconProps } from "@/types";
import * as React from "react";
import { SVGProps } from "react";

const UserSquareIcon = ({
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
      d="M13.492 1.667H6.508c-3.033 0-4.841 1.808-4.841 4.841v6.984c0 2.341 1.075 3.95 2.966 4.558.55.192 1.184.283 1.875.283h6.984c.691 0 1.325-.091 1.875-.283 1.891-.608 2.966-2.217 2.966-4.558V6.508c0-3.033-1.808-4.841-4.841-4.841Zm3.591 11.825c0 1.783-.7 2.908-2.108 3.375-.808-1.592-2.725-2.725-4.975-2.725-2.25 0-4.158 1.125-4.975 2.725h-.008c-1.392-.45-2.1-1.584-2.1-3.367V6.508c0-2.35 1.241-3.591 3.591-3.591h6.984c2.35 0 3.591 1.241 3.591 3.591v6.984Z"
    />
    <path
      fill={fill}
      d="M10 6.667A2.98 2.98 0 0 0 7.017 9.65 2.987 2.987 0 0 0 10 12.642a2.987 2.987 0 0 0 2.983-2.992A2.98 2.98 0 0 0 10 6.667Z"
    />
  </svg>
);
export default UserSquareIcon;
