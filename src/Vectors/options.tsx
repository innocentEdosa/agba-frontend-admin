import * as React from "react";
import { SVGProps } from "react";
const OptionsIcon = ({
  width = 20,
  height = 20,
  fill = "currentColor",
  ...props
}: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none">
    <path
      fill={fill}
      d="M11.667 10a1.667 1.667 0 1 0-3.334 0 1.667 1.667 0 0 0 3.334 0Zm0 5a1.667 1.667 0 1 0-3.334 0 1.667 1.667 0 0 0 3.334 0Zm0-10a1.667 1.667 0 1 0-3.334 0 1.667 1.667 0 0 0 3.334 0Z"
    />
  </svg>
);
export default OptionsIcon;
