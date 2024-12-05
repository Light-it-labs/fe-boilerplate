import { Button, Heading } from "react-aria-components";
import { tv } from "tailwind-variants";

const classNames = tv({
  slots: {
    root: "flex justify-between pb-3",
    previous: "text-gray-400",
    next: "text-gray-400",
    heading: "font-semibold first-letter:uppercase",
  },
})();

interface CalendarHeaderProps {
  prevIcon?: React.ReactNode;
  nextIcon?: React.ReactNode;
}

export const CalendarHeader = ({
  prevIcon = "◀",
  nextIcon = "▶",
}: CalendarHeaderProps) => {
  return (
    <header className={classNames.root()}>
      <Button className={classNames.previous} slot='previous'>
        {prevIcon}
      </Button>
      <Heading className={classNames.heading()} />
      <Button className={classNames.next} slot='next'>
        {nextIcon}
      </Button>
    </header>
  );
};
