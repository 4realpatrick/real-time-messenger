"use client";
import useRoutes from "@/app/hooks/use-routes";
import React, { useState } from "react";
import DesktopItem from "./desktop-item";
import { User } from "@prisma/client";
import Avatar from "../avatar";
interface IDesktopSidebarProps {
  currentUser: User;
}
const DesktopSidebar: React.FC<IDesktopSidebarProps> = ({ currentUser }) => {
  console.log(currentUser);

  const routes = useRoutes();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20 xl:px-6 lg:overflow-y-auto lg:bg-base-100 lg:border-r-[1px] lg:pb-4 lg:flex lg:flex-col justify-between">
      <nav className="mt-4 flex flex-col justify-between">
        <ul role="list" className="flex flex-col items-center space-y-1">
          {routes.map((route) => (
            <DesktopItem {...route} key={route.href} />
          ))}
        </ul>
      </nav>
      <nav className="mt-4 flex flex-col justify-between items-center">
        <div
          onClick={() => setIsOpen(true)}
          className="cursor-pointer hover:opacity-75 transition"
        >
          <Avatar user={currentUser} />
        </div>
      </nav>
    </div>
  );
};

export default DesktopSidebar;
