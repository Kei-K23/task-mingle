"use client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MoreHorizontalIcon, Plus, X } from "lucide-react";
import React, { ElementRef, useRef } from "react";
import { Separator } from "@/components/ui/separator";
import ListDelete from "./listDelete";
import ListCopy from "./listCopy";
import { ListWithCards } from "@/type";

interface ListOptionsProps {
  list: ListWithCards;
  setIsCreatingCard: (data: boolean) => void;
  isCreatingCard: boolean;
}

const ListOptions = ({
  list,
  setIsCreatingCard,
  isCreatingCard,
}: ListOptionsProps) => {
  const closeRef = useRef<ElementRef<"button">>(null);

  function onClose() {
    closeRef?.current?.click();
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="rounded-md" variant={"secondary"}>
          <MoreHorizontalIcon className="w-4 h-4 ml-auto" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="relative">
        <PopoverClose ref={closeRef} className="absolute top-1 right-1">
          <Button variant={"ghost"} className="absolute top-2 right-2 p-1 h-4">
            <X className="w-4 h-4" />
          </Button>
        </PopoverClose>
        <p className="text-[14px] text-center font-bold">Manage List</p>
        <div className="w-full mt-4">
          <Button
            variant={"ghost"}
            className="w-full flex items-center justify-start gap-x-1"
            size={"sm"}
            onClick={() => {
              setIsCreatingCard(!isCreatingCard);
              onClose();
            }}
          >
            <Plus className="w-4 h-4" />
            Add Card...
          </Button>

          <ListCopy list={list} closeRef={closeRef} />
          <Separator className="w-full h-[2px] my-4" />
          <ListDelete list={list} closeRef={closeRef} />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ListOptions;
