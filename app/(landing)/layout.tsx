import React from "react";

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="bg-slate-100 h-full">{children}</div>;
};

export default LandingLayout;
