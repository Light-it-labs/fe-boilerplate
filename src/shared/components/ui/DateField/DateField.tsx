import type {
  DateFieldProps as AriaDateFieldProps,
  DateValue,
} from "react-aria-components";
import {
  DateField as AriaDateField,
  DateInput,
  DateSegment,
  Label,
  Text,
} from "react-aria-components";
import { Control, FieldValues, Path, useController } from "react-hook-form";
import { tv } from "tailwind-variants";

import { currentTimezone } from "~/utils";

const datefield = tv({
  slots: {
    dateInput:
      "flex w-full items-center space-x-1 rounded-lg border p-2 md:w-fit",
    dateSegment: "font-medium text-gray-800",
    error: "text-xs text-red-500",
    desc: "text-xs",
  },
});

const { dateInput, dateSegment, error, desc } = datefield();

interface DateFieldProps<T extends DateValue, U extends FieldValues>
  extends AriaDateFieldProps<T> {
  name: Path<U>;
  control: Control<U>;
  label?: string;
  description?: string;
  errorMessage?: string;
}

export function DateField<T extends DateValue, U extends FieldValues>({
  name,
  control,
  label,
  description,
  errorMessage,
  ...props
}: DateFieldProps<T, U>) {
  const { field } = useController({ name, control });
  return (
    <AriaDateField
      {...props}
      onChange={(newDate) => {
        field.onChange(newDate.toDate(currentTimezone).toISOString());
      }}
      onBlur={field.onBlur}
      ref={field.ref}
    >
      <Label>{label}</Label>
      <DateInput className={dateInput()}>
        {(segment) => (
          <DateSegment className={dateSegment()} segment={segment} />
        )}
      </DateInput>
      {errorMessage && (
        <Text className={error()} slot='errorMessage'>
          {errorMessage}
        </Text>
      )}
      {description && !errorMessage && (
        <Text className={desc()} slot='description'>
          {description}
        </Text>
      )}
    </AriaDateField>
  );
}
