import * as React from "react";
import { SVGProps } from "react";

const AddIcon = ({
  width = 24,
  height = 24,
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
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M6 12h12"
      opacity={0.4}
    />
    <path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12 18V6"
    />
  </svg>
);
export default AddIcon;
