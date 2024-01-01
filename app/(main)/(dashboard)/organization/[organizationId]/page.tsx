import { create } from "@/actions/createBoard";
import { deleteBoard } from "@/actions/deleteBoard";
import { db } from "@/lib/db";
import React from "react";
import TestForm from "./_components/test-form";
import TestDeleteBtn from "./_components/test-delete-btn";

const OrganizationIdPage = async ({
  params,
}: {
  params: { organizationId: string };
}) => {
  const boards = await db.board.findMany();

  return (
    <div>
      Organization Id page : {params.organizationId}
      <TestForm />
      {boards.map((board) => {
        const deleteWithId = deleteBoard.bind(null, board.id);
        return (
          <div key={board.id}>
            <form action={deleteWithId}>
              <p>{board.title}</p>
              <TestDeleteBtn />
            </form>
          </div>
        );
      })}
    </div>
  );
};

export default OrganizationIdPage;
