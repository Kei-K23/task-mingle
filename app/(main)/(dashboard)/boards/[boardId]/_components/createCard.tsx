"use client";

import { createCard } from "@/actions/createCard";
import FormButton from "@/components/form/formButton";
import FormTextArea from "@/components/form/formTextArea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAction } from "@/hooks/useAction";
import { Plus, X } from "lucide-react";
import React, { ElementRef, useEffect, useRef, useState } from "react";
import { useEventListener } from "usehooks-ts";
import { useParams } from "next/navigation";
import { ListWithCards } from "@/type";

interface CreateCardProps {
  list: ListWithCards;
  isCreatingCard: boolean;
  setIsCreatingCard: (data: boolean) => void;
}

const CreateCard = ({
  list,
  isCreatingCard,
  setIsCreatingCard,
}: CreateCardProps) => {
  const params = useParams();
  const [isEditing, setIsEditing] = useState(isCreatingCard);
  const formRef = useRef<ElementRef<"form">>(null);
  const textRef = useRef<ElementRef<"textarea">>(null);
  const { toast } = useToast();

  useEffect(() => {
    setIsEditing(isCreatingCard);
  }, [isCreatingCard]);

  const { execute, fieldsErrors } = useAction(createCard, {
    onSuccess: (data) => {
      toast({
        title: `Successfully create "${data.title}"`,
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
    setIsCreatingCard(false);
  }

  function enableEditing() {
    setIsEditing(true);
    setTimeout(() => {
      textRef?.current?.focus();
      textRef?.current?.select();
    }, 0);
  }

  function onSubmit(formData: FormData) {
    const title = formData.get("title") as string;
    const listId = formData.get("listId") as string;
    const boardId = formData.get("boardId") as string;

    execute({
      title,
      listId,
      boardId,
    });
  }

  function onKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      disableEditing();
    }
  }

  useEventListener("keydown", onKeyDown);

  function onBlur() {
    const text = textRef?.current?.value;
    if (text) {
      return formRef?.current?.requestSubmit();
    }

    return disableEditing();
  }

  function onTextAreaKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      formRef?.current?.requestSubmit();
    }
  }

  if (isEditing) {
    return (
      <form
        action={onSubmit}
        ref={formRef}
        className="space-y-4 rounded-md w-full bg-white/90 text-black px-3 py-2"
      >
        <FormTextArea
          onTextAreaKeyDown={onTextAreaKeyDown}
          ref={textRef}
          id="title"
          className="w-full"
          placeholder="Enter card title..."
          onBlur={onBlur}
          errors={fieldsErrors}
        />
        <input type="hidden" name="listId" value={list.id} />
        <input type="hidden" name="boardId" value={params.boardId} />
        <div className="flex items-center gap-x-3">
          <FormButton>create</FormButton>
          <Button size={"icon"} variant={"ghost"} onClick={disableEditing}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </form>
    );
  }

  return (
    <Button
      className="w-full flex items-center gap-x-1"
      variant={"secondary"}
      onClick={enableEditing}
    >
      <Plus className="w-4 h-4" /> Create Card
    </Button>
  );
};

export default CreateCard;
