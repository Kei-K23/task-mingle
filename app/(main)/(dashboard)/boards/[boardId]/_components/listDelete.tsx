"use client";
import { deleteList } from "@/actions/deleteList";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAction } from "@/hooks/useAction";
import { ListWithCards } from "@/type";
import { Trash2Icon } from "lucide-react";
import React from "react";

interface ListDeleteProps {
  list: ListWithCards;
  closeRef: React.RefObject<HTMLButtonElement>;
}

const ListDelete = ({ list, closeRef }: ListDeleteProps) => {
  const { toast } = useToast();
  const { execute, isLoading } = useAction(deleteList, {
    onSuccess: (data) => {
      toast({
        title: `List "${data.title}" deleted!`,
      });
      closeRef?.current?.click();
    },
    onError: (e) => {
      toast({
        title: e,
      });
    },
  });

  function onDelete() {
    execute({
      id: list.id,
      boardId: list.boardId,
    });
  }

  return (
    <Button
      disabled={isLoading}
      variant={"destructive"}
      className="w-full flex items-center gap-x-1"
      size={"sm"}
      onClick={onDelete}
    >
      <Trash2Icon className="w-4 h-4" />
      Delete the List
    </Button>
  );
};

export default ListDelete;
