"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useModal } from "@/hooks/useModal";
import { fetcher } from "@/lib/fetcher";
import { CardWithList } from "@/type";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import CardHeader from "./cardHeader";
import { Loader2 } from "lucide-react";
import CardDescription from "./cardDescription";
import CardAction from "./cardAction";

const CardModal = () => {
  const { onClose, isOpen, id } = useModal();

  const { data: cardData, status } = useQuery<{
    success: boolean;
    data: CardWithList;
  }>({
    queryKey: ["cards", id],
    queryFn: () => fetcher(`/api/cards/${id}`),
  });

  if (status === "pending") {
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <div className="flex items-center justify-center gap-x-2 w-full">
          <Loader2 className="w-6 h-6 animate-spin" />
          Loading data...
        </div>
      </DialogContent>
    </Dialog>;
  }

  if (status === "success") {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="space-y-4">
          {cardData.data ? (
            <CardHeader card={cardData.data} />
          ) : (
            <CardHeader.Skeleton />
          )}
          <div className="grid grid-cols-1 md:grid-cols-4 space-y-2 gap-4">
            <div className="col-span-3">
              <CardDescription card={cardData.data} />
            </div>
            <div>
              <CardAction card={cardData.data} />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
};

export default CardModal;
