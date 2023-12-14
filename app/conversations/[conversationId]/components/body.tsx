"use client";
import useConversation from "@/app/hooks/user-conversation";
import { FullMessage } from "@/app/types";
import React, { useEffect, useRef, useState } from "react";
import MessageBox from "./message-box";
import axios from "axios";
import { pusherClient } from "@/app/libs/pusher";
import find from "lodash/find";
interface IBodyProps {
  initialMessages: FullMessage[];
}
const Body: React.FC<IBodyProps> = ({ initialMessages }) => {
  const [messages, setMessages] = useState(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { conversationId } = useConversation();
  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);
  useEffect(() => {
    pusherClient.subscribe(conversationId);
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });

    const messageHandler = (message: FullMessage) => {
      axios.post(`/api/conversations/${conversationId}/seen`);
      setMessages((current) => {
        if (find(current, { id: message.id })) return current;
        return [...current, message];
      });
      bottomRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    };

    const updateMessageHandler = (newMessage: FullMessage) => {
      setMessages((current) =>
        current.map((currentMessage) => {
          if (currentMessage.id === newMessage.id) return newMessage;
          return currentMessage;
        })
      );
    };

    pusherClient.bind("messages:new", messageHandler);
    pusherClient.bind("message:update", updateMessageHandler);
    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind("messages:new", messageHandler);
      pusherClient.unbind("message:update", updateMessageHandler);
    };
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
