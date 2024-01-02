"use client";
import { createBoard } from "@/actions/createBoard";
import FormButton from "@/components/form/formButton";
import FormInput from "@/components/form/formInput";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import { useAction } from "@/hooks/useAction";
import { X } from "lucide-react";
import React from "react";

interface FormPopoverProps {
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "center" | "end" | "start";
  sideOffset?: number;
}

const FormPopover = ({
  children,
  align,
  side,
  sideOffset,
}: FormPopoverProps) => {
  const { toast } = useToast();
  const { fieldsErrors, execute } = useAction(createBoard, {
    onSuccess: (_data) => {
      toast({ title: "Board created" });
    },
    onError: (error) => {
      toast({ title: error });
    },
  });

  function onSubmit(formData: FormData) {
    const title = formData.get("title") as string;
    execute({ title });
  }

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent align={align} side={side} sideOffset={sideOffset}>
        <div>
          <h2 className="text-center text-sm font-bold">Create new Board</h2>
        </div>
        <PopoverClose asChild>
          <Button variant={"ghost"} className="absolute top-2 right-2">
            <X className="w-4 h-4" />
          </Button>
        </PopoverClose>
        <form action={onSubmit} className="space-y-4">
          <div className="space-y-4">
            <FormInput
              id="title"
              label="Create Board"
              type="text"
              errors={fieldsErrors}
            />
          </div>
          <FormButton>Create</FormButton>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default FormPopover;
