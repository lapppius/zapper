"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./navLink.module.scss";

export default function NavLink({ href, title }) {
  // let callbackUrl;
  // if (window && !window.location.pathname.startsWith("/login")) {
  // 	callbackUrl = window.location.pathname;
  // } else {
  // 	callbackUrl = window.location.hostname;
  // }
  const pathname = usePathname();
  const [isActive, setIsActive] = useState();

  useEffect(() => {
    setIsActive(pathname === href);
  }, [pathname, href]);

  return (
    <li className={styles.navLink}>
      <Link href={href} className={isActive ? `${styles.active}` : null}>
        {title}
      </Link>
    </li>
  );
}
