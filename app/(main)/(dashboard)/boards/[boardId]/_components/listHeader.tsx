"use client";

import { useToast } from "@/components/ui/use-toast";
import { List } from "@prisma/client";
import React, { ElementRef, useRef, useState } from "react";
import ListWrapper from "./listWrapper";
import FormInput from "@/components/form/formInput";
import { useEventListener } from "usehooks-ts";
import { useAction } from "@/hooks/useAction";
import { updateList } from "@/actions/updateList";

interface ListHeaderProps {
  list: List;
}

const ListHeader = ({ list }: ListHeaderProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);
  const { toast } = useToast();

  const { execute, fieldsErrors } = useAction(updateList, {
    onSuccess: (data) => {
      toast({
        title: `Successfully updated "${data.title}"`,
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
      inputRef?.current?.select();
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
    const id = formData.get("id") as string;

    if (list.title === title) {
      return disableEditing();
    }

    execute({
      title,
      boardId,
      id,
    });
  }

  useEventListener("keydown", onKeyDown);

  function onBlur() {
    formRef?.current?.requestSubmit();
  }

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
            onBlur={onBlur}
            defaultValue={list.title}
            errors={fieldsErrors}
          />
          <input type="hidden" name="boardId" value={list.boardId} />
          <input type="hidden" name="id" value={list.id} />
        </form>
      </ListWrapper>
    );
  }

  return (
    <div
      className="rounded-md w-full bg-white/90 text-black hover:bg-white/80 transition flex items-center justify-start gap-x-1 h-10 px-4 py-2"
      onClick={enableEditing}
    >
      {list.title}
    </div>
  );
};

export default ListHeader;
