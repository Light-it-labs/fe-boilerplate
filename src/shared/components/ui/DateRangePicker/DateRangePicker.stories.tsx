import type { Meta, StoryObj } from "@storybook/react";
import { I18nProvider } from "react-aria-components";

import { DateRangePicker } from ".";

const meta: Meta<typeof DateRangePicker> = {
  title: "Components/Datetime/DateRangePicker",
  component: DateRangePicker,
  decorators: [
    (Story) => (
      <I18nProvider locale='en-US'>
        <Story />
      </I18nProvider>
    ),
  ],
  parameters: {
    componentSubtitle:
      "A date range picker combines two DateFields and a RangeCalendar popover to allow users to enter or select a date and time range.",
  },
  args: {},
  argTypes: {},
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof DateRangePicker>;

export const Default: Story = {};
