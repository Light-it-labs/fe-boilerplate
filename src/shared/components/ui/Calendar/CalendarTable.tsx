import { forwardRef } from "react";
import {
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarGridProps,
  CalendarHeaderCell,
} from "react-aria-components";
import { tv } from "tailwind-variants";

import { CalendarDate } from "./CalendarDate";

const classNames = tv({
  slots: {
    root: "w-full md:w-fit",
    dayOfWeek: "pb-1 text-xs font-semibold capitalize text-slate-400",
  },
})();

export const CalendarTable = forwardRef<HTMLTableElement, CalendarGridProps>(
  (props, ref) => {
    return (
      <CalendarGrid
        ref={ref}
        weekdayStyle='short'
        className={classNames.root()}
        {...props}
      >
        <CalendarGridHeader>
          {(day) => (
            <CalendarHeaderCell className={classNames.dayOfWeek()}>
              {day}
            </CalendarHeaderCell>
          )}
        </CalendarGridHeader>

        <CalendarGridBody>
          {(date) => <CalendarDate date={date} />}
        </CalendarGridBody>
      </CalendarGrid>
    );
  },
);
