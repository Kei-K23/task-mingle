"use client";
import React, { forwardRef } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import FormError from "./formError";

interface FormInputProps {
  id: string;
  label?: string;
  type?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  errors?: Record<string, string[] | undefined>;
  defaultValue?: string;
  onBlur?: () => void;
  required?: boolean;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      id,
      className,
      defaultValue,
      disabled,
      errors,
      label,
      onBlur,
      placeholder,
      required,
      type,
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
          <Input
            disabled={pending || disabled}
            onBlur={onBlur}
            required={required}
            type={type}
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

FormInput.displayName = "FormInput";

export default FormInput;
