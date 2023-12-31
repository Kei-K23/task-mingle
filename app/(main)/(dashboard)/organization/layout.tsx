import React from "react";
import Sidebar from "../_components/sidebar";

const OrganizationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-full pt-20 px-4 md:pt-24 max-w-6xl 2xl:max-w-screen-xl mx-auto">
      <div className="flex gap-x-8">
        <div className="w-64 shrink-0 hidden md:block">
          <Sidebar sidebarStorageKey="taskMingle-d-sidebar" />
        </div>
        {children}
      </div>
    </main>
  );
};

export default OrganizationLayout;
