import { Card } from "@prisma/client";
import React from "react";
interface CardItemProps {
  index: number;
  card: Card;
}

const CardItem = ({ index, card }: CardItemProps) => {
  return (
    <div
      role="button"
      key={card.id}
      className="truncate rounded-md bg-white py-2 px-3 border-2 hover:border-slate-500"
    >
      {card.title}
    </div>
  );
};

export default CardItem;
