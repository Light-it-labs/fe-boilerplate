import type {
  RangeCalendarProps as AriaRangeCalendarProps,
  DateValue,
} from "react-aria-components";
import {
  RangeCalendar as AriaRangeCalendar,
  Label,
  Text,
} from "react-aria-components";
import { FieldValues } from "react-hook-form";
import { tv } from "tailwind-variants";

import { useFieldController } from "~/hooks";
import { WithHookForm, WithoutHookForm } from "~/shared";
import { currentTimezone } from "~/utils";
import { CalendarHeader } from "../Calendar/CalendarHeader";
import { CalendarTable } from "../Calendar/CalendarTable";

const rangecalendar = tv({
  slots: {
    container: "w-full rounded-lg border bg-white p-5 md:w-fit",
    calendars: "flex flex-col space-y-6 md:flex-row md:space-x-6 md:space-y-0",
    error: "text-xs text-red-500",
    desc: "text-xs",
  },
});

const { calendars, container, error, desc } = rangecalendar();

interface RangeCalendarBaseProps<T extends DateValue>
  extends AriaRangeCalendarProps<T> {
  errorMessage?: string;
  label?: string;
  description?: string;
}

type RangeCalendarProps<
  T extends DateValue,
  U extends FieldValues,
> = RangeCalendarBaseProps<T> & (WithHookForm<U> | WithoutHookForm<T>);

export const RangeCalendar = <T extends DateValue, U extends FieldValues>({
  errorMessage,
  description,
  label,
  name,
  control,
  ...props
}: RangeCalendarProps<T, U>) => {
  const controller = useFieldController({ name, control });

  return (
    <div>
      {label && <Label id={label}>{label}</Label>}
      <AriaRangeCalendar
        onChange={(newDate) => {
          controller?.field.onChange([
            newDate?.start.toDate(currentTimezone).toISOString(),
            newDate?.end.toDate(currentTimezone).toISOString(),
          ]);
        }}
        onFocusChange={controller?.field.onBlur}
        {...props}
        visibleDuration={{ months: 2 }}
        aria-labelledby={label}
        className={container()}
      >
        <CalendarHeader />
        <div className={calendars()}>
          <CalendarTable />
          <CalendarTable offset={{ months: 1 }} />
        </div>
      </AriaRangeCalendar>
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
    </div>
  );
};
