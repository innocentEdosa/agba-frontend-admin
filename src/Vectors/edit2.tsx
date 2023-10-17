import * as React from "react";
import { SVGProps } from "react";

const Edit2Icom = ({
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
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M8.84 2.9 3.367 8.693c-.207.22-.407.653-.447.953l-.247 2.16c-.086.78.474 1.314 1.247 1.18l2.147-.366c.3-.054.72-.274.926-.5l5.474-5.794c.946-1 1.373-2.14-.1-3.533C10.9 1.413 9.787 1.9 8.84 2.9Z"
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
export default Edit2Icom;
