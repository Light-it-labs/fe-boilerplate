import { Button, Heading } from "react-aria-components";
import { tv } from "tailwind-variants";

const calendarHeader = tv({
  slots: {
    root: "flex justify-between pb-3",
    previous: "text-gray-400",
    next: "text-gray-400",
    heading: "font-semibold first-letter:uppercase",
  },
});

const { root, previous, next, heading } = calendarHeader();

interface CalendarHeaderProps {
  prevIcon?: React.ReactNode;
  nextIcon?: React.ReactNode;
}

export const CalendarHeader = ({
  prevIcon = "◀",
  nextIcon = "▶",
}: CalendarHeaderProps) => {
  return (
    <header className={root()}>
      <Button className={previous()} slot='previous'>
        {prevIcon}
      </Button>
      <Heading className={heading()} />
      <Button className={next()} slot='next'>
        {nextIcon}
      </Button>
    </header>
  );
};
