import { zodResolver } from "@hookform/resolvers/zod";
import { isWeekend } from "@internationalized/date";
import { useLocale } from "react-aria-components";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Button,
  Calendar,
  DateField,
  DatePicker,
  DateRangePicker,
  RangeCalendar,
} from "~/shared/components";
import { dateRangeRules, dateRules } from "~/utils";

const playgroundFormSchema = z.object({
  datefield: dateRules,
  datepicker: dateRules,
  daterangepicker: dateRangeRules,
  calendar: dateRules,
  rangecalendar: dateRangeRules,
});

type PlaygroundForm = z.infer<typeof playgroundFormSchema>;

export const Playground = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PlaygroundForm>({
    defaultValues: {
      datefield: undefined,
      datepicker: undefined,
      daterangepicker: undefined,
      calendar: undefined,
      rangecalendar: undefined,
    },
    resolver: zodResolver(playgroundFormSchema),
  });

  const currentLocale = useLocale();
  const onSubmit: SubmitHandler<PlaygroundForm> = (form) => {
    console.log({
      ...form,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-3'>
      <DateField
        name='datefield'
        label='Choose date from datefield'
        control={control}
        errorMessage={errors.datefield?.message}
        description='This is a help text'
      />
      <DatePicker
        name='datepicker'
        control={control}
        label='Choose date from datepicker'
        errorMessage={errors.datepicker?.message}
        description='This is a help text'
        isDateUnavailable={(dateValue) =>
          !isWeekend(dateValue, currentLocale.locale)
        }
        granularity='second'
      />
      <DateRangePicker
        name='daterangepicker'
        control={control}
        label='Choose date from daterangepicker'
        errorMessage={errors.daterangepicker?.message}
        description='This is a help text'
        isDateUnavailable={(dateValue) =>
          isWeekend(dateValue, currentLocale.locale)
        }
        allowsNonContiguousRanges
      />
      <Calendar
        name='calendar'
        control={control}
        label='Choose date from calendar'
        errorMessage={errors.calendar?.message}
        description='This is a help text'
        isDateUnavailable={(dateValue) =>
          isWeekend(dateValue, currentLocale.locale)
        }
      />
      <RangeCalendar
        name='rangecalendar'
        control={control}
        label='Choose range from calendar'
        errorMessage={errors.rangecalendar?.message}
        description='This is a help text'
      />
      <Button type='submit' className='self-start'>
        Submit
      </Button>
    </form>
  );
};
