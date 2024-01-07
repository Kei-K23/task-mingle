"use client";
import { updateCard } from "@/actions/updateCard";
import ActionTooltip from "@/components/actionTooltip";
import FormInput from "@/components/form/formInput";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { useAction } from "@/hooks/useAction";
import { CardWithList } from "@/type";
import { useQueryClient } from "@tanstack/react-query";
import { Layout } from "lucide-react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { ElementRef, useRef, useState } from "react";
import { useEventListener } from "usehooks-ts";

interface CardHeaderProps {
  card: CardWithList;
}

const CardHeader = ({ card }: CardHeaderProps) => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const { boardId } = useParams();
  const queryClient = useQueryClient();
  const inputRef = useRef<ElementRef<"input">>(null);
  const formRef = useRef<ElementRef<"form">>(null);

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

  function onBlur() {
    if (card.title !== inputRef?.current?.value) {
      formRef?.current?.requestSubmit();
    }
    return disableEditing();
  }

  function onSubmit(formData: FormData) {
    const title = formData.get("title") as string;

    if (card.title !== inputRef?.current?.value) {
      execute({
        boardId: boardId as string,
        id: card.id,
        title,
      });
    }
  }

  useEventListener("keydown", onKeyDown);

  const { execute, isLoading } = useAction(updateCard, {
    onSuccess: (data) => {
      // revalidate the data fetching
      queryClient.invalidateQueries({
        queryKey: ["cards", card.id],
      });

      queryClient.invalidateQueries({
        queryKey: ["cards", "activity-log", card.id],
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

  if (isEditing) {
    return (
      <div>
        <div className="flex items-center gap-x-3">
          <Layout className="w-5 h-5" />
          <form action={onSubmit} ref={formRef} className="w-[90%]">
            <FormInput
              disabled={isLoading}
              ref={inputRef}
              id="title"
              defaultValue={card.title}
              required={true}
              onBlur={onBlur}
              className="w-full"
            />
          </form>
        </div>
        <h2 className="text-muted-foreground mt-2">
          In list{" "}
          <span className="underline font-semibold">{card.list.title}</span>
        </h2>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-x-3">
        <Layout className="w-5 h-5" />
        <ActionTooltip title="Click to edit the card title">
          <h2
            role="button"
            onClick={enableEditing}
            className="font-bold text-lg md:text-xl"
          >
            {card.title}
          </h2>
        </ActionTooltip>
      </div>
      <h2 className="text-muted-foreground mt-2">
        In list{" "}
        <span className="underline font-semibold">{card.list.title}</span>
      </h2>
    </div>
  );
};

CardHeader.Skeleton = function skeleton() {
  return (
    <div>
      <div className="flex items-center gap-x-3">
        <Skeleton className="w-5 h-5" />
        <div className="w-[80%]">
          <Skeleton className="h-[20px] w-full" />
        </div>
      </div>
      <Skeleton className="w-[20px] h-[5px]" />
    </div>
  );
};

export default CardHeader;
