"use client";
import React from "react";
import type { ListWithCards } from "./listContainer";
import ListWrapper from "./listWrapper";
import ListHeader from "./listHeader";
import { Draggable, Droppable } from "@hello-pangea/dnd";

interface ListItemProps {
  list: ListWithCards;
  index: number;
}

const ListItem = ({ list, index }: ListItemProps) => {
  return (
    <Draggable draggableId={list.id} index={index}>
      {(provided) => (
        <li
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="shrink-0 h-full select-none w-[250px]"
        >
          <div
            {...provided.dragHandleProps}
            className="bg-secondary text-secondary-foreground  transition rounded-md"
          >
            <ListHeader list={list} />
          </div>
        </li>
      )}
    </Draggable>
  );
};

export default ListItem;
