import type { ReactNode } from "react";
import UnderlineSvg from "./UnderlineSvg";

type SectionTitleProps = {
  children: ReactNode;
  as?: "h2" | "h3";
  className?: string;
  id?: string;
};

export default function SectionTitle({
  children,
  as: Heading = "h2",
  className = "",
  id,
}: SectionTitleProps) {
  return (
    <Heading id={id} className={`inline-block font-hand text-title ${className}`}>
      {children}
      <UnderlineSvg className="block h-[0.35em] w-full" />
    </Heading>
  );
}