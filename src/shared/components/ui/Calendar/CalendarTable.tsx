import { forwardRef } from "react";
import {
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarGridProps,
  CalendarHeaderCell,
} from "react-aria-components";
import { tv } from "tailwind-variants";

const calendarTable = tv({
  slots: {
    root: "w-full md:w-fit",
    dayOfWeek: "pb-1 text-xs font-semibold capitalize text-slate-400",
  },
});

const calendarCell = tv({
  base: `mx-auto my-0.5 flex aspect-square w-8 items-center justify-center rounded-lg text-sm font-semibold text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#005FCC] sm:w-11`,
  variants: {
    state: {
      default: "",
      selected: "bg-purple-500 text-white",
      disabled: "cursor-not-allowed bg-slate-500 text-slate-400",
      unavailable: "cursor-not-allowed bg-red-200 text-red-300",
    },
    hoverable: {
      true: "hover:bg-purple-50",
    },
  },
  defaultVariants: {
    state: "default",
  },
});

const { root, dayOfWeek } = calendarTable();

export const CalendarTable = forwardRef<HTMLTableElement, CalendarGridProps>(
  (props, ref) => {
    return (
      <CalendarGrid
        ref={ref}
        weekdayStyle='short'
        className={root()}
        {...props}
      >
        <CalendarGridHeader>
          {(day) => (
            <CalendarHeaderCell className={dayOfWeek()}>
              {day}
            </CalendarHeaderCell>
          )}
        </CalendarGridHeader>

        <CalendarGridBody>
          {(date) => {
            const getCellState = ({
              isDisabled,
              isUnavailable,
              isSelected,
            }: {
              isDisabled: boolean;
              isUnavailable: boolean;
              isSelected: boolean;
            }) => {
              if (isSelected) return "selected";
              if (isDisabled) return "disabled";
              if (isUnavailable) return "unavailable";
              return "default";
            };

            return (
              <CalendarCell
                className={({ isDisabled, isUnavailable, isSelected }) =>
                  calendarCell({
                    state: getCellState({
                      isDisabled,
                      isUnavailable,
                      isSelected,
                    }),
                    hoverable: !isUnavailable && !isDisabled && !isSelected,
                  })
                }
                date={date}
              />
            );
          }}
        </CalendarGridBody>
      </CalendarGrid>
    );
  },
);
