import { HTMLInputAutoCompleteAttribute } from 'react';
import { FieldError, UseFormReturn } from 'react-hook-form';
import { ClassValue } from 'clsx';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

import { cn } from '@/lib/utils';

type TextAreaFormFieldProps = {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  form: UseFormReturn<any, any, any>;
  fieldName: string;
  fieldId: string;
  label: string;
  maxLength?: number;
  fieldHasErrors?: FieldError | undefined;
  placeholder?: string;
  fieldClassName?: ClassValue;
  fieldDescription?: React.ReactNode;
};

type ShowFormMessageProps = {
  fieldDescription: React.ReactNode;
  fieldHasErrors: FieldError | undefined;
};

const ShowFormMessage = ({
  fieldDescription,
  fieldHasErrors,
}: ShowFormMessageProps) => {
  if (!fieldDescription) return <FormMessage />;

  if (fieldDescription && fieldHasErrors) return <FormMessage />;

  return (
    <FormDescription
      className={cn({
        hidden: fieldDescription === undefined,
      })}
    >
      {fieldDescription}
    </FormDescription>
  );
};

const TextAreaFormField = ({
  form,
  fieldName,
  fieldId,
  label,
  fieldClassName,
  maxLength,
  fieldDescription,
  fieldHasErrors,
  placeholder = 'Placeholder',
}: TextAreaFormFieldProps) => {
  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className="flex flex-col w-full">
          <FormLabel htmlFor={fieldId} className="text-white text-xl">
            {label}
          </FormLabel>
          <FormControl>
            <Textarea
              id={fieldId}
              className={cn(
                'outline-none text-white/90 border border-input bg-transparent rounded h-9 px-3 placeholder-white/80 placeholder:text-sm',
                fieldClassName,
              )}
              placeholder={placeholder}
              maxLength={maxLength}
              autoComplete="off"
              {...field}
            />
          </FormControl>

          <ShowFormMessage
            fieldDescription={fieldDescription}
            fieldHasErrors={fieldHasErrors}
          />
        </FormItem>
      )}
    />
  );
};

export default TextAreaFormField;
