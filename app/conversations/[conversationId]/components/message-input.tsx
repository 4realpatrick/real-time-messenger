"use client";

import clsx from "clsx";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface IMessageInputProps {
  placeholder?: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
}
const MessageInput: React.FC<IMessageInputProps> = ({
  placeholder = "",
  type = "text",
  id,
  required,
  disabled,
  register,
  errors,
}) => {
  return (
    <div className="relative w-full">
      <input
        disabled={disabled}
        id={id}
        type={type}
        autoComplete=""
        autoFocus
        placeholder={placeholder}
        {...register(id, { required })}
        className={clsx(
          `input input-bordered input-primary w-full rounded-full focus:outline-none`,
          disabled && "cursor-not-allowed"
        )}
      />
    </div>
  );
};

export default MessageInput;
