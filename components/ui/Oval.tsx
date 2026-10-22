import type { ReactNode } from "react";
import type { Discipline } from "@/data/disciplines";
import OvalSvg from "./OvalSvg";

type OvalProps = {
  discipline: Discipline;
  children: ReactNode;
  animated?: boolean;
  className?: string;
};

export default function Oval({
  discipline,
  children,
  animated = true,
  className = "",
}: OvalProps) {
  return (
    <span className={`relative inline-block ${className}`}>
      {children}
      <OvalSvg
        discipline={discipline}
        className={`pointer-events-none absolute inset-0 h-full w-full ${
          animated ? "oval-draw" : ""
        }`}
      />
    </span>
  );
}