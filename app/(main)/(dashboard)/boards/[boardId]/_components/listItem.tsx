import React from "react";
import type { ListWithCards } from "./listContainer";
import ListWrapper from "./listWrapper";
import ListHeader from "./listHeader";

interface ListItemProps {
  list: ListWithCards;
}

const ListItem = ({ list }: ListItemProps) => {
  return (
    <ListWrapper>
      <ListHeader list={list} />
    </ListWrapper>
  );
};

export default ListItem;
