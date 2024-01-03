import { Card, List } from "@prisma/client";
import React from "react";
import ListForm from "./listForm";

export type ListWithCards = List & {
  cards: Card[];
};

interface ListContainerProps {
  boardId: string;
  lists: ListWithCards[];
}

const ListContainer = ({ boardId, lists }: ListContainerProps) => {
  return (
    <ol>
      <ListForm boardId={boardId} />
      <div className="w-1 flex-shrink-0"></div>
    </ol>
  );
};

export default ListContainer;
