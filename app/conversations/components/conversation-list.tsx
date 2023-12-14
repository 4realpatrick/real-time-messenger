"use client";
import clsx from "clsx";
import { MdOutlineGroupAdd } from "react-icons/md";
import useConversation from "@/app/hooks/user-conversation";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { FullConversationType } from "@/app/types";
import ConversationBox from "./conversation-box";
import GroupChatModal from "./group-chat-modal";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { pusherClient } from "@/app/libs/pusher";
import find from "lodash/find";

interface IConversationListProps {
  initialItems: FullConversationType[];
  users: User[];
}
const ConversationList: React.FC<IConversationListProps> = ({
  initialItems,
  users,
}) => {
  const sesstion = useSession();
  const [items, setItems] = useState<typeof initialItems>(initialItems);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const { isOpen, conversationId } = useConversation();
  const pusherKey = useMemo(() => {
    return sesstion.data?.user?.email;
  }, [sesstion.data?.user?.email]);
  useEffect(() => {
    if (!pusherKey) return;
    const newConversationHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        if (find(current, { id: conversation.id })) return current;
        return [...current, conversation];
      });
    };
    const conversationUpdateHandler = (conversation: FullConversationType) => {
      setItems((current) =>
        current.map((currentConversation) => {
          if (currentConversation.id === conversation.id)
            return {
              ...currentConversation,
              messages: conversation.messages,
            };
          return currentConversation;
        })
      );
    };
    const conversationRemoveHandler = (conversation: FullConversationType) => {
      setItems((current) => [
        ...current.filter((cur) => cur.id !== conversation.id),
      ]);
      if (conversationId === conversation.id) {
        router.push("/conversations");
      }
    };
    pusherClient.subscribe(pusherKey);
    pusherClient.bind("conversation:new", newConversationHandler);
    pusherClient.bind("conversation:update", conversationUpdateHandler);
    pusherClient.bind("conversation:remove", conversationRemoveHandler);
    return () => {
      pusherClient.unsubscribe(pusherKey);
      pusherClient.unbind("conversation:new", newConversationHandler);
      pusherClient.unbind("conversation:update", conversationUpdateHandler);
    };
  }, [pusherKey, conversationId, router]);
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
