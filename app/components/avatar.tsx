"use client";
import { User } from "@prisma/client";
import Image from "next/image";
import React, { useMemo, useState } from "react";
interface IAvatarProps {
  user: User;
}
const Avatar: React.FC<IAvatarProps> = ({ user }) => {
  const [isError, setIsError] = useState<boolean>(false);
  const memoAvatar = useMemo(() => {
    if (user?.image && !isError) {
      return (
        <div className="avatar online">
          <div className="w-9 h-9 rounded-full md:h-11 md:w-11 ring ring-primary ring-offset-base-100 ring-offset-2">
            <Image
              alt="Avatar"
              src={user.image}
              fill
              className="rounded-full"
              onError={() => setIsError(true)}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="avatar online placeholder">
          <div className="bg-base-200 text-primary rounded-full w-9 h-9 md:h-11 md:w-11 ring ring-primary">
            <span className="text-xl">{user?.name?.[0].toUpperCase()}</span>
          </div>
        </div>
      );
    }
  }, [user?.image, user?.name, isError]);
  return <>{memoAvatar}</>;
};

export default Avatar;
