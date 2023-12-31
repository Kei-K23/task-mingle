import React from "react";

const ClerkLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-slate-100 h-full flex justify-center items-center flex-col">
      {children}
    </div>
  );
};

export default ClerkLayout;
