"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useSubscriptionModal } from "@/hooks/useSubscriptionModal";
import Image from "next/image";
import React from "react";

const SubscriptionModal = () => {
  const { isOpen, onClose } = useSubscriptionModal();
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full ">
        <div className="aspect-video relative overflow-hidden p-0 max-w-md flex items-center justify-center w-full mx-auto bg-indigo-400 rounded-md">
          <Image
            fill
            src={"/affiliate.png"}
            alt="Subscription image"
            className="object-contain"
          />
        </div>
        <div className="space-y-6 mx-auto">
          <h2 className="text-xl md:text-2xl font-bold">
            Upgrade to TaskMingle Pro Today!
          </h2>
          <div>
            <h3 className="text-lg md:text-xl mb-3">
              Explore more feature with us
            </h3>
            <ul className="list-disc">
              <li>Unlimited boards</li>
              <li>Advanced checklist</li>
              <li>And more...</li>
            </ul>
          </div>
        </div>

        <Button className="w-full md:w-[50%] mx-auto">Upgrade</Button>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionModal;
