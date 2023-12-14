"use client";
import React, { useMemo, useState } from "react";
interface IAvatarProps {
  name?: string | null;
}
const AvatarPlaceholder: React.FC<IAvatarProps> = ({ name = "" }) => {
  return (
    <div className="avatar online placeholder">
      <div className="bg-base-200 text-primary rounded-full w-9 h-9 md:h-11 md:w-11 ring ring-primary">
        <span className="text-xl">{name?.[0].toUpperCase()}</span>
      </div>
    </div>
  );
};

export default AvatarPlaceholder;
