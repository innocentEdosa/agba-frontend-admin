import * as React from "react";
import { SVGProps } from "react";

const SearchIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={20}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <path
      d="m17.5 17.5-5-5m1.667-4.167a5.833 5.833 0 1 1-11.667 0 5.833 5.833 0 0 1 11.667 0Z"
      stroke="#6D6E73"
      strokeWidth={1.667}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SearchIcon;
