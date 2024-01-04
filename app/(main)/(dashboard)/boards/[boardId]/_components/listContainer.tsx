import { Card, List } from "@prisma/client";
import React from "react";
import ListForm from "./listForm";
import ListItem from "./listItem";

export type ListWithCards = List & {
  cards: Card[];
};

interface ListContainerProps {
  boardId: string;
  lists: ListWithCards[];
}

const ListContainer = ({ boardId, lists }: ListContainerProps) => {
  return (
    <ol className="flex items-center gap-x-3 ">
      <ListForm boardId={boardId} />
      {lists.map((list) => (
        <>
          <ListItem list={list} />
        </>
      ))}
    </ol>
  );
};

export default ListContainer;
