import React from "react";
import { Navbar } from "./_components/navbar";
import { Footer } from "./_components/footer";

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-slate-100 h-full">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default LandingLayout;
