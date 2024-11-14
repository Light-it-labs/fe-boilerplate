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
import { FieldValues } from "react-hook-form";
import { tv } from "tailwind-variants";

import { useFieldController } from "~/hooks";
import { WithHookForm, WithoutHookForm } from "~/shared";
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

interface DateFieldBaseProps<T extends DateValue>
  extends AriaDateFieldProps<T> {
  label?: string;
  description?: string;
  errorMessage?: string;
}

type DateFieldProps<
  T extends DateValue,
  U extends FieldValues,
> = DateFieldBaseProps<T> & (WithHookForm<U> | WithoutHookForm<T>);

export const DateField = <T extends DateValue, U extends FieldValues>({
  name,
  control,
  label,
  description,
  errorMessage,
  ...props
}: DateFieldProps<T, U>) => {
  const controller = useFieldController({ name, control });

  return (
    <AriaDateField
      onChange={(newDate: DateValue) => {
        controller?.field.onChange(
          newDate.toDate(currentTimezone).toISOString(),
        );
      }}
      onBlur={controller?.field.onBlur}
      ref={controller?.field.ref}
      {...props}
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
};
