import React from "react";
import { Navbar } from "./_components/navbar";

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-slate-100 h-full">
      <Navbar />
      {children}
    </div>
  );
};

export default LandingLayout;
