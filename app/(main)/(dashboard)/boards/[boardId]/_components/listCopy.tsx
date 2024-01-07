"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAction } from "@/hooks/useAction";
import { Copy } from "lucide-react";
import React from "react";
import { copyList } from "@/actions/copyList";
import { ListWithCards } from "@/type";

interface ListCopy {
  list: ListWithCards;
  closeRef: React.RefObject<HTMLButtonElement>;
}

const ListCopy = ({ list, closeRef }: ListCopy) => {
  const { toast } = useToast();
  const { execute, isLoading } = useAction(copyList, {
    onSuccess: (data) => {
      toast({
        title: `List "${data.title}" copied!`,
      });
      closeRef?.current?.click();
    },
    onError: (e) => {
      toast({
        title: e,
      });
    },
  });

  function onCopy() {
    execute({
      id: list.id,
      boardId: list.boardId,
    });
  }

  return (
    <Button
      disabled={isLoading}
      variant={"ghost"}
      className="w-full flex items-center justify-start gap-x-1"
      size={"sm"}
      onClick={onCopy}
    >
      <Copy className="w-4 h-4" />
      Copy the list...
    </Button>
  );
};

export default ListCopy;
