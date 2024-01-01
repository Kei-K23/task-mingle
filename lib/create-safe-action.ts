import { z } from "zod";

// form fields error like zod validation error
export type FieldsErrors<T> = {
  [K in keyof T]?: string[];
};

// action state for createSafeAction
export type ActionState<TInput, TOutput> = {
  fieldsErrors?: FieldsErrors<TInput>;
  error?: string | null;
  data?: TOutput;
};

export function createSafeAction<TInput, TOutput>(
  schema: z.Schema<TInput>,
  handler: (validatedData: TInput) => Promise<ActionState<TInput, TOutput>>
) {
  return async (data: TInput): Promise<ActionState<TInput, TOutput>> => {
    const validateResult = schema.safeParse(data);

    if (!validateResult.success) {
      return {
        fieldsErrors: validateResult.error.flatten()
          .fieldErrors as FieldsErrors<TInput>,
      };
    }

    return handler(validateResult.data);
  };
}
