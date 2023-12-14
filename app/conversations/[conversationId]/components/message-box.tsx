"use client";
import Avatar from "@/app/components/avatar";
import { FullMessage } from "@/app/types";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";
import ImageModal from "./image-modal";
import dayjs from "dayjs";
interface IMessageProps {
  isLast: boolean;
  data: FullMessage;
}
const MessageBox: React.FC<IMessageProps> = ({ isLast, data }) => {
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const sesstion = useSession();
  // 是否是用户本身发送的消息
  const isOwn = sesstion?.data?.user?.email === data.sender.email;
  const seenList = (data.seen || [])
    .filter((user) => user.email !== data.sender.email)
    .map((user) => user.name)
    .join(", ");

  return (
    <div className={clsx("chat", isOwn ? "chat-end" : "chat-start")}>
      <div className="chat-image">
        <Avatar user={data.sender} />
      </div>
      <div className="chat-header">
        {data.sender.name}
        <time className="text-xs opacity-50 ml-2">
          {dayjs(data.createdAt).format("YYYY-MM-DD h:mm A")}
        </time>
      </div>
      <div className={clsx("chat-bubble", isOwn && "chat-bubble-primary")}>
        <ImageModal
          src={data.image}
          isOpen={imageModalOpen}
          onClose={() => setImageModalOpen(false)}
        />
        {data.image ? (
          <Image
            onClick={() => setImageModalOpen(true)}
            alt="Image"
            height={288}
            width={288}
            src={data.image}
            className="object-cover cursor-pointer hover:scale-105 transition translate"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
