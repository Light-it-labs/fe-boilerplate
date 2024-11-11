import type { Meta, StoryObj } from "@storybook/react";

import { Input } from ".";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  parameters: { componentSubtitle: "A simple input component" },
  args: {
    placeholder: "Placeholder",
  },
  argTypes: {
    asChild: { table: { disable: true } },
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {};

export const Disabled: Story = {
  args: { disabled: true },
};
