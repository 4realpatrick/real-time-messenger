"use client";
import { User } from "@prisma/client";
import Image from "next/image";
import React, { useMemo, useState } from "react";
import AvatarPlaceholder from "./avatar-placeholder";
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
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              fill
              className="rounded-full"
              onError={() => setIsError(true)}
            />
          </div>
        </div>
      );
    } else {
      return <AvatarPlaceholder name={user.name!} />;
    }
  }, [user?.image, user?.name, isError]);
  return <>{memoAvatar}</>;
};

export default Avatar;
