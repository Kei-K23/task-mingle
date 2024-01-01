"use client";

import React from "react";
import TestInput from "./test-input";
import TestButton from "./test-button";
import { useAction } from "@/hooks/useAction";
import { createBoard } from "@/actions/createBoard/index";

const TestForm = () => {
  const { execute, data, fieldsErrors } = useAction(createBoard, {
    onSuccess(data) {
      console.log(data, "success");
    },
    onError(error) {
      console.log(error, "error");
    },
  });

  function onSubmit(formData: FormData) {
    const title = formData.get("title") as string;

    execute({ title });
  }

  return (
    <form action={onSubmit}>
      <TestInput errors={fieldsErrors} />
      <TestButton />
    </form>
  );
};

export default TestForm;
