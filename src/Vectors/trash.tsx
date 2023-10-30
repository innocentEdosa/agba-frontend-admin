import { IconProps } from "@/types";

const TrashIcon = ({
  size = 24,
  color,
  fill = "currentColor",
  ...props
}: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      {...props}
      viewBox="0 0 16 17"
      fill="none">
      <path
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M14 4.487a67.801 67.801 0 0 0-6.68-.333c-1.32 0-2.64.066-3.96.2L2 4.487"
      />
      <path
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="m5.667 3.813.146-.873C5.92 2.307 6 1.833 7.127 1.833h1.746c1.127 0 1.214.5 1.314 1.114l.146.866"
        opacity={0.34}
      />
      <path
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="m12.567 6.594-.434 6.713c-.073 1.047-.133 1.86-1.993 1.86H5.86c-1.86 0-1.92-.813-1.993-1.86l-.434-6.713"
      />
      <path
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M6.887 11.5h2.22M6.333 8.833h3.334"
        opacity={0.34}
      />
    </svg>
  );
};
export default TrashIcon;
