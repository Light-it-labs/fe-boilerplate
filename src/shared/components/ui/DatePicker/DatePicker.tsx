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
import type { Control, FieldValues, Path } from "react-hook-form";
import { tv } from "tailwind-variants";

import { useFieldController } from "~/hooks";
import { currentTimezone } from "~/utils";
import { CalendarHeader } from "../Calendar/CalendarHeader";
import { CalendarTable } from "../Calendar/CalendarTable";

const datepicker = tv({
  slots: {
    dateGroup: "flex w-full rounded-lg border md:w-fit",
    dateInput: "flex flex-1 items-center space-x-1 p-2",
    dateSegment: "font-medium text-gray-800",
    trigger: "border-l px-4 py-2",
    popover: "w-[var(--trigger-width)] rounded-lg border bg-white p-4 md:w-fit",
    error: "text-xs text-red-500",
    desc: "text-xs",
  },
});

const { dateGroup, dateInput, dateSegment, trigger, popover, error, desc } =
  datepicker();

interface DatePickerProps<T extends DateValue, U extends FieldValues>
  extends AriaDatePickerProps<T> {
  name?: Path<U>;
  control?: Control<U>;
  label?: string;
  description?: string;
  errorMessage?: string;
}

export const DatePicker = <T extends DateValue, U extends FieldValues>({
  label,
  description,
  errorMessage,
  name,
  control,
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
      <Group className={dateGroup()}>
        <DateInput className={dateInput()}>
          {(segment) => (
            <DateSegment className={dateSegment()} segment={segment} />
          )}
        </DateInput>
        <Button ref={controller?.field.ref} className={trigger()}>
          🗓️
        </Button>
      </Group>
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
      <Popover className={popover()}>
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
