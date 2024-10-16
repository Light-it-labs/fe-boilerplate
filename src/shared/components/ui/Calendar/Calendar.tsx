import type {
  CalendarProps as AriaCalendarProps,
  DateValue,
} from "react-aria-components";
import { Calendar as AriaCalendar, Label, Text } from "react-aria-components";
import type { Control, FieldValues, Path } from "react-hook-form";
import { tv } from "tailwind-variants";

import { useFieldController } from "~/hooks";
import { currentTimezone } from "~/utils";
import { CalendarHeader } from "./CalendarHeader";
import { CalendarTable } from "./CalendarTable";

const calendar = tv({
  slots: {
    container: "w-full rounded-lg border bg-white p-5 md:w-fit",
    error: "text-xs text-red-500",
    desc: "text-xs",
  },
});

const { container, error, desc } = calendar();

interface CalendarProps<T extends DateValue, U extends FieldValues>
  extends AriaCalendarProps<T> {
  name?: Path<U>;
  control?: Control<U>;
  errorMessage?: string;
  label?: string;
  description?: string;
}

export const Calendar = <T extends DateValue, U extends FieldValues>({
  errorMessage,
  control,
  name,
  label,
  description,
  ...props
}: CalendarProps<T, U>) => {
  const controller = useFieldController({ name, control });

  return (
    <div>
      {label && <Label id={label}>{label}</Label>}
      <AriaCalendar
        onChange={(newDate) => {
          controller?.field.onChange(
            newDate.toDate(currentTimezone).toISOString(),
          );
        }}
        onFocusChange={controller?.field.onBlur}
        // TODO: ref={field.ref} Need to pass this down to CalendarTable to focus on error
        {...props}
        aria-labelledby={label}
        className={container()}
      >
        <CalendarHeader />
        <CalendarTable />
      </AriaCalendar>
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
