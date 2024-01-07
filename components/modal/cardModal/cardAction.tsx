"use client";
import { copyCard } from "@/actions/copyCard";
import { deleteCard } from "@/actions/deleteCard";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAction } from "@/hooks/useAction";
import { useModal } from "@/hooks/useModal";
import { CardWithList } from "@/type";
import { Copy, FunctionSquare, Trash2Icon } from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";

interface CardActionProps {
  card: CardWithList;
}

const CardAction = ({ card }: CardActionProps) => {
  const { toast } = useToast();
  const { onClose } = useModal();
  const { boardId } = useParams();

  const { execute: executeForCopy, isLoading: isLoadingForCopy } = useAction(
    copyCard,
    {
      onSuccess: (data) => {
        toast({
          title: `Card "${data.title}" copied!`,
        });
        onClose();
      },
      onError: (e) => {
        toast({
          title: e,
        });
      },
    }
  );

  function onCopy() {
    executeForCopy({
      id: card.id,
      listId: card.listId,
      boardId: boardId as string,
    });
  }

  const { execute: executeForDelete, isLoading: isLoadingForDelete } =
    useAction(deleteCard, {
      onSuccess: (data) => {
        toast({
          title: `Card "${data.title}" deleted!`,
        });
        onClose();
      },
      onError: (e) => {
        toast({
          title: e,
        });
      },
    });

  function onDelete() {
    executeForDelete({
      id: card.id,
      listId: card.listId,
      boardId: boardId as string,
    });
  }

  return (
    <div className="w-full">
      <div className="flex items-center gap-x-3">
        <FunctionSquare className="w-5 h-5" />
        <h2 className="font-bold">Actions</h2>
      </div>
      <div className="mt-2 w-full space-y-2">
        <Button
          size={"sm"}
          variant={"secondary"}
          className="w-full flex items-center gap-x-1"
          disabled={isLoadingForCopy}
          onClick={onCopy}
        >
          <Copy className="w-4 h-4" /> Copy
        </Button>
        <Button
          size={"sm"}
          variant={"destructive"}
          className="w-full flex items-center gap-x-1"
          disabled={isLoadingForDelete}
          onClick={onDelete}
        >
          <Trash2Icon className="w-4 h-4" />
          Delete
        </Button>
      </div>
    </div>
  );
};

export default CardAction;
