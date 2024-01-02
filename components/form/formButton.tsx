"use client";

import React from "react";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";

interface FormButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
}

const FormButton = ({
  children,
  className,
  disabled,
  variant,
}: FormButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <Button
      variant={variant}
      disabled={pending || disabled}
      className={cn(className)}
      size={"sm"}
      type="submit"
    >
      {children}
    </Button>
  );
};

export default FormButton;
