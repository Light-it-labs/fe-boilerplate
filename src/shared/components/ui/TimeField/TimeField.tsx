import type {
  TimeFieldProps as AriaTimeFieldProps,
  TimeValue,
} from "react-aria-components";
import {
  TimeField as AriaTimeField,
  DateInput,
  DateSegment,
  Label,
  Text,
} from "react-aria-components";
import { FieldValues } from "react-hook-form";
import { tv } from "tailwind-variants";

import {
  isFirstChild,
  useFieldController,
  WithHookForm,
  WithoutHookForm,
} from "~/shared";

const classNames = tv({
  slots: {
    dateInput:
      "flex w-full items-center space-x-1 rounded-lg border p-2 md:w-fit",
    dateSegment: "font-medium text-gray-800",
    error: "text-xs text-red-500",
    desc: "text-xs",
  },
})();

interface TimeFieldBaseProps<T extends TimeValue>
  extends AriaTimeFieldProps<T> {
  label?: string;
  description?: string;
  errorMessage?: string;
}

type TimeFieldProps<
  T extends TimeValue,
  U extends FieldValues,
> = TimeFieldBaseProps<T> & (WithHookForm<U> | WithoutHookForm<T>);

export const TimeField = <T extends TimeValue, U extends FieldValues>({
  name,
  control,
  label,
  description,
  errorMessage,
  ...props
}: TimeFieldProps<T, U>) => {
  const controller = useFieldController({ name, control });

  return (
    <AriaTimeField
      onChange={(newTime) => {
        controller?.field.onChange(newTime.toString());
      }}
      onBlur={controller?.field.onBlur}
      {...props}
    >
      <Label>{label}</Label>
      <DateInput className={classNames.dateInput}>
        {(segment) => (
          <DateSegment
            ref={(el) => isFirstChild(el) && controller?.field.ref(el)}
            className={classNames.dateSegment}
            segment={segment}
          />
        )}
      </DateInput>
      {errorMessage && (
        <Text className={classNames.error()} slot='errorMessage'>
          {errorMessage}
        </Text>
      )}
      {description && !errorMessage && (
        <Text className={classNames.desc()} slot='description'>
          {description}
        </Text>
      )}
    </AriaTimeField>
  );
};
