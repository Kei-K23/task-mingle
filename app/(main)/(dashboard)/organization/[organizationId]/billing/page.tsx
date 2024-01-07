import React from "react";
import Info from "../_components/info";
import { Separator } from "@/components/ui/separator";

import { checkSubScription } from "@/lib/subscription";
import SubscribeButton from "./_components/subscribeButton";

const BillingPage = async ({
  params,
}: {
  params: { organizationId: string };
}) => {
  const isSubscribe = await checkSubScription();

  return (
    <div className="w-full">
      <Info isSubscribe={isSubscribe} />
      <Separator className="my-4 w-full" />
      <SubscribeButton isSubscribe={isSubscribe} />
    </div>
  );
};

export default BillingPage;
