import { ActionState, FieldsErrors } from "@/lib/create-safe-action";
import { useCallback, useState } from "react";

type Action<TInput, TOutput> = (
  data: TInput
) => Promise<ActionState<TInput, TOutput>>;

type UseActionOptions<TOutput> = {
  onSuccess?: (data: TOutput) => void;
  onError?: (error: string) => void;
  onComplete?: () => void;
};

export const useAction = <TInput, TOutput>(
  action: Action<TInput, TOutput>,
  options: UseActionOptions<TOutput> = {}
) => {
  const [fieldsErrors, setFieldsErrors] = useState<
    FieldsErrors<TInput> | undefined
  >(undefined);

  const [error, setError] = useState<string | undefined>(undefined);

  const [data, setData] = useState<TOutput | undefined>(undefined);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const execute = useCallback(
    async (input: TInput) => {
      setIsLoading(true);
      try {
        const result = await action(input);

        if (!result) {
          return;
        }

        if (result.fieldsErrors) {
          setFieldsErrors(result.fieldsErrors);
        }

        if (!result.fieldsErrors) {
          setFieldsErrors(undefined);
        }

        if (result.error) {
          setError(result.error);
          options.onError?.(result.error);
        }

        if (result.data) {
          setData(result.data);
          options.onSuccess?.(result?.data);
        }
      } finally {
        setIsLoading(false);
        options.onComplete?.();
      }
    },
    [action, options]
  );

  return {
    execute,
    fieldsErrors,
    error,
    data,
    isLoading,
  };
};
