import * as React from "react";
import { SVGProps } from "react";

const HamburgerIcon = ({
  fill = "currentColor",
  ...props
}: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
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
