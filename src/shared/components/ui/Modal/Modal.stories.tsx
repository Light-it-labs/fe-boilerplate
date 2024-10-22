import { useArgs } from "@storybook/preview-api";
import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../Button";
import * as Modal from "./Modal";

const meta: Meta<typeof Modal.Root> = {
  title: "Components/Modal",
  parameters: { componentSubtitle: "A simple modal component" },
  args: { open: false },
};

export default meta;

type Story = StoryObj<typeof Modal.Root>;

export const Default: Story = {
  render: (args) => {
    const [, updateArgs] = useArgs();

    return (
      <>
        <Modal.Root
          {...args}
          onOpenChange={(open: boolean) => {
            updateArgs({ open });
          }}
        >
          <Modal.Content>
            <Modal.Header>
              <Modal.Title>Modal Title</Modal.Title>
            </Modal.Header>
            <Modal.Description>
              This is a normal modal description. You can put anything you want.
            </Modal.Description>
            <Modal.Footer>
              <Button
                variant='error'
                onClick={() => updateArgs({ open: false })}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal.Root>

        <Button onClick={() => updateArgs({ open: true })}>
          Click me to open
        </Button>
      </>
    );
  },
};
