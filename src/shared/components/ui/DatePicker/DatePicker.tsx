import type {
  DatePickerProps as AriaDatePickerProps,
  DateValue,
} from "react-aria-components";
import {
  DatePicker as AriaDatePicker,
  Button,
  Calendar,
  DateInput,
  DateSegment,
  Dialog,
  Group,
  Label,
  Popover,
  Text,
} from "react-aria-components";
import type { FieldValues } from "react-hook-form";
import { tv } from "tailwind-variants";

import { useFieldController } from "~/hooks";
import { WithHookForm, WithoutHookForm } from "~/shared";
import { currentTimezone } from "~/utils";
import { CalendarHeader } from "../Calendar/CalendarHeader";
import { CalendarTable } from "../Calendar/CalendarTable";

const classNames = tv({
  slots: {
    dateGroup: "flex w-full rounded-lg border md:w-fit",
    dateInput: "flex flex-1 items-center space-x-1 p-2",
    dateSegment: "font-medium text-gray-800",
    trigger: "border-l px-4 py-2",
    popover:
      "w-[var(--trigger-width)] overflow-auto rounded-lg border bg-white p-4 md:w-fit",
    error: "text-xs text-red-500",
    desc: "text-xs",
  },
})();

interface DatePickerBaseProps<T extends DateValue>
  extends AriaDatePickerProps<T> {
  label?: string;
  description?: string;
  errorMessage?: string;
}

type DatePickerProps<
  T extends DateValue,
  U extends FieldValues,
> = DatePickerBaseProps<T> & (WithHookForm<U> | WithoutHookForm<T>);

export const DatePicker = <T extends DateValue, U extends FieldValues>({
  label,
  description,
  errorMessage,
  name,
  control,
  slot,
  ...props
}: DatePickerProps<T, U>) => {
  const controller = useFieldController({ name, control });

  return (
    <AriaDatePicker
      onChange={(newDate) => {
        controller?.field.onChange(
          newDate.toDate(currentTimezone).toISOString(),
        );
      }}
      onBlur={controller?.field.onBlur}
      {...props}
    >
      <Label>{label}</Label>
      <Group className={classNames.dateGroup}>
        <DateInput className={classNames.dateInput} slot={slot}>
          {(segment) => (
            <DateSegment className={classNames.dateSegment} segment={segment} />
          )}
        </DateInput>
        <Button ref={controller?.field.ref} className={classNames.trigger}>
          🗓️
        </Button>
      </Group>
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
      <Popover className={classNames.popover}>
        <Dialog>
          <Calendar>
            <CalendarHeader />
            <CalendarTable />
          </Calendar>
        </Dialog>
      </Popover>
    </AriaDatePicker>
  );
};
