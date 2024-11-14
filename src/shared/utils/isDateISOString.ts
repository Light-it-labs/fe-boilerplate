export const isDateISOString = (dateString: string) =>
  !isNaN(Date.parse(dateString));
