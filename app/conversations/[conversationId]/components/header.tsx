"use client";
import Avatar from "@/app/components/avatar";
import useOtherUser from "@/app/hooks/use-other-user";
import { Conversation, User } from "@prisma/client";
import Link from "next/link";
import { Profiler, useMemo, useState } from "react";
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2";
import ProfileDrawer from "./profile-drawer";
import AvatarGroup from "@/app/components/avatar-group";
import useActiveList from "@/app/hooks/use-active-list";

interface IHeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}
const Header: React.FC<IHeaderProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { members } = useActiveList();
  const isActive = members.includes(otherUser?.email!);
  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }
    return isActive ? "Active" : "Offline";
  }, [conversation]);
  return (
    <>
      <ProfileDrawer
        data={conversation}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
      <div className="w-full flex border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm">
        <div className="flex gap-3 items-center">
          <Link href="/conversations" className="lg:hidden block text-primary">
            <HiChevronLeft size={32} />
          </Link>
          {conversation.isGroup ? (
            <AvatarGroup users={conversation.users} />
          ) : (
            <Avatar user={otherUser} />
          )}
          <div className="flex flex-col">
            <div>{conversation.name || otherUser.name}</div>
            <div className="text-sm font-light text-neutral">{statusText}</div>
          </div>
        </div>
        <HiEllipsisHorizontal
          size={32}
          onClick={() => setDrawerOpen(true)}
          className="cursor-pointer hover:text-primary transition drawer-button"
        />
      </div>
    </>
  );
};

export default Header;
