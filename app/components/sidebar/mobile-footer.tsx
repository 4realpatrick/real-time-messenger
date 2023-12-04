"use client";
import useRoutes from "@/app/hooks/use-routes";
import useConversation from "@/app/hooks/user-conversation";
import React from "react";
import MobileItem from "./mobile-item";

const MobileFooter = () => {
  const routes = useRoutes();
  const { isOpen } = useConversation();
  if (isOpen) return <></>;
  return (
    <div className="fixed justify-between w-full bottom-0 z-40 flex items-center bg-white border-t-[1px] lg:hidden">
      {routes.map((route) => (
        <MobileItem {...route} key={route.href} />
      ))}
    </div>
  );
};

export default MobileFooter;
