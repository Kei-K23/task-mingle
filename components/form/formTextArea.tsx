"use client";
import React, { KeyboardEventHandler, forwardRef } from "react";
import { Label } from "../ui/label";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import FormError from "./formError";
import { Textarea } from "../ui/textarea";

interface FormTextAreaProps {
  id: string;
  errors?: Record<string, string[] | undefined>;
  label?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  defaultValue?: string;
  onBlur?: () => void;
  onTextAreaKeyDown?: KeyboardEventHandler<HTMLTextAreaElement>;
  required?: boolean;
}

const FormTextArea = forwardRef<HTMLTextAreaElement, FormTextAreaProps>(
  (
    {
      id,
      className,
      defaultValue,
      disabled,
      errors,
      label,
      onBlur,
      onTextAreaKeyDown,
      placeholder,
      required,
    },
    ref
  ) => {
    const { pending } = useFormStatus();
    return (
      <div className="space-y-2">
        <div className="space-y-1">
          {label && (
            <Label
              htmlFor={id}
              className="text-sm text-muted-foreground font-semibold"
            >
              {label}
            </Label>
          )}
          <Textarea
            onKeyDown={onTextAreaKeyDown}
            disabled={pending || disabled}
            onBlur={onBlur}
            required={required}
            className={cn("text-sm px-2 py-1 h-8", className)}
            name={id}
            id={id}
            defaultValue={defaultValue}
            placeholder={placeholder}
            ref={ref}
            aria-describedby={`${id}-error`}
          />
        </div>
        <FormError id={id} errors={errors} />
      </div>
    );
  }
);

FormTextArea.displayName = "FormTextArea";

export default FormTextArea;
