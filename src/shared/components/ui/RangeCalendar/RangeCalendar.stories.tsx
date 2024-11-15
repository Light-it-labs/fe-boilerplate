import type { Meta, StoryObj } from "@storybook/react";
import { I18nProvider } from "react-aria-components";

import { RangeCalendar } from ".";

const meta: Meta<typeof RangeCalendar> = {
  title: "Components/Datetime/RangeCalendar",
  component: RangeCalendar,
  decorators: [
    (Story: Story) => (
      <I18nProvider locale='en-US'>
        <Story />
      </I18nProvider>
    ),
  ],
  parameters: { componentSubtitle: "A range calendar component" },
  args: {},
  argTypes: {},
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof RangeCalendar>;

export const Default: Story = {};
