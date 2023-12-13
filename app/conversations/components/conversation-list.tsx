"use client";
import clsx from "clsx";
import { MdOutlineGroupAdd } from "react-icons/md";
import useConversation from "@/app/hooks/user-conversation";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { FullConversationType } from "@/app/types";
import ConversationBox from "./conversation-box";
import GroupChatModal from "./group-chat-modal";
import { User } from "@prisma/client";

interface IConversationListProps {
  initialItems: FullConversationType[];
  users: User[];
}
const ConversationList: React.FC<IConversationListProps> = ({
  initialItems,
  users,
}) => {
  const [items, setItems] = useState<typeof initialItems>(initialItems);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const { isOpen, conversationId } = useConversation();

  return (
    <>
      <GroupChatModal
        users={users}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <aside
        className={clsx(
          `fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200`,
          isOpen ? "hidden" : "block w-full left-0"
        )}
      >
        <div className="px-5">
          <div className="flex justify-between mb-4 pt-4">
            <div className="text-2xl font-bold text-neutral-800">Message</div>
            <div
              className="rounded-full p-2 bg-gray-200 text-gray-600 cursor-pointer hover:opacity-75 hover:bg-primary hover:text-primary-content transition"
              onClick={() => setIsModalOpen(true)}
            >
              <MdOutlineGroupAdd size={20} />
            </div>
          </div>
          {items.map((item) => (
            <ConversationBox
              key={item.id}
              data={item}
              selected={conversationId === item.id}
            />
          ))}
        </div>
      </aside>
    </>
  );
};

export default ConversationList;
