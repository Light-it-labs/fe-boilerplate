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
} from "react-aria-components";
import type { FieldValues } from "react-hook-form";
import { tv } from "tailwind-variants";

import { useFieldController } from "~/hooks";
import { FieldMessage, WithHookForm, WithoutHookForm } from "~/shared";
import { currentTimezone, isFirstChild } from "~/utils";
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
  },
})();

interface DatePickerBaseProps<T extends DateValue>
  extends Omit<AriaDatePickerProps<T>, "className"> {
  label?: string;
  description?: string;
  errorMessage?: string;
  triggerIcon?: React.ReactNode;
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
  triggerIcon = "▼",
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
            <DateSegment
              ref={(el) => isFirstChild(el) && controller?.field.ref(el)}
              className={classNames.dateSegment}
              segment={segment}
            />
          )}
        </DateInput>
        <Button className={classNames.trigger}>{triggerIcon}</Button>
      </Group>

      <FieldMessage description={description} error={errorMessage} />

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
