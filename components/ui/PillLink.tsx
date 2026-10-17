import type { ComponentProps } from "react";
import { Link } from "@/i18n/navigation";

type Props = ComponentProps<typeof Link>;

export function PillLink({ className = "", ...props }: Props) {
  return (
    <Link
      className={`inline-block rounded-full border border-foreground px-5 py-1.5 text-body font-bold transition-colors duration-200 hover:bg-foreground hover:text-background motion-reduce:transition-none ${className}`}
      {...props}
    />
  );
}