import type { ReactNode } from "react";
import UnderlineSvg from "./UnderlineSvg";

type SectionTitleProps = {
  children: ReactNode;
  as?: "h2" | "h3";
  className?: string;
};

export default function SectionTitle({
  children,
  as: Heading = "h2",
  className = "",
}: SectionTitleProps) {
  return (
    <Heading className={`inline-block font-hand text-title ${className}`}>
      {children}
      <UnderlineSvg className="block h-[0.35em] w-full" />
    </Heading>
  );
}