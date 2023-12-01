"use client";
import clsx from "clsx";
import React from "react";
import { TSize } from "../constant/style";
type TButtonType =
  | "neutral"
  | "primary"
  | "secondary"
  | "accent"
  | "ghost"
  | "link"
  | "link"
  | "success"
  | "warning"
  | "error";
// Extra small | Small | Medium（default） | Large
type TButtonSize = "xs" | "sm" | "md" | "lg";
interface IButtonProps {
  actionType?: "button" | "submit" | "reset";
  fullWidth?: boolean;
  children: string | JSX.Element | React.ReactNode;
  type?: TButtonType;
  extraTailwindCls?: string;
  outline?: boolean;
  disabled?: boolean;
  size?: TSize;
  responsive?: boolean;
  loading?: boolean;
  onClick?: () => void;
}
const Button: React.FC<IButtonProps> = ({
  children,
  outline = false,
  type = "primary",
  size = "md",
  fullWidth = false,
  extraTailwindCls = "",
  loading = false,
  actionType,
  disabled,
  responsive,
  onClick,
}) => {
  return (
    <button
      className={clsx(
        `btn btn-${type} btn-${size}`,
        outline && "btn-outline",
        fullWidth && "btn-block",
        responsive && "sm:btn-sm md:btn-md lg:btn-lg",
        extraTailwindCls
      )}
      type={actionType}
      disabled={disabled}
      onClick={onClick}
    >
      {loading && <span className="loading loading-spinner" />}
      {children}
    </button>
  );
};

export default Button;
