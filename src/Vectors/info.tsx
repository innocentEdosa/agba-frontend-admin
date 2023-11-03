import * as React from "react";
import { SVGProps } from "react";

const InfoIcon = ({
  width = 20,
  height = 20,
  color = "currentColor",
  ...props
}: SVGProps<SVGSVGElement>) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <path
      d="M7 4.33333V7M7 9.66667H7.00667M13 7C13 10.3137 10.3137 13 7 13C3.68629 13 1 10.3137 1 7C1 3.68629 3.68629 1 7 1C10.3137 1 13 3.68629 13 7Z"
      strokeWidth={1.33333}
      strokeLinecap="round"
      strokeLinejoin="round"
      stroke={color}
    />
  </svg>
);

export default InfoIcon;
