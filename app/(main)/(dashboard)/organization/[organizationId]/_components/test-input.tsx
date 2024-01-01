"use client";

import { Input } from "@/components/ui/input";
import React from "react";
import { useFormStatus } from "react-dom";

const TestInput = ({ errors }: { errors?: { title?: string[] } }) => {
  const { pending } = useFormStatus();

  return (
    <>
      <Input
        type="text"
        name="title"
        placeholder="enter your title name"
        disabled={pending}
      />
      {errors?.title ? (
        <div>
          {errors.title.map((error: string) => {
            return <p key={error}>{error}</p>;
          })}
        </div>
      ) : null}
    </>
  );
};

export default TestInput;
