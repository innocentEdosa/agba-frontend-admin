import { IconProps } from "@/types";
import * as React from "react";
import { SVGProps } from "react";

const BookIcon = ({
  size = 20,
  color,
  fill = "currentColor",
  ...props
}: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 20 20"
      {...props}
      fill="none">
      <path
        fill={fill}
        d="M17.083 13.333v2.084a2.92 2.92 0 0 1-2.916 2.916H5.833a2.92 2.92 0 0 1-2.916-2.916v-.542A2.38 2.38 0 0 1 5.292 12.5H16.25c.458 0 .833.375.833.833ZM12.917 1.667H7.083c-3.333 0-4.166.833-4.166 4.166v6.317a3.586 3.586 0 0 1 2.375-.9H16.25a.836.836 0 0 0 .833-.833V5.833c0-3.333-.833-4.166-4.166-4.166Zm-2.084 7.291H6.667a.63.63 0 0 1-.625-.625.63.63 0 0 1 .625-.625h4.166a.63.63 0 0 1 .625.625.63.63 0 0 1-.625.625Zm2.5-2.916H6.667a.63.63 0 0 1-.625-.625.63.63 0 0 1 .625-.625h6.666a.63.63 0 0 1 .625.625.63.63 0 0 1-.625.625Z"
      />
    </svg>
  );
};
export default BookIcon;
