import { Board } from "@prisma/client";
import React from "react";
import BoardTitleForm from "./boardTitleForm";
import BoardOptions from "./boardOptions";

interface BoardNavbarProps {
  board: Board;
}

const BoardNavbar = ({ board }: BoardNavbarProps) => {
  return (
    <div className="bg-black/40 inset-0 fixed top-16 h-14 w-full py-3 md:py-4 px-4 md:px-8 text-white font-bold flex items-center z-[40] justify-between">
      <BoardTitleForm board={board} />
      <BoardOptions id={board.id} />
    </div>
  );
};

export default BoardNavbar;
