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

export function CalendarHeader() {
  return (
    <header className={root()}>
      <Button className={previous()} slot='previous'>
        ◀
      </Button>
      <Heading className={heading()} />
      <Button className={next()} slot='next'>
        ▶
      </Button>
    </header>
  );
}
