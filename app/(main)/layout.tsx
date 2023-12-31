import { ClerkProvider } from "@clerk/nextjs";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return <ClerkProvider>{children}</ClerkProvider>;
};

export default MainLayout;
