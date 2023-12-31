import { OrganizationProfile } from "@clerk/nextjs";
import React from "react";

const SettingsPage = () => {
  return (
    <div className="h-full w-full">
      <OrganizationProfile
        appearance={{
          elements: {
            rootBox: {
              width: "100%",
              boxShadow: "none",
            },
            card: {
              border: "1px solid #e5e5e5",
              width: "100%",
              boxShadow: "none",
            },
          },
        }}
      />
    </div>
  );
};

export default SettingsPage;
