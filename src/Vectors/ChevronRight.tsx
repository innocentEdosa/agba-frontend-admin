import * as React from "react";
import { SVGProps } from "react";

const ChevronRight = ({
  stroke = "currentColor",
  ...props
}: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}>
    <path
      stroke={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.667}
      d="M7.5 4.167 13.333 10 7.5 15.834"
    />
  </svg>
);

export default ChevronRight;
