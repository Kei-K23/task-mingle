"use client";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { useModal } from "@/hooks/useModal";
import { fetcher } from "@/lib/fetcher";
import { CardWithList } from "@/type";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import CardHeader from "./cardHeader";

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
      <DialogContent>Loading </DialogContent>
    </Dialog>;
  }

  if (status === "success") {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <CardHeader card={cardData.data} />
          <h1>{cardData?.data.title}</h1>
        </DialogContent>
      </Dialog>
    );
  }
};

export default CardModal;
