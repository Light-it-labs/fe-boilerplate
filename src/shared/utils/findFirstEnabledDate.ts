export const findFirstEnabledDate = (
  table: HTMLTableElement | null,
): Element | null => {
  return (
    table?.querySelector<HTMLTableCellElement>("td:not([aria-disabled])")
      ?.children[0] ?? null
  );
};
