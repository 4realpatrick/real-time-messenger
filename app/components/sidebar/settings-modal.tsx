"use client";
import { User } from "@prisma/client";
import axios from "axios";
import { CldUploadButton, CldUploadWidgetResults } from "next-cloudinary";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Modal from "../modal";
import Input from "../input";
import Image from "next/image";
import Button from "../button";
import AvatarPlaceholder from "../avatar-placeholder";
interface ISettingsModalProps {
  currentUser: User;
  isOpen: boolean;
  onClose: () => void;
}
const SettingsModal: React.FC<ISettingsModalProps> = ({
  currentUser,
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
      name: currentUser?.name,
      image: currentUser.image,
    },
  });
  const image = watch("image");
  const handleUpload = (result: CldUploadWidgetResults) => {
    // @ts-expect-error Type Error by CldUploadWidgetResults
    setValue("image", result?.info?.secure_url, {
      shouldValidate: true,
    });
  };
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/settings", data)
      .then(() => {
        router.refresh();
        onClose();
      })
      .catch(() => toast.error("Something went wrong!"))
      .finally(() => setIsLoading(false));
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-primary">
              Profile
            </h2>
            {/* <p className="mt-1 text-sm leading-6 primary-content">
              Edit your info
            </p> */}
            <div className="mt-10 flex flex-col gap-y-8">
              <Input
                disabled={isLoading}
                label="Name"
                id="name"
                errors={errors}
                required
                register={register}
              />
              <div>
                <label className="block text-sm font-medium leading-6 text-primary">
                  Photo
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  {image || currentUser.image ? (
                    <Image
                      width={48}
                      height={48}
                      className="rounded-full"
                      src={image || currentUser.image}
                      alt="Avatar"
                    />
                  ) : (
                    <AvatarPlaceholder name={currentUser?.name} />
                  )}
                  <CldUploadButton
                    options={{ maxFiles: 1 }}
                    onUpload={handleUpload}
                    uploadPreset="vcpzquyc"
                    className="btn btn-md btn-primary btn-outline"
                    // @ts-expect-error
                    disabled={isLoading}
                  >
                    Change
                  </CldUploadButton>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Button disabled={isLoading} type="ghost">
              Cancel
            </Button>
            <Button disabled={isLoading} actionType="submit">
              Save
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default SettingsModal;
