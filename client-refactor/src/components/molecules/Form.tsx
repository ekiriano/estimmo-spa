/** @jsxImportSource @emotion/react */
import { yupResolver } from "@hookform/resolvers/yup";

import { ComponentProps } from "react";
import {
  useForm as useHookForm,
  UseFormProps as UseHookFormProps,
  FormProvider,
  UseFormReturn,
  FieldValues,
  SubmitHandler,
  useFormContext,
  FieldError as FieldHookError,
} from "react-hook-form";

import { TypeOf, AnyObjectSchema } from "yup";

interface UseFormProps<T extends AnyObjectSchema>
  extends UseHookFormProps<TypeOf<T>> {
  schema: T;
}

export const useForm = <T extends AnyObjectSchema>({
  schema,
  ...formConfig
}: UseFormProps<T>) => {
  return useHookForm({
    ...formConfig,
    resolver: yupResolver(schema),
  });
};

interface FormProps<
  TFormValues extends Record<string, unknown> = Record<string, unknown>
> extends Omit<ComponentProps<"form">, "onSubmit"> {
  form: UseFormReturn<TFormValues>;
  onSubmit: SubmitHandler<TFormValues>;
}

export const Form = <T extends FieldValues>({
  form,
  onSubmit,
  children,
  ...props
}: FormProps<T>) => {
  return (
    <FormProvider {...form}>
      {
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        <form onSubmit={form.handleSubmit(onSubmit)} {...props}>
          <fieldset
            css={{ width: "100%" }}
            disabled={form.formState.isSubmitting}
          >
            {children}
          </fieldset>
        </form>
      }
    </FormProvider>
  );
};

export function FieldError({ name }: { name?: string }) {
  const {
    formState: { errors },
  } = useFormContext();

  if (!name) return null;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const error: FieldHookError = errors[name] ? errors[name] : null;

  return <p css={{ color: "red", fontSize: "smaller" }}>{error?.message}</p>;
}