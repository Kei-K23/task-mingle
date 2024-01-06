"use client";
import { Card, List } from "@prisma/client";
import React from "react";
import ListForm from "./listForm";
import ListItem from "./listItem";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";

export type ListWithCards = List & {
  cards: Card[];
};

interface ListContainerProps {
  boardId: string;
  lists: ListWithCards[];
}

const ListContainer = ({ boardId, lists }: ListContainerProps) => {
  return (
    <DragDropContext onDragEnd={() => {}}>
      <Droppable droppableId="lists" direction="horizontal" type="list">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex items-start gap-x-3"
          >
            <ListForm boardId={boardId} />
            {lists.map((list, index) => (
              <>
                <ListItem key={list.id} list={list} index={index} />
              </>
            ))}
            {provided.placeholder}
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ListContainer;
