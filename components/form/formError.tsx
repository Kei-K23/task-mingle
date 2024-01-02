import React from "react";

interface FormError {
  id: string;
  errors?: Record<string, string[] | undefined>;
}

const FormError = ({ id, errors }: FormError) => {
  if (!errors) {
    return null;
  }

  return (
    <div
      id={`${id}-error`}
      aria-live="polite"
      className="text-sm font-bold text-red-500"
    >
      {errors?.[id]?.map((error: string) => (
        <p className="text-red-500" key={error}>
          * {error}
        </p>
      ))}
    </div>
  );
};

export default FormError;
