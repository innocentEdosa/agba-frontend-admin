import { IconProps } from "@/types";
import * as React from "react";

const Edit2Icon = ({
  size = 24,
  color,
  fill = "currentColor",
  ...props
}: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 16 17"
    {...props}
    fill="none">
    <path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M8.84 2.9 3.367 8.692c-.207.22-.407.653-.447.953l-.247 2.16c-.086.78.474 1.314 1.247 1.18l2.147-.367c.3-.053.72-.273.926-.5l5.474-5.793c.946-1 1.373-2.14-.1-3.533-1.467-1.38-2.58-.894-3.527.106Z"
    />
    <path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M7.927 3.867a4.084 4.084 0 0 0 3.633 3.434M2 15.167h12"
      opacity={0.4}
    />
  </svg>
);
export default Edit2Icon;
