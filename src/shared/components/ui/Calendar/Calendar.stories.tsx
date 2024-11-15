import { today } from "@internationalized/date";
import type { Meta, StoryObj } from "@storybook/react";
import { I18nProvider } from "react-aria-components";

import { currentTimezone } from "~/utils";
import { Calendar } from ".";

const meta: Meta<typeof Calendar> = {
  title: "Components/Datetime/Calendar",
  component: Calendar,
  decorators: [
    (Story) => (
      <I18nProvider locale='en-US'>
        <Story />
      </I18nProvider>
    ),
  ],
  parameters: {
    componentSubtitle:
      "A calendar displays a date grid and allows users to select a single date.",
  },
  args: {},
  argTypes: {},
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Calendar>;

export const Default: Story = {};

export const DifferentLocale: Story = {
  decorators: [
    (Story) => (
      <I18nProvider locale='es-UY'>
        <Story />
      </I18nProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          "To change the language on the calendar labels, just change the locale on the `I18nProvider`.",
      },
    },
  },
  render: () => <Calendar />,
};

export const DisabledBeforeToday: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Disabling dates is achieved by passing a filtering function to the `isDateUnavailable` prop. It receives each `dateValue`, and you can run that through any check. You can use any of the checking functions from `@internationalized/date` or compare dates using `dateValue.compare()`",
      },
    },
  },
  render: () => {
    return (
      <Calendar
        isDateUnavailable={(dateValue) =>
          dateValue.compare(today(currentTimezone)) < 0
        }
      />
    );
  },
};
