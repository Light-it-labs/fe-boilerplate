import type { Meta, StoryObj } from "@storybook/react";

import { Button } from ".";

const meta: Meta<typeof Button> = {
  component: Button,
  parameters: { componentSubtitle: "A simple button component" },
  args: {
    variant: "default",
    size: "default",
    children: "Click Me",
    disabled: false,
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "outline", "info", "success", "error"],
    },
    size: {
      control: { type: "radio" },
      options: ["sm", "default", "lg"],
    },
    asChild: { table: { disable: true } },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div className='flex size-full items-center gap-4'>
      <Button {...args} size='sm'>
        Small
      </Button>
      <Button {...args}>Default</Button>
      <Button {...args} size='lg'>
        Large
      </Button>
    </div>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Outline: Story = {
  args: { variant: "outline" },
};

export const Info: Story = {
  args: { variant: "info" },
};

export const Success: Story = {
  args: { variant: "success" },
};

export const Error: Story = {
  args: { variant: "error" },
};
