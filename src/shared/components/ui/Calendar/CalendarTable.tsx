import {
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarGridProps,
  CalendarHeaderCell,
} from "react-aria-components";
import { tv } from "tailwind-variants";

import { tw } from "~/shared/utils";

const calendarTable = tv({
  slots: {
    root: "w-full md:w-fit",
    dayOfWeek: "pb-1 text-xs font-semibold capitalize text-slate-400",
  },
});

const { root, dayOfWeek } = calendarTable();

export function CalendarTable(props: CalendarGridProps) {
  return (
    <CalendarGrid weekdayStyle='short' className={root()} {...props}>
      <CalendarGridHeader>
        {(day) => (
          <CalendarHeaderCell className={dayOfWeek()}>{day}</CalendarHeaderCell>
        )}
      </CalendarGridHeader>
      <CalendarGridBody>
        {(date) => (
          <CalendarCell
            // TODO: How to do this with tailwind variants?
            className={({ isDisabled, isUnavailable, isSelected }) =>
              tw(
                "mx-auto my-0.5 flex aspect-square w-8 items-center justify-center rounded-full text-sm font-semibold text-gray-600 sm:w-11",
                !isUnavailable &&
                  !isDisabled &&
                  !isSelected &&
                  "hover:bg-purple-50",
                isDisabled && "cursor-not-allowed bg-slate-500 text-slate-400",
                isUnavailable && "cursor-not-allowed bg-red-200 text-red-300",
                isSelected && "bg-purple-500 text-white",
              )
            }
            date={date}
          />
        )}
      </CalendarGridBody>
    </CalendarGrid>
  );
}
