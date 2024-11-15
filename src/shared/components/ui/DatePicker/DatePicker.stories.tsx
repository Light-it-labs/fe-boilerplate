import type { Meta, StoryObj } from "@storybook/react";
import { I18nProvider } from "react-aria-components";

import { DatePicker } from ".";

const meta: Meta<typeof DatePicker> = {
  title: "Components/Datetime/DatePicker",
  component: DatePicker,
  decorators: [
    (Story: Story) => (
      <I18nProvider locale='en-US'>
        <Story />
      </I18nProvider>
    ),
  ],
  parameters: { componentSubtitle: "A datepicker component" },
  args: {},
  argTypes: {},
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {};
