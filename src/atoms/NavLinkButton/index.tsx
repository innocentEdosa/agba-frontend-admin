import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import style from "./navLinkButton.module.css";
import { isRouteActive } from "@/utils/isRouteActive";

export type LinkButtonProps = {
  href: string;
  icon: React.ReactNode;
  text: string;
} & React.ButtonHTMLAttributes<HTMLAnchorElement>;

const NavLinkButton = ({
  href,
  icon,
  text,
  className = "",
  ...attributes
}: LinkButtonProps) => {
  const pathName = usePathname();
  const isActive = isRouteActive(href, pathName || "");

  return (
    <Link
      href={href}
      className={clsx(style.linkBtn, className)}
      data-active={isActive}
      {...attributes}>
      {icon && <span className={style.icon}>{icon}</span>}
      {text && <span className={style.text}>{text}</span>}
    </Link>
  );
};

export default NavLinkButton;
