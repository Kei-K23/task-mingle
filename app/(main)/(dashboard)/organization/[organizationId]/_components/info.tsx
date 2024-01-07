"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useOrganization } from "@clerk/nextjs";
import { CreditCard } from "lucide-react";
import Image from "next/image";
import React from "react";

const Info = ({ isSubscribe }: { isSubscribe: boolean }) => {
  const { organization, isLoaded } = useOrganization();
  if (!isLoaded) {
    return <Info.Skeleton />;
  }

  return (
    <div className="flex items-center gap-x-2">
      <div className="w-[60px] h-14 relative">
        <Image
          src={organization?.imageUrl!}
          alt={organization?.name!}
          fill
          className="rounded-lg object-contain"
        />
      </div>
      <div>
        <h2 className="font-bold">{organization?.name}</h2>
        <div className="flex items-center gap-x-1 text-sm text-muted-foreground">
          <CreditCard className="w-4 h-4" />
          {isSubscribe ? "Pro" : "Free"}
        </div>
      </div>
    </div>
  );
};

Info.Skeleton = function SkeletonInfo() {
  return (
    <div className="flex items-center gap-x-2">
      <div className="w-[60px] h-14">
        <Skeleton className="w-full h-full" />
      </div>
      <div>
        <Skeleton className="w-14 h-4 mb-2" />
        <div className="flex items-center gap-x-1 ">
          <Skeleton className="w-4 h-4 " />
          <Skeleton className="w-6 h-4" />
        </div>
      </div>
    </div>
  );
};

export default Info;
