import type { Meta, StoryObj } from "@storybook/react";
import { I18nProvider } from "react-aria-components";

import { DateField } from ".";

const meta: Meta<typeof DateField> = {
  title: "Components/Datetime/DateField",
  component: DateField,
  decorators: [
    (Story: Story) => (
      <I18nProvider locale='en-US'>
        <Story />
      </I18nProvider>
    ),
  ],
  parameters: { componentSubtitle: "A datefield component" },
  args: {},
  argTypes: {},
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof DateField>;

export const Default: Story = {};
