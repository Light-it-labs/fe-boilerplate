import type { Meta, StoryObj } from "@storybook/react";

import { Button } from ".";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: { componentSubtitle: "A simple button component" },
  args: {
    variant: "default",
    size: "default",
    children: "Button",
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
    children: { table: { disable: true } },
    asChild: { table: { disable: true } },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {};

export const Sizes: Story = {
  argTypes: {
    size: { table: { disable: true } },
    disabled: { table: { disable: true } },
  },
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

export const Variants: Story = {
  argTypes: {
    variant: { table: { disable: true } },
    disabled: { table: { disable: true } },
  },
  render: (args) => (
    <div className='flex size-full items-center gap-4'>
      <Button {...args} variant='default'>
        Default
      </Button>
      <Button {...args} variant='outline'>
        Outline
      </Button>
      <Button {...args} variant='info'>
        Info
      </Button>
      <Button {...args} variant='success'>
        Success
      </Button>
      <Button {...args} variant='error'>
        Error
      </Button>
    </div>
  ),
};

export const Disabled: Story = {
  argTypes: {
    size: { table: { disable: true } },
    variant: { table: { disable: true } },
  },
  args: {
    disabled: true,
  },
};
