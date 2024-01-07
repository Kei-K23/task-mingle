import { Card, List } from "@prisma/client";

export type ListWithCards = List & {
  cards: Card[];
};

export type CardWithList = Card & {
  list: List;
};

export enum ACTION {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
  COPY = "COPY",
  REORDER = "REORDER",
}

export enum ENTITY_TYPE {
  BOARD = "BOARD",
  LIST = "LIST",
  CARD = "CARD",
}
