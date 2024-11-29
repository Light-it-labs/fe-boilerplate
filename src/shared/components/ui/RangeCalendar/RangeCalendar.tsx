import type {
  RangeCalendarProps as AriaRangeCalendarProps,
  DateValue,
} from "react-aria-components";
import {
  RangeCalendar as AriaRangeCalendar,
  Label,
} from "react-aria-components";
import { FieldValues } from "react-hook-form";
import { tv } from "tailwind-variants";

import { useFieldController } from "~/hooks";
import { FieldMessage, WithHookForm, WithoutHookForm } from "~/shared";
import { currentTimezone, findFirstEnabledDate } from "~/utils";
import { CalendarHeader } from "../Calendar/CalendarHeader";
import { CalendarTable } from "../Calendar/CalendarTable";

const classNames = tv({
  slots: {
    container: "w-full rounded-lg border bg-white p-5 md:w-fit",
    calendars: "flex flex-col space-y-6 md:flex-row md:space-x-6 md:space-y-0",
  },
})();

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
        className={classNames.container}
      >
        <CalendarHeader />
        <div className={classNames.calendars()}>
          <CalendarTable
            ref={(el) => {
              const firstEnabledDate = findFirstEnabledDate(el);
              if (firstEnabledDate) {
                return controller?.field.ref(firstEnabledDate);
              }
            }}
          />
          <CalendarTable offset={{ months: 1 }} />
        </div>
      </AriaRangeCalendar>
      <FieldMessage description={description} error={errorMessage} />
    </div>
  );
};
