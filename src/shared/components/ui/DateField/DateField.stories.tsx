import type { Meta, StoryObj } from "@storybook/react";
import { I18nProvider } from "react-aria-components";

import { DateField } from ".";

const meta: Meta<typeof DateField> = {
  title: "Components/Datetime/DateField",
  component: DateField,
  decorators: [
    (Story) => (
      <I18nProvider locale='en-US'>
        <Story />
      </I18nProvider>
    ),
  ],
  parameters: {
    componentSubtitle:
      "A date field allows users to enter and edit date and time values using a keyboard. Each part of a date value is displayed in an individually editable segment.",
  },
  args: {},
  argTypes: {},
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof DateField>;

export const Default: Story = {};

export const TimeGranularity: Story = {
  render: () => (
    <div className='flex flex-col gap-4'>
      <DateField granularity='hour' />
      <DateField granularity='minute' />
      <DateField granularity='second' />
    </div>
  ),
};
