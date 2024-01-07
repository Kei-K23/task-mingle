"use client";
import { useModal } from "@/hooks/useModal";
import { Draggable } from "@hello-pangea/dnd";
import { Card } from "@prisma/client";
import React from "react";
interface CardItemProps {
  index: number;
  card: Card;
}

const CardItem = ({ index, card }: CardItemProps) => {
  const { onOpen } = useModal();
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          role="button"
          key={card.id}
          className="truncate rounded-md bg-white py-2 px-3 border-2 hover:border-slate-500"
          onClick={() => onOpen(card.id)}
        >
          {card.title}
        </div>
      )}
    </Draggable>
  );
};

export default CardItem;
