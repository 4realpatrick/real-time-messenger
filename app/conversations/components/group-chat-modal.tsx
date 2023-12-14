"use client";
import Button from "@/app/components/button";
import Input from "@/app/components/input";
import Modal from "@/app/components/modal";
import PersonSelector from "@/app/components/person-selector";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
interface IGroupChatModal {
  users: User[];
  isOpen: boolean;
  onClose: () => void;
}

const GroupChatModal: React.FC<IGroupChatModal> = ({
  users,
  isOpen,
  onClose,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      members: [],
    },
  });
  const members = watch("members");
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    setIsLoading(true);
    axios
      .post("/api/conversations", {
        ...data,
        isGroup: true,
      })
      .then((res) => {
        router.refresh();
        onClose();
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => setIsLoading(false));
  };
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="pb-12">
            <h2 className="text-base font-semibold leading-7 text-primary">
              Create a group chat
            </h2>
            <p className="mt-1 text-sm leading-6 text-base-content">
              Create a chat with more than 2 people
            </p>
            <div className="mt-10 flex flex-col gap-y-8">
              <Input
                register={register}
                errors={errors}
                label="Name"
                id="name"
                disabled={isLoading}
                required
              />
              <PersonSelector
                value={members}
                disabled={isLoading}
                label="Members"
                options={users.map((user) => ({
                  value: user.id,
                  label: user.name,
                }))}
                onChange={(values) =>
                  setValue("members", values, {
                    shouldValidate: true,
                  })
                }
              />
            </div>
          </div>
        </div>
        <div className="divider"></div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Button disabled={isLoading} onClick={onClose} type="secondary">
            Cancel
          </Button>
          <Button disabled={isLoading} actionType="submit">
            Create
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default GroupChatModal;
