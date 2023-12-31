"use client";
import { User } from "@prisma/client";
import Image from "next/image";
import React from "react";
import AvatarPlaceholder from "./avatar-placeholder";
interface IAvatarGroupProps {
  users: User[];
}
const AvatarGroup: React.FC<IAvatarGroupProps> = ({ users = [] }) => {
  const sliceUsers = users.slice(0, 3);
  const positionMap: {
    [key: number]: string;
  } = {
    0: "top-0 left-[12px]",
    1: "bottom-0",
    2: "bottom-0 right-0",
  };
  return (
    <div className="relative h-11 w-11">
      {sliceUsers.map((user, index) => (
        <div
          key={user.id}
          className={`absolute inline-block rounded-full overflow-hidden h-[21px] w-[21px] ${positionMap[index]}`}
        >
          {user.image ? (
            <Image
              alt="Avatar"
              fill
              src={user.image}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <AvatarPlaceholder name={user.name!} />
          )}
        </div>
      ))}
    </div>
  );
};

export default AvatarGroup;
