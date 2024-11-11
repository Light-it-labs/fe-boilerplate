import "../src/index.css";

import { withThemeByDataAttribute } from "@storybook/addon-themes";
import type { Preview, ReactRenderer } from "@storybook/react";

const preview: Preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    storySort: { method: "alphabetical", order: ["*"] },
    layout: "centered",
    docs: { toc: true },
  },
  decorators: [
    withThemeByDataAttribute<ReactRenderer>({
      themes: { light: "light", dark: "dark" },
      defaultTheme: "light",
      attributeName: "data-mode",
    }),
  ],
  tags: ["autodocs"],
};

export default preview;
