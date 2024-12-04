import { CalendarCell, CalendarCellProps } from "react-aria-components";
import { tv } from "tailwind-variants";

const classNames = tv({
  base: `mx-auto my-0.5 flex aspect-square w-8 items-center justify-center rounded-lg text-sm font-semibold text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#005FCC] sm:w-11`,
  variants: {
    selected: {
      true: "bg-purple-500 text-white",
    },
    disabled: {
      true: "cursor-not-allowed bg-slate-500 text-slate-400",
    },
    unavailable: {
      true: "cursor-not-allowed bg-red-200 text-red-300",
    },
    hoverable: {
      true: "hover:bg-purple-50",
    },
  },
  defaultVariants: {},
});

export const CalendarDate = ({ date }: Pick<CalendarCellProps, "date">) => {
  return (
    <CalendarCell
      className={({ isDisabled, isUnavailable, isSelected }) =>
        classNames({
          selected: isSelected,
          disabled: isDisabled,
          unavailable: isUnavailable,
          hoverable: !isUnavailable && !isDisabled && !isSelected,
        })
      }
      date={date}
    />
  );
};
