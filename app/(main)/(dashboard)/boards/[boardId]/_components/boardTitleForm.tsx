"use client";

import { updateBoard } from "@/actions/updateBoard";
import FormError from "@/components/form/formError";
import FormInput from "@/components/form/formInput";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAction } from "@/hooks/useAction";
import { Board } from "@prisma/client";
import React, { ElementRef, useRef, useState } from "react";

interface BoardTitleFormProps {
  board: Board;
}

const BoardTitleForm = ({ board }: BoardTitleFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);
  const { toast } = useToast();
  const { execute, fieldsErrors } = useAction(updateBoard, {
    onSuccess: (data) => {
      toast({
        title: `Board "${data.title}" updated`,
      });
    },
    onError: (error) => {
      toast({
        title: error,
      });
    },
  });

  function disableEditing() {
    setIsEditing(false);
  }

  function enableEditing() {
    setIsEditing(true);
    setTimeout(() => {
      inputRef?.current?.select();
      inputRef?.current?.focus();
    }, 0);
  }

  function onSubmit(formData: FormData) {
    const title = formData.get("title") as string;
    execute({ title, id: board.id });
    disableEditing();
  }

  function onBlur() {
    formRef?.current?.requestSubmit();
  }

  if (isEditing) {
    return (
      <form ref={formRef} action={onSubmit}>
        <FormInput
          ref={inputRef}
          id="title"
          defaultValue={board.title}
          onBlur={onBlur}
          className="bg-transparent"
        />
        <FormError id="title" errors={fieldsErrors} />
      </form>
    );
  }

  return (
    <Button variant={"transparent"} className="p-2" onClick={enableEditing}>
      {board.title}
    </Button>
  );
};

export default BoardTitleForm;
