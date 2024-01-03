import React from "react";
import OrgController from "./_components/OrgController";
import { auth } from "@clerk/nextjs";
import { startCase } from "@/lib/helper";

export async function generateMetadata() {
  const { orgSlug } = auth();
  return {
    title: startCase(orgSlug || "organization"),
  };
}

const OrganizationIdLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <OrgController />
      {children}
    </>
  );
};

export default OrganizationIdLayout;
