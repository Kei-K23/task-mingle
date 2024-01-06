"use client";
import { Card, List } from "@prisma/client";
import React, { useState } from "react";
import ListForm from "./listForm";
import ListItem from "./listItem";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { useToast } from "@/components/ui/use-toast";
import { useAction } from "@/hooks/useAction";
import { updateListOrder } from "@/actions/updateListOrder";
import { updateCardOrder } from "@/actions/updateCardOrder ";

export type ListWithCards = List & {
  cards: Card[];
};

interface ListContainerProps {
  boardId: string;
  lists: ListWithCards[];
}

function reOrder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

const ListContainer = ({ boardId, lists: dataLists }: ListContainerProps) => {
  const [lists, setLists] = useState(dataLists);

  const { toast } = useToast();
  const { execute: executeForReOrderLists } = useAction(updateListOrder, {
    onSuccess: (_data) => {
      console.log(_data);

      toast({
        title: `Reorder lists`,
      });
    },
    onError: (e) => {
      toast({
        title: e,
      });
    },
  });

  const { execute: executeForReOrderCards } = useAction(updateCardOrder, {
    onSuccess: (_data) => {
      console.log(_data);

      toast({
        title: `Reorder cards`,
      });
    },
    onError: (e) => {
      toast({
        title: e,
      });
    },
  });

  function onDragEnd(result: any) {
    const { destination, type, source } = result;

    if (!destination) return;

    // same position and same place then return
    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    ) {
      return;
    }
    // user dnd a list
    if (type === "list") {
      const items = reOrder(lists, source.index, destination.index).map(
        (item, index) => ({ ...item, order: index })
      );
      setLists(items);

      executeForReOrderLists({
        boardId,
        lists: items,
      });
    }

    if (type === "card") {
      const newListsData = [...lists];

      const destList = newListsData.find(
        (card) => card.id === destination.droppableId
      );
      const sourceList = newListsData.find(
        (card) => card.id === source.droppableId
      );

      if (!destList || !sourceList) {
        return;
      }

      if (!destList.cards) {
        destList.cards = [];
      }

      if (!sourceList.cards) {
        sourceList.cards = [];
      }
      // dnd the card in the same list
      if (source.droppableId === destination.droppableId) {
        const reOrderCards = reOrder(
          sourceList.cards,
          source.index,
          destination.index
        );

        // update the index order for new reorder cards
        reOrderCards.forEach((card, index) => (card.order = index));

        sourceList.cards = reOrderCards;

        setLists(newListsData);
        executeForReOrderCards({
          boardId,
          cards: reOrderCards,
        });
      } else {
        // dnd the card to another list
        const [movedCard] = sourceList.cards.splice(source.index, 1); // remove the card from the source list

        // assign the destination list id to moved card
        movedCard.listId = destination.droppableId;

        // add moved card to destination list
        destList.cards.splice(destination.index, 0, movedCard);

        // update the index order for source list
        sourceList.cards.forEach((card, index) => {
          card.order = index;
        });
        // update the index order for destination list
        destList.cards.forEach((card, index) => {
          card.order = index;
        });

        setLists(newListsData);
        executeForReOrderCards({
          boardId,
          cards: destList.cards,
        });
      }
    }
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" direction="horizontal" type="list">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex items-start gap-x-3 "
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
