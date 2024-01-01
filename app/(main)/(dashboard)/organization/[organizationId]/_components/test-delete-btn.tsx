"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { useFormStatus } from "react-dom";

const TestDeleteBtn = () => {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} variant={"destructive"} type="submit">
      Delete
    </Button>
  );
};

export default TestDeleteBtn;
