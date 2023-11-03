import "../src/index.css";

import { withThemeByDataAttribute } from "@storybook/addon-styling";
import type { Preview } from "@storybook/react";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    storySort: {
      method: "alphabetical",
      order: ["*"], // You can order in whatever way you want.
    },
  },
  decorators: [
    withThemeByDataAttribute({
      themes: {
        light: "light",
        dark: "dark",
      },
      defaultTheme: "light",
      attributeName: "data-mode",
    }),
  ],
};

export default preview;
