"use client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import { useAction } from "@/hooks/useAction";
import { MoreHorizontalIcon, Plus, Trash2Icon, X } from "lucide-react";
import React, { ElementRef, useRef } from "react";
import { ListWithCards } from "./listContainer";
import { Separator } from "@/components/ui/separator";
import { deleteList } from "@/actions/deleteList";

interface ListOptionsProps {
  list: ListWithCards;
}

const ListOptions = ({ list }: ListOptionsProps) => {
  const { toast } = useToast();
  const closeRef = useRef<ElementRef<"button">>(null);

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
    <Popover>
      <PopoverTrigger asChild>
        <Button className="rounded-md bg-white/90 text-black hover:bg-white/80">
          <MoreHorizontalIcon className="w-4 h-4 ml-auto" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="relative">
        <PopoverClose ref={closeRef} className="absolute top-1 right-1">
          <Button variant={"ghost"} className="absolute top-2 right-2 p-1 h-4">
            <X className="w-4 h-4" />
          </Button>
        </PopoverClose>
        <p className="text-[13px] text-center font-bold">Manage List</p>
        <div className="w-full mt-4">
          <Button
            variant={"ghost"}
            className="w-full flex items-center justify-start gap-x-1"
            size={"sm"}
          >
            <Plus className="w-4 h-4" />
            Add Card...
          </Button>

          <Button
            variant={"ghost"}
            className="w-full flex items-center justify-start gap-x-1"
            size={"sm"}
          >
            <Trash2Icon className="w-4 h-4" />
            Copy the list...
          </Button>
          <Separator className="w-full h-[2px] my-4" />
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
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ListOptions;
