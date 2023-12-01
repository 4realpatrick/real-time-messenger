"use client";
import { SessionProvider } from "next-auth/react";
interface IAuthContextProps {
  children: JSX.Element | React.ReactNode;
}
import React from "react";

const AuthContext: React.FC<IAuthContextProps> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthContext;
