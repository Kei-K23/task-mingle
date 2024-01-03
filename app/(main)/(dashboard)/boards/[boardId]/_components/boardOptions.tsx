"use client";
import { deleteBoard } from "@/actions/deleteBoard";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import { useAction } from "@/hooks/useAction";
import { useAuth } from "@clerk/nextjs";
import { MoreHorizontalIcon, Trash2Icon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface BoardOptionsProps {
  id: string;
}

const BoardOptions = ({ id }: BoardOptionsProps) => {
  const { orgId } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const { execute, isLoading } = useAction(deleteBoard, {
    onSuccess: (data) => {
      toast({
        title: "Successfully deleted Board!",
      });
      router.push(`/organization/${orgId}`);
    },
    onError: (e) => {
      toast({
        title: e,
      });
    },
  });

  function onDelete() {
    execute({
      id,
    });
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"transparent"}>
          <MoreHorizontalIcon className="w-4 h-4 ml-auto" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="relative">
        <PopoverClose className="absolute top-1 right-1">
          <Button variant={"ghost"} className="absolute top-2 right-2 p-1 h-4">
            <X className="w-4 h-4" />
          </Button>
        </PopoverClose>
        <p className="text-center font-bold">Manage Board</p>
        <div className="w-full mt-4">
          <Button
            disabled={isLoading}
            variant={"destructive"}
            className="w-full flex items-center gap-x-1"
            onClick={onDelete}
          >
            <Trash2Icon className="w-4 h-4" />
            Delete the Board
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default BoardOptions;
