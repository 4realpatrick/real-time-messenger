import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { HiChat } from "react-icons/hi";
import { HiArrowLeftOnRectangle, HiUsers } from "react-icons/hi2";
import useConversation from "./user-conversation";
import { IconType } from "react-icons";
export interface IRoute {
  label: string;
  icon: IconType;
  href: string;
  onClick?: () => void;
  active?: boolean;
}
const useRoutes = () => {
  const pathname = usePathname();
  const { conversationId, isOpen } = useConversation();
  const routes = useMemo(
    () => [
      {
        label: "Chat",
        href: "/conversations",
        icon: HiChat,
        active: pathname === "/conversations" || isOpen,
      },
      {
        label: "Users",
        href: "/users",
        icon: HiUsers,
        active: pathname === "/users",
      },
      {
        label: "Logout",
        href: "#",
        onClick: signOut,
        icon: HiArrowLeftOnRectangle,
      },
    ],
    [pathname, isOpen]
  );
  return routes;
};
export default useRoutes;
