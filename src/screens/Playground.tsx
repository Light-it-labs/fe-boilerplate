import { zodResolver } from "@hookform/resolvers/zod";
import { isWeekend } from "@internationalized/date";
import { useLocale } from "react-aria-components";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { currentTimezone } from "~/shared";
import { Button, Calendar, DatePicker } from "~/shared/components";

const dateRules = z
  .string({ message: "Date is required." })
  .refine((value) => !isNaN(Date.parse(value)), {
    message: "Invalid date string, must be a valid ISO 8601 format",
  });

const playgroundFormSchema = z.object({
  date: dateRules,
  calendar: dateRules,
});

type PlaygroundForm = z.infer<typeof playgroundFormSchema>;

export function Playground() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PlaygroundForm>({
    defaultValues: {
      date: undefined,
      calendar: undefined,
    },
    resolver: zodResolver(playgroundFormSchema),
  });

  const currentLocale = useLocale();

  const onSubmit: SubmitHandler<PlaygroundForm> = (form) => {
    console.log({
      ...form,
      tz: currentTimezone,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-3'>
      <DatePicker
        name='date'
        control={control}
        label='Choose date from datepicker'
        errorMessage={errors.date?.message}
        description='Pick a date'
        isDateUnavailable={(dateValue) =>
          !isWeekend(dateValue, currentLocale.locale)
        }
        granularity='second'
      />
      <Calendar
        name='calendar'
        control={control}
        label='Choose date from calendar'
        errorMessage={errors.calendar?.message}
        description='Pick a date'
        isDateUnavailable={(dateValue) =>
          isWeekend(dateValue, currentLocale.locale)
        }
      />
      <Button type='submit' className='self-start'>
        Submit
      </Button>
    </form>
  );
}
