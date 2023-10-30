import * as React from "react";
const PauseIcon = ({ size = 24, color = "white" }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={color}
      xmlns="http://www.w3.org/2000/svg">
      <path d="M3.3 3.75A.75.75 0 0 1 4.05 3H7.8a.75.75 0 0 1 .75.75v16.5a.75.75 0 0 1-.75.75H4.05a.75.75 0 0 1-.75-.75V3.75Zm12 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 .75.75v16.5a.75.75 0 0 1-.75.75h-3.75a.75.75 0 0 1-.75-.75V3.75Z" />
    </svg>
  );
};
export default PauseIcon;
