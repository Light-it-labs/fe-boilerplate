import type {
  RangeCalendarProps as AriaRangeCalendarProps,
  DateValue,
} from "react-aria-components";
import {
  RangeCalendar as AriaRangeCalendar,
  Label,
  Text,
} from "react-aria-components";
import { Control, FieldValues, Path, useController } from "react-hook-form";
import { tv } from "tailwind-variants";

import { currentTimezone } from "~/utils";
import { CalendarHeader } from "../Calendar/CalendarHeader";
import { CalendarTable } from "../Calendar/CalendarTable";

const rangecalendar = tv({
  slots: {
    container: "w-full rounded-lg border bg-white p-5 md:w-fit",
    error: "text-xs text-red-500",
    desc: "text-xs",
  },
});

const { container, error, desc } = rangecalendar();

interface RangeCalendarProps<T extends DateValue, U extends FieldValues>
  extends AriaRangeCalendarProps<T> {
  name: Path<U>;
  control: Control<U>;
  errorMessage?: string;
  label?: string;
  description?: string;
}

export function RangeCalendar<T extends DateValue, U extends FieldValues>({
  errorMessage,
  description,
  label,
  name,
  control,
  ...props
}: RangeCalendarProps<T, U>) {
  const { field } = useController({ name, control });
  return (
    <div>
      {label && <Label id={label}>{label}</Label>}
      <AriaRangeCalendar
        {...props}
        visibleDuration={{ months: 2 }}
        aria-labelledby={label}
        onChange={(newDate) => {
          field.onChange([
            newDate?.start.toDate(currentTimezone).toISOString(),
            newDate?.end.toDate(currentTimezone).toISOString(),
          ]);
        }}
        onFocusChange={field.onBlur}
        className={container()}
      >
        <CalendarHeader />
        <div className='flex items-center space-x-6'>
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
}
