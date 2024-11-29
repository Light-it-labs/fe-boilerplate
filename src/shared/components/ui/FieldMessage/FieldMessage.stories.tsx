import type { Meta, StoryObj } from "@storybook/react";

import { FieldMessage } from ".";

const meta: Meta<typeof FieldMessage> = {
  title: "Components/FieldMessage",
  component: FieldMessage,
  parameters: {
    componentSubtitle:
      "A FieldMessage is a simple text component to display either a help text or error message inside form fields.",
  },
  args: {
    description: "An example help text",
  },
  argTypes: {
    description: { type: "string" },
    error: { type: "string" },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof FieldMessage>;

export const Default: Story = {};

export const Error: Story = {
  args: {
    error: "An example error",
  },
  render: (args) => <FieldMessage {...args} />,
};
