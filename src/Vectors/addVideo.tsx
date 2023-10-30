import { IconProps } from "@/types";
import * as React from "react";
import { SVGProps } from "react";

const AddVideoIcon = ({
  size = 17,
  color,
  fill = "currentColor",
  ...props
}: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 17 16"
      {...props}
      fill="none">
      <g
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}>
        <path d="M8.854 13.613H4.64c-2.106 0-2.806-1.4-2.806-2.806V5.193c0-2.106.7-2.806 2.806-2.806h4.214c2.106 0 2.806.7 2.806 2.806v5.614c0 2.106-.707 2.806-2.806 2.806Z" />
        <path
          d="m13.514 11.4-1.854-1.3V5.893l1.854-1.3c.906-.633 1.653-.246 1.653.867v5.08c0 1.113-.747 1.5-1.653.86ZM8.166 7.333a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
          opacity={0.4}
        />
      </g>
    </svg>
  );
};
export default AddVideoIcon;
