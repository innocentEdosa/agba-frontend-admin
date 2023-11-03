import * as React from "react";
import { SVGProps } from "react";

const CheckmarkIcon = ({ size = 24, color = "black" }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21.2 7.3 19.8 6z" />
    </svg>
  );
}

export default CheckmarkIcon;
