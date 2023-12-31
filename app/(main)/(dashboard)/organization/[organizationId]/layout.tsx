import React from "react";
import OrgController from "./_components/OrgController";

const OrganizationIdLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <OrgController />
      {children}
    </>
  );
};

export default OrganizationIdLayout;
