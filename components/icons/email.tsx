import { SVGProps } from "react";

export default function Email(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        d="M1 4h22v16H1V4Zm0 1l11 8.5L23 5"
      ></path>
    </svg>
  );
}
