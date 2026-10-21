import type { SVGProps } from "react";

// Subrayado manuscrito de los títulos (dibujado por Gabriel).

export default function UnderlineSvg(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 7 150 11"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <g transform="translate(0,25) scale(0.1,-0.1)" fill="currentColor">
        <path d="M280 160 c-140 -3 -248 -8 -240 -11 8 -3 319 -3 690 0 523 5 624 7 450 12 -254 7 -527 7 -900 -1z"/>
        <path d="M220 100 c-124 -3 -220 -8 -213 -13 6 -4 236 -3 510 3 274 6 605 7 736 4 176 -5 237 -4 237 4 0 12 -789 14 -1270 2z"/>
      </g>
    </svg>
  );
}