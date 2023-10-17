import * as React from "react";
import { SVGProps } from "react";

const TeacherIcon = ({
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
      d="M14.025 13.033a.833.833 0 0 1 1.292.7v1.075c0 1.059-.825 2.192-1.817 2.525l-2.658.884c-.467.158-1.225.158-1.684 0L6.5 17.333c-1-.333-1.817-1.466-1.817-2.525v-1.083a.833.833 0 0 1 1.284-.7l1.716 1.117c.659.441 1.492.658 2.325.658.834 0 1.667-.217 2.325-.658l1.692-1.109Z"
    />
    <path
      fill={fill}
      d="m16.65 5.383-4.992-3.275c-.9-.591-2.383-.591-3.283 0L3.358 5.383c-1.608 1.042-1.608 3.4 0 4.45l1.334.867 3.683 2.4c.9.592 2.383.592 3.283 0l3.659-2.4 1.141-.75v2.55a.63.63 0 0 0 .625.625.63.63 0 0 0 .625-.625V8.4c.334-1.075-.008-2.325-1.058-3.017Z"
    />
  </svg>
);
export default TeacherIcon;
