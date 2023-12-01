"use client";
import React from "react";
import clsx from "clsx";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { TSize } from "../constant/style";
type TStyleType =
  | "bordered"
  | "ghost"
  | "primary"
  | "secondary"
  | "accent"
  | "info"
  | "success"
  | "warning"
  | "error";
interface IInputProps {
  label: string;
  id: string;
  type?: React.HTMLInputTypeAttribute;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
  size?: TSize;
  styleType?: TStyleType;
}
const Input: React.FC<IInputProps> = ({
  label,
  id,
  type = "text",
  styleType = "primary",
  required,
  errors,
  disabled,
  register,
}) => {
  return (
    <label className="form-control w-full">
      <div className="label">
        <span className={`label-text text-${styleType}`}>{label}</span>
      </div>
      <input
        autoComplete={type === "password" ?"current-password" : ""}
        type={type}
        placeholder="Type here"
        disabled={disabled}
        className={clsx(
          `input input-bordered input-${styleType} w-full sm:text-sm sm:leading-6 focus:outline-none`,
          errors[id] && "focus:ring-rose-500",
          disabled && "opacity-50 cursor-not-allowed"
        )}
        {...register(id, { required })}
      />
    </label>
  );
};

export default Input;
