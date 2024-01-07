"use client";
import { redirectStripe } from "@/actions/redirectStripe";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAction } from "@/hooks/useAction";
import { useSubscriptionModal } from "@/hooks/useSubscriptionModal";
import { Loader2 } from "lucide-react";
import React from "react";

interface SubscribeButtonProps {
  isSubscribe: boolean;
}

const SubscribeButton = ({ isSubscribe }: SubscribeButtonProps) => {
  const { onOpen } = useSubscriptionModal();
  const { toast } = useToast();
  const { execute, isLoading } = useAction(redirectStripe, {
    onSuccess: (data) => {
      window.location.href = data;
    },
    onError: (error) => {
      toast({ title: error });
    },
  });

  function onClick() {
    if (isSubscribe) {
      execute({});
    } else {
      onOpen();
    }
  }

  return (
    <Button
      disabled={isLoading}
      onClick={onClick}
      className="flex items-center gap-x-1"
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Loading...
        </>
      ) : isSubscribe ? (
        "Manage subscription"
      ) : (
        "Upgrade your plan"
      )}
    </Button>
  );
};

export default SubscribeButton;
