import * as React from "react"
import { SVGProps } from "react"

const ChevronDown = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={20}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M15.833 7.5 10 13.333 4.167 7.5"
      stroke="currentColor"
      strokeWidth={1.667}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default ChevronDown
