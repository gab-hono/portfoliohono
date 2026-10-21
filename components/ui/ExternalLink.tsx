import { useTranslations } from "next-intl";
import type { ComponentProps } from "react";

type ExternalLinkProps = Omit<ComponentProps<"a">, "target" | "rel"> & {
  href: string;
};

export default function ExternalLink({
  href,
  children,
  className = "",
  ...props
}: ExternalLinkProps) {
  const t = useTranslations("ExternalLink");

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`underline decoration-1 underline-offset-4 hover:decoration-2 ${className}`}
      {...props}
    >
      {children}
      <span aria-hidden="true" className="ml-1 inline-block">
        {"\u2197\uFE0E"}
      </span>
      <span className="sr-only"> {t("newTab")}</span>
    </a>
  );
}