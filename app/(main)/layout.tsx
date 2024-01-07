import ModalProvider from "@/components/provider/modalProvider";
import QueryProvider from "@/components/provider/queryProvider";
import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <QueryProvider>
        <Toaster />
        {children}
        <ModalProvider />
      </QueryProvider>
    </ClerkProvider>
  );
};

export default MainLayout;
