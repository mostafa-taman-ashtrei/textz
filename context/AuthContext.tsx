"use client";

import { SessionProvider } from "next-auth/react";

interface props {
  children: React.ReactNode;
}

const AuthContext: React.FC<props> = ({ children }) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
};

export default AuthContext;