"use client";
import React, { ElementRef, useRef, useState } from "react";
import ListWrapper from "./listWrapper";
import { Button } from "@/components/ui/button";
import { PlusCircle, X } from "lucide-react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import FormInput from "@/components/form/formInput";
import FormButton from "@/components/form/formButton";
import { useToast } from "@/components/ui/use-toast";
import { useAction } from "@/hooks/useAction";
import { createList } from "@/actions/createList";

interface ListFormProps {
  boardId: string;
}

const ListForm = ({ boardId }: ListFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);
  const { toast } = useToast();

  const { execute, fieldsErrors } = useAction(createList, {
    onSuccess: (data) => {
      toast({
        title: `Successfully created "${data.title}"`,
      });
      disableEditing();
    },
    onError: (e) => {
      toast({
        title: e,
      });
    },
  });
  //! need to clear error message from FromError when close the form
  function disableEditing() {
    setIsEditing(false);
  }

  function enableEditing() {
    setIsEditing(true);
    setTimeout(() => {
      inputRef?.current?.focus();
    }, 0);
  }

  function onKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      disableEditing();
    }
  }

  function onSubmit(formData: FormData) {
    const title = formData.get("title") as string;
    const boardId = formData.get("boardId") as string;

    execute({
      title,
      boardId,
    });
  }

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  if (isEditing) {
    return (
      <ListWrapper>
        <form
          action={onSubmit}
          ref={formRef}
          className="pt-4 space-y-4 rounded-md w-full bg-white/90 text-black px-3 py-2"
        >
          <FormInput
            ref={inputRef}
            id="title"
            className="w-full"
            placeholder="Enter list title..."
            errors={fieldsErrors}
          />
          <input type="hidden" name="boardId" value={boardId} />
          <div className="flex items-center gap-x-3">
            <FormButton>create</FormButton>
            <Button size={"icon"} variant={"ghost"} onClick={disableEditing}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </ListWrapper>
    );
  }

  return (
    <div>
      <ListWrapper>
        <Button
          className="rounded-md w-full bg-white/90 text-black hover:bg-white/80 transition flex items-center gap-x-1"
          onClick={enableEditing}
        >
          <PlusCircle className="w-4 h-4" />
          Add List
        </Button>
      </ListWrapper>
    </div>
  );
};

export default ListForm;
