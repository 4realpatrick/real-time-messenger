"use client";
import { User } from "@prisma/client";
import Image from "next/image";
import React, { useMemo } from "react";
interface IAvatarProps {
  user: User;
}
const Avatar: React.FC<IAvatarProps> = ({ user }) => {
  const memoAvatar = useMemo(() => {
    if (user.image) {
      return (
        <div className="avatar online">
          <div className="w-9 h-9 rounded-full md:h-11 md:w-11">
            <Image alt="Avatar" src={user.image} fill />
          </div>
        </div>
      );
    } else {
      return (
        <div className="avatar online placeholder">
          <div className="bg-neutral text-neutral-content rounded-full w-9 h-9 md:h-11 md:w-11">
            <span className="text-xl">{user.name![0].toUpperCase()}</span>
          </div>
        </div>
      );
    }
  }, [user.image, user.name]);
  return <>{memoAvatar}</>;
};

export default Avatar;
