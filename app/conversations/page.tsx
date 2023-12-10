"use client";
import React from "react";
import useConversation from "../hooks/user-conversation";
import EmptyState from "../components/empty-state";
import clsx from "clsx";
const Home = () => {
  const { isOpen } = useConversation();
  return (
    <div
      className={clsx(`lg:pl-80 h-full lg:block`, isOpen ? "block" : "hidden")}
    >
      <EmptyState />
    </div>
  );
};

export default Home;
