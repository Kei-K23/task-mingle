"use client";
import { updateCard } from "@/actions/updateCard";
import FormButton from "@/components/form/formButton";
import FormTextArea from "@/components/form/formTextArea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAction } from "@/hooks/useAction";
import { CardWithList } from "@/type";
import { useQueryClient } from "@tanstack/react-query";
import { AlignCenter, X } from "lucide-react";
import { useParams } from "next/navigation";
import React, { ElementRef, useRef, useState } from "react";
import { useEventListener } from "usehooks-ts";

interface CardDescriptionProps {
  card: CardWithList;
}

const CardDescription = ({ card }: CardDescriptionProps) => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const { boardId } = useParams();
  const queryClient = useQueryClient();
  const textRef = useRef<ElementRef<"textarea">>(null);
  const formRef = useRef<ElementRef<"form">>(null);

  function disableEditing() {
    setIsEditing(false);
  }

  function enableEditing() {
    setIsEditing(true);
    setTimeout(() => {
      textRef?.current?.focus();
      textRef?.current?.select();
    }, 0);
  }

  function onKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      disableEditing();
    }
  }

  function onBlur() {
    if (card.description !== textRef?.current?.value) {
      formRef?.current?.requestSubmit();
    }
    return disableEditing();
  }

  function onSubmit(formData: FormData) {
    const description = formData.get("description") as string;

    if (card.description !== textRef?.current?.value) {
      execute({
        boardId: boardId as string,
        id: card.id,
        description,
      });
    }
  }

  useEventListener("keydown", onKeyDown);

  function onTextAreaKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      formRef?.current?.requestSubmit();
    }
  }

  const { execute, fieldsErrors } = useAction(updateCard, {
    onSuccess: (data) => {
      // revalidate the data fetching
      queryClient.invalidateQueries({
        queryKey: ["cards", card.id],
      });

      toast({
        title: `Card "${data.title} updated"`,
      });

      disableEditing();
    },
    onError: (e) => {
      toast({
        title: e,
      });
    },
  });

  return (
    <div>
      <div className="flex items-center gap-x-3">
        <AlignCenter className="w-5 h-5" />
        <h2 className="font-bold">Description</h2>
      </div>
      <div className="mt-2">
        {isEditing ? (
          <form
            action={onSubmit}
            ref={formRef}
            className="space-y-4 rounded-md w-full bg-white/90 text-black px-3 py-2"
          >
            <FormTextArea
              onTextAreaKeyDown={onTextAreaKeyDown}
              ref={textRef}
              id="description"
              className="w-full"
              placeholder={
                card.description
                  ? card.description
                  : "Add detail description and text for this card..."
              }
              defaultValue={card.description || undefined}
              onBlur={onBlur}
              errors={fieldsErrors}
            />
            <div className="flex items-center gap-x-3">
              <FormButton>Save</FormButton>
              <Button size={"icon"} variant={"ghost"} onClick={disableEditing}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </form>
        ) : (
          <div
            className="text-[15px] px-4 py-3 bg-slate-300 max-h-[200px] overflow-y-auto rounded-md"
            role="button"
            onClick={enableEditing}
          >
            {card.description ? (
              card.description
            ) : (
              <>Add detail description and text for this card...</>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CardDescription;
