import type {
  CalendarProps as AriaCalendarProps,
  DateValue,
} from "react-aria-components";
import { Calendar as AriaCalendar, Label, Text } from "react-aria-components";
import type { FieldValues } from "react-hook-form";
import { tv } from "tailwind-variants";

import { useFieldController } from "~/hooks";
import { WithHookForm, WithoutHookForm } from "~/shared";
import { currentTimezone, findFirstEnabledDate } from "~/utils";
import { CalendarHeader } from "./CalendarHeader";
import { CalendarTable } from "./CalendarTable";

const classNames = tv({
  slots: {
    container: "w-full rounded-lg border bg-white p-5 md:w-fit",
    error: "text-xs text-red-500",
    desc: "text-xs",
  },
})();
interface CalendarBaseProps<T extends DateValue> extends AriaCalendarProps<T> {
  errorMessage?: string;
  label?: string;
  description?: string;
}

type CalendarProps<
  T extends DateValue,
  U extends FieldValues,
> = CalendarBaseProps<T> & (WithHookForm<U> | WithoutHookForm<T>);

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
        {...props}
        aria-labelledby={label}
        className={classNames.container}
      >
        <CalendarHeader />
        <CalendarTable
          ref={(el) => {
            const firstEnabledDate = findFirstEnabledDate(el);
            if (firstEnabledDate) {
              return controller?.field.ref(firstEnabledDate);
            }
          }}
        />
      </AriaCalendar>
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
    </div>
  );
};
