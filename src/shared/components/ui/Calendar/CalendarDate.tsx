import { CalendarCell, CalendarCellProps } from "react-aria-components";
import { tv } from "tailwind-variants";

const classNames = tv({
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

export const CalendarDate = ({ date }: Pick<CalendarCellProps, "date">) => {
  return (
    <CalendarCell
      className={({ isDisabled, isUnavailable, isSelected }) =>
        classNames({
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
};

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
