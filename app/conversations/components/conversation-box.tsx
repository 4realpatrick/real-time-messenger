"use client";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { useSession } from "next-auth/react";

import { FullConversationType } from "@/app/types";
import { Conversation, Message, User } from "@prisma/client";

import { format } from "date-fns";

import clsx from "clsx";
import useOtherUser from "@/app/hooks/use-other-user";
import Avatar from "@/app/components/avatar";
import AvatarGroup from "@/app/components/avatar-group";
interface IConversationBoxProps {
  data: FullConversationType;
  selected: boolean;
}
const ConversationBox: React.FC<IConversationBoxProps> = ({
  data,
  selected,
}) => {
  const otherUser = useOtherUser(data);
  const session = useSession();
  const router = useRouter();
  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`);
  }, [router, data.id]);

  const lastMessage = useMemo(() => {
    const messages = data.messages || [];
    return messages[messages.length - 1];
  }, [data.messages]);

  const userEmail = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  const hasSeen = useMemo(() => {
    if (!lastMessage) return false;
    const seenArray = lastMessage.seen || [];
    if (!userEmail) return false;
    return seenArray.some((user) => user.email === userEmail);
  }, [lastMessage, userEmail]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) return "[Image]";
    if (lastMessage?.body) return lastMessage.body;
    return "Start a conversation";
  }, [lastMessage]);

  return (
    <div
      className={clsx(
        `w-full relative flex items-center space-x-3 rounded-lg transition cursor-pointer p-3 my-0.5 group`,
        selected ? "bg-primary-content" : "hover:bg-primary-content"
      )}
      onClick={handleClick}
    >
      {data.isGroup ? (
        <AvatarGroup users={data.users} />
      ) : (
        <Avatar user={otherUser} />
      )}

      <div className="min-w-0 flex-1 ml-2">
        <div className="focus:outline-none">
          <div className="flex justify-between items-center mb-1">
            <p
              className={clsx(
                `text-md font-medium text-base-content group-hover:text-primary`,
                selected && "text-primary"
              )}
            >
              {data.name || otherUser.name}
            </p>
            {lastMessage?.createdAt && (
              <p className="text-sx text-gray-400 font-light">
                {format(new Date(lastMessage.createdAt), "p")}
              </p>
            )}
          </div>
          <p
            className={clsx(
              `truncate text-sm group-hover:text-secondary`,
              hasSeen ? "text-gray-500" : "text-black font-medium"
            )}
          >
            {lastMessageText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConversationBox;
