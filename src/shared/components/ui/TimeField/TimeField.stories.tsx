import type { Meta, StoryObj } from "@storybook/react";
import { I18nProvider } from "react-aria-components";

import { TimeField } from ".";

const meta: Meta<typeof TimeField> = {
  title: "Components/Datetime/TimeField",
  component: TimeField,
  decorators: [
    (Story) => (
      <I18nProvider locale='en-US'>
        <Story />
      </I18nProvider>
    ),
  ],
  parameters: {
    componentSubtitle:
      "A time field allows users to enter and edit time values using a keyboard. Each part of a time value is displayed in an individually editable segment.",
  },
  args: {},
  argTypes: {},
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof TimeField>;

export const Default: Story = {};
