"use client";
import useConversation from "@/app/hooks/user-conversation";
import { FullMessage } from "@/app/types";
import React, { useEffect, useRef, useState } from "react";
import MessageBox from "./message-box";
import axios from "axios";
interface IBodyProps {
  initialMessages: FullMessage[];
}
const Body: React.FC<IBodyProps> = ({ initialMessages }) => {
  const [messages] = useState(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { conversationId } = useConversation();
  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);
  return (
    <div className="flex-1 overflow-y-auto px-2">
      {messages.map((msg, index) => (
        <MessageBox
          isLast={index === messages.length - 1}
          key={msg.id}
          data={msg}
        />
      ))}
      <div ref={bottomRef} className="pt-24" />
    </div>
  );
};

export default Body;
