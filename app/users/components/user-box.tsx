"use client";
import Avatar from "@/app/components/avatar";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
interface IUserBoxProps {
  data: User;
}
const UserBox: React.FC<IUserBoxProps> = ({ data }) => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const handleClick = useCallback(() => {
    setLoading(true);
    axios
      .post("/api/conversations", {
        userId: data.id,
      })
      .then((data) => {
        router.push(`/conversations/${data.data.id}`);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [data, router]);
  return (
    <div
      onClick={handleClick}
      className="w-full relative flex items-center space-x-3  p-3 hover:bg-primary-content rounded-lg transition cursor-pointer"
    >
      <Avatar user={data} />
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div className="flex justify-between items-center mb-1">
            <p className="text-sm font-medium text-base-content">{data.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBox;
