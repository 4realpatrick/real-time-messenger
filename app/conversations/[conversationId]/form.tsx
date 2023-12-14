"use client";

import useConversation from "@/app/hooks/user-conversation";
import axios from "axios";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import MessageInput from "./components/message-input";
import { useState } from "react";
import { CldUploadButton, CldUploadWidgetResults } from "next-cloudinary";

const Form = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { conversationId } = useConversation();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    setValue("message", "", { shouldValidate: true });
    axios
      .post("/api/messages", {
        ...data,
        conversationId,
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const handleUploadPhoto = (result: CldUploadWidgetResults) => {
    if (isLoading) return;
    setIsLoading(true);
    axios
      .post("/api/messages", {
        // @ts-expect-error Type Error by CldUploadWidgetResults
        image: result?.info?.secure_url as string,
        conversationId,
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <div className="py-4 px-4 border-t flex items-center gap-2 lg:gap-4 w-full">
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onUpload={handleUploadPhoto}
        // https://console.cloudinary.com/settings/c-59cea2b94253c149a4a03f1aba1520/upload_presets/new
        uploadPreset="vcpzquyc"
        className={`${isLoading && "pointer-events-none"}`}
      >
        <HiPhoto
          size={30}
          className={`text-primary ${isLoading && "!text-base-content"}`}
        />
      </CldUploadButton>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-2 lg:gap-4 w-full"
      >
        <MessageInput
          disabled={isLoading}
          id="message"
          register={register}
          errors={errors}
          required
          placeholder="Write a message"
        />
        <button
          type="submit"
          className="btn btn-primary rounded-full hover:opacity-90"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="loading loading-spinner" />
          ) : (
            <HiPaperAirplane size={18} className="text-primary-content" />
          )}
        </button>
      </form>
    </div>
  );
};
export default Form;
