"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { useFormStatus } from "react-dom";

const TestButton = () => {
  const { pending } = useFormStatus();
  return (
    <div>
      <Button disabled={pending} type="submit">
        Send
      </Button>
    </div>
  );
};

export default TestButton;
