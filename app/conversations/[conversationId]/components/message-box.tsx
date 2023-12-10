"use client";
import Avatar from "@/app/components/avatar";
import { FullMessage } from "@/app/types";
import clsx from "clsx";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
interface IMessageProps {
  isLast: boolean;
  data: FullMessage;
}
const MessageBox: React.FC<IMessageProps> = ({ isLast, data }) => {
  const sesstion = useSession();
  // 是否是用户本身发送的消息
  const isOwn = sesstion?.data?.user?.email === data.sender.email;
  const seenList = (data.seen || [])
    .filter((user) => user.email !== data.sender.email)
    .map((user) => user.name)
    .join(", ");
  const container = clsx("flex gap-3 p-4", isOwn && "justify-end");
  const avatar = clsx(isOwn && "order-2");
  const body = clsx("flex flex-col gap-2");
  const message = clsx(
    "text-sm w-fit overflow-hidden",
    isOwn ? "bg-primary text-white" : "bg-gray-100",
    data.image ? "rounded-md p-0" : "rounded-full py-2 px-3"
  );

  return (
    <div className={clsx("chat", isOwn ? "chat-end" : "chat-start")}>
      <div className="chat-image">
        <Avatar user={data.sender} />
      </div>
      <div className="chat-header">
        {data.sender.name}
        <time className="text-xs opacity-50 ml-2">
          {format(data.createdAt, "p")}
        </time>
      </div>
      <div className={clsx("chat-bubble", isOwn && "chat-bubble-primary")}>
        {data.image ? (
          <Image
            alt="image"
            height={288}
            width={288}
            src={data.image}
            className="object-cover cursor-pointer hover:scale-105 transition translate"
          />
        ) : (
          data.body
        )}
      </div>
      {isLast && isOwn && seenList.length > 0 && (
        <div className="chat-footer opacity-50">{`Seen by ${seenList}`}</div>
      )}
    </div>
  );
};

export default MessageBox;
