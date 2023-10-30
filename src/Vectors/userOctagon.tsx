import { IconProps } from "@/types";
import * as React from "react";
import { SVGProps } from "react";

const UserOctagonIcon = ({
  size = 20,
  color,
  fill = "currentColor",
  ...props
}: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 20 20"
    {...props}
    fill="none">
    <path
      fill={fill}
      d="m16.258 4.875-4.95-2.858a2.636 2.636 0 0 0-2.625 0L3.742 4.875A2.625 2.625 0 0 0 2.433 7.15v5.7c0 .933.5 1.8 1.309 2.275l4.95 2.858a2.636 2.636 0 0 0 2.625 0l4.95-2.858a2.625 2.625 0 0 0 1.308-2.275v-5.7a2.66 2.66 0 0 0-1.317-2.275ZM10 6.117c1.075 0 1.942.866 1.942 1.941A1.938 1.938 0 0 1 10 10a1.938 1.938 0 0 1-1.942-1.942c0-1.066.867-1.941 1.942-1.941Zm2.233 7.766H7.767a.837.837 0 0 1-.692-1.308c.567-.842 1.667-1.408 2.925-1.408 1.258 0 2.358.566 2.925 1.408a.84.84 0 0 1-.692 1.308Z"
    />
  </svg>
);
export default UserOctagonIcon;
