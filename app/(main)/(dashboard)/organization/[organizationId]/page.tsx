import React from "react";

const OrganizationIdPage = ({
  params,
}: {
  params: { organizationId: string };
}) => {
  return <div>Organization Id page : {params.organizationId}</div>;
};

export default OrganizationIdPage;
