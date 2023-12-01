"use client";
import React from "react";
import Button from "../components/button";
import { signOut } from "next-auth/react";

const Users: React.FC = () => {
  return (
    <div>
      <Button onClick={() => signOut()}>Logout</Button>
    </div>
  );
};

export default Users;
