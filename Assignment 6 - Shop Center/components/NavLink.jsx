"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

function NavLink({ href, className, children, ...rest }) {
  const pathName = usePathname();

  const formattedClassName =
    pathName === href ? className + " border-b" : className;

  return (
    <Link href={href} className={formattedClassName}>
      {children}
    </Link>
  );
}

export default NavLink;
