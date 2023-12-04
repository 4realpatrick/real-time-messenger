"use client";
import clsx from "clsx";
import React, { useCallback } from "react";
import Link from "next/link";
import { IRoute } from "@/app/hooks/use-routes";

const DesktopItem: React.FC<IRoute> = ({
  label,
  icon: Icon,
  href,
  onClick,
  active,
}) => {
  const handleClick = useCallback(() => {
    onClick?.();
  }, [onClick]);
  return (
    <li onClick={handleClick}>
      <Link
        href={href}
        className={clsx(
          `
        group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold
        text-base-content hover:text-primary
      `,
          active && "bg-primary-content !text-primary"
        )}
      >
        <Icon className="h-6 w-6 shrink-0" />
        <span className="sr-only">{label}</span>
      </Link>
    </li>
  );
};

export default DesktopItem;
