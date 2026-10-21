import { Link } from "@/i18n/navigation";
import LogoSvg from "./LogoSvg";

export function Logo() {
  return (
    <Link
      href="/"
      className="inline-flex flex-col font-logo text-logo uppercase"
    >
      <LogoSvg className="h-(--logo-height) w-auto" />
      <span className="sr-only">Gabriel Hono</span>
    </Link>
  );
}