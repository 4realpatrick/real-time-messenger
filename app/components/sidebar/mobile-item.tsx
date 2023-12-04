"use client";
import { IRoute } from "@/app/hooks/use-routes";
import clsx from "clsx";
import Link from "next/link";
import React, { useCallback } from "react";

const MobileItem: React.FC<Omit<IRoute, "label">> = ({
  href,
  icon: Icon,
  active,
  onClick,
}) => {
  const handleClick = useCallback(() => {
    onClick?.();
  }, [onClick]);

  return (
    <Link
      href={href}
      className={clsx(
        `group
        flex 
        gap-x-3
        text-sm
        leading-6
        font-semibold
        w-full
        justify-center
        p-4
        text-gray-500`,
        active && "bg-primary-content text-primary"
      )}
      onClick={handleClick}
    >
      <Icon className="h-6 w-6" />
    </Link>
  );
};

export default MobileItem;
