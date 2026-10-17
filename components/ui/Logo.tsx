import { Link } from "@/i18n/navigation";

export function Logo() {
  return (
    <Link
      href="/"
      className="inline-flex flex-col font-logo text-logo uppercase"
    >
      <span className="pl-[0.6em]">Gabriel</span>{" "}
      <span>Hono</span>
    </Link>
  );
}