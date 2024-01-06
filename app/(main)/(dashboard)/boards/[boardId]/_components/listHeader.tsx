"use client";

import { useToast } from "@/components/ui/use-toast";
import React, { ElementRef, useRef, useState } from "react";
import ListWrapper from "./listWrapper";
import FormInput from "@/components/form/formInput";
import { useEventListener } from "usehooks-ts";
import { useAction } from "@/hooks/useAction";
import { updateList } from "@/actions/updateList";
import ListOptions from "./listOptions";
import { ListWithCards } from "./listContainer";
import CreateCard from "./createCard";
import ActionTooltip from "@/components/actionTooltip";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import CardItem from "./cardItem";
import { Draggable, Droppable } from "@hello-pangea/dnd";

interface ListHeaderProps {
  list: ListWithCards;
}

const ListHeader = ({ list }: ListHeaderProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isCreatingCard, setIsCreatingCard] = useState(false);
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
          className="space-y-4 rounded-md w-full bg-white/90 text-black px-3 py-2"
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
    <>
      <div className="flex items-center justify-between">
        <ActionTooltip title="click to edit title">
          <div
            role="button"
            className="flex truncate items-center w-full flex-1 justify-start gap-x-1 h-10 px-4 py-2 cursor-pointer font-bold"
            onClick={enableEditing}
          >
            {list.title}
          </div>
        </ActionTooltip>
        <ListOptions
          list={list}
          setIsCreatingCard={setIsCreatingCard}
          isCreatingCard={isCreatingCard}
        />
      </div>
      {list.cards.length ? (
        <Separator className="w-[90%] mx-auto h-[1.4px]" />
      ) : null}
      <Droppable droppableId={list.id} type="card">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={cn(
              "flex flex-col gap-y-2 px-3 py-2",
              list.cards.length > 0 ? "my-2" : "my-0 px-0 py-0"
            )}
          >
            {list.cards.map((card, index) => (
              <CardItem key={card.id} card={card} index={index} />
            ))}
            {provided.placeholder}
          </ol>
        )}
      </Droppable>
      {list.cards.length ? (
        <Separator className="w-[90%] mx-auto h-[1.4px]" />
      ) : null}
      <div className="w-full">
        <CreateCard
          list={list}
          isCreatingCard={isCreatingCard}
          setIsCreatingCard={setIsCreatingCard}
        />
      </div>
    </>
  );
};

export default ListHeader;
