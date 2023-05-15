"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classnames from "classnames";

const NavLink = ({
  href,
  children,
  className,
  activeClassName,
  noActiveClassName,
  exact,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  activeClassName?: string;
  noActiveClassName?: string;
  exact?: boolean;
}) => {
  const pathname = usePathname();
  const isActive = exact ? pathname === href : pathname.startsWith(href);
  return (
    <Link
      href={href}
      className={classnames(
        className,
        isActive ? activeClassName : noActiveClassName
      )}
    >
      {children}
    </Link>
  );
};

export default NavLink;
