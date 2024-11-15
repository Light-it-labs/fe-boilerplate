import type { Meta, StoryObj } from "@storybook/react";
import { I18nProvider } from "react-aria-components";

import { Calendar } from ".";

const meta: Meta<typeof Calendar> = {
  title: "Components/Datetime/Calendar",
  component: Calendar,
  decorators: [
    (Story: Story) => (
      <I18nProvider locale='en-US'>
        <Story />
      </I18nProvider>
    ),
  ],
  parameters: { componentSubtitle: "A calendar component" },
  args: {},
  argTypes: {},
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Calendar>;

export const Default: Story = {};
