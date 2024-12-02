import type {
  DateRangePickerProps as AriaDateRangePickerProps,
  DateValue,
} from "react-aria-components";
import {
  DateRangePicker as AriaDateRangePicker,
  Button,
  DateInput,
  DateSegment,
  Dialog,
  Group,
  Label,
  Popover,
  RangeCalendar,
} from "react-aria-components";
import { FieldValues } from "react-hook-form";
import { tv } from "tailwind-variants";

import {
  currentTimezone,
  FieldMessage,
  isFirstChild,
  useFieldController,
  WithHookForm,
  WithoutHookForm,
} from "~/shared";
import { CalendarHeader } from "../Calendar/CalendarHeader";
import { CalendarTable } from "../Calendar/CalendarTable";

const classNames = tv({
  slots: {
    container: "w-full rounded-lg border bg-white p-5 md:w-fit",
    calendars: "flex flex-col space-y-6 md:flex-row md:space-x-6 md:space-y-0",
    dateGroup: "flex items-center gap-4",
    dateInput:
      "flex w-full items-center space-x-1 rounded-lg border p-2 md:w-fit",
    dateSegment: "font-medium text-gray-800",
  },
})();

interface DateRangePickerBaseProps<T extends DateValue>
  extends Omit<AriaDateRangePickerProps<T>, "className"> {
  label?: string;
  description?: string;
  errorMessage?: string;
  triggerIcon?: React.ReactNode;
}

type DateRangePickerProps<
  T extends DateValue,
  U extends FieldValues,
> = DateRangePickerBaseProps<T> & (WithHookForm<U> | WithoutHookForm<T>);

export const DateRangePicker = <T extends DateValue, U extends FieldValues>({
  label,
  description,
  errorMessage,
  control,
  name,
  triggerIcon = "▼",
  ...props
}: DateRangePickerProps<T, U>) => {
  const controller = useFieldController({ name, control });

  return (
    <AriaDateRangePicker
      onChange={(newDate) => {
        controller?.field.onChange([
          newDate?.start.toDate(currentTimezone).toISOString(),
          newDate?.end.toDate(currentTimezone).toISOString(),
        ]);
      }}
      onFocusChange={controller?.field.onBlur}
      aria-labelledby={label}
      {...props}
    >
      <Label>{label}</Label>
      <Group className={classNames.dateGroup}>
        <DateInput slot='start' className={classNames.dateInput}>
          {(segment) => (
            <DateSegment
              ref={(el) => isFirstChild(el) && controller?.field.ref(el)}
              className={classNames.dateSegment}
              segment={segment}
            />
          )}
        </DateInput>
        <span aria-hidden='true'>–</span>
        <DateInput slot='end' className={classNames.dateInput}>
          {(segment) => (
            <DateSegment segment={segment} className={classNames.dateSegment} />
          )}
        </DateInput>
        <Button>{triggerIcon}</Button>
      </Group>

      <FieldMessage description={description} error={errorMessage} />

      <Popover>
        <Dialog>
          <RangeCalendar
            visibleDuration={{ months: 2 }}
            className={classNames.container}
          >
            <CalendarHeader />
            <div className={classNames.calendars()}>
              <CalendarTable />
              <CalendarTable offset={{ months: 1 }} />
            </div>
          </RangeCalendar>
        </Dialog>
      </Popover>
    </AriaDateRangePicker>
  );
};
