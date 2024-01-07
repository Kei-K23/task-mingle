"use client";
import { updateCard } from "@/actions/updateCard";
import FormInput from "@/components/form/formInput";
import { useToast } from "@/components/ui/use-toast";
import { useAction } from "@/hooks/useAction";
import { CardWithList } from "@/type";
import { useQueryClient } from "@tanstack/react-query";
import { Layout } from "lucide-react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { ElementRef, useRef } from "react";

interface CardHeaderProps {
  card: CardWithList;
}

const CardHeader = ({ card }: CardHeaderProps) => {
  const { toast } = useToast();
  const { boardId } = useParams();
  const queryClient = useQueryClient();
  const router = useRouter();
  const inputRef = useRef<ElementRef<"input">>(null);
  const formRef = useRef<ElementRef<"form">>(null);

  function onBlur() {
    if (card.title !== inputRef?.current?.value) {
      formRef?.current?.requestSubmit();
    }
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

  const { execute, isLoading } = useAction(updateCard, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["cards", card.id],
      });

      toast({
        title: `Card "${data.title} updated"`,
      });

      router.refresh();
    },
    onError: (e) => {
      toast({
        title: e,
      });
    },
  });

  return (
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
  );
};

export default CardHeader;
