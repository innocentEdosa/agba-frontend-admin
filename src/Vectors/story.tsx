import * as React from "react";
import { SVGProps } from "react";
const StoryIcon = ({
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
      d="M16.42 7.95a6.253 6.253 0 0 1 0 8.84 6.253 6.253 0 0 1-8.84 0 6.253 6.253 0 0 1 0-8.84 6.253 6.253 0 0 1 8.84 0Z"
    />
    <path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M8.25 21.64c-2-.8-3.75-2.25-4.91-4.26a9.89 9.89 0 0 1-1.25-6.25m3.76-6.65A9.936 9.936 0 0 1 12 2.36c2.27 0 4.36.77 6.04 2.05m-2.29 17.23c2-.8 3.75-2.25 4.91-4.26a9.89 9.89 0 0 0 1.25-6.25"
      opacity={0.4}
    />
  </svg>
);
export default StoryIcon;
