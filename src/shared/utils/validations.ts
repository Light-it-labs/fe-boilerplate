import { z } from "zod";

import { isDateISOString } from "~/shared/utils/isDateISOString";

export const dateRules = z
  .string({ message: "Date is required." })
  .refine((dateString) => isDateISOString(dateString), {
    message: "Invalid date string, must be a valid ISO 8601 format",
  });

export const dateRangeRules = z
  .array(z.string())
  .length(2, { message: "Exactly two dates are required." })
  .refine((dates) => dates.some((date) => isDateISOString(date)), {
    message: "Each date must be a valid ISO 8601 string.",
  });
