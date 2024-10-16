import { create } from "@storybook/theming/create";

const DefaultTheme = create({
  base: "light",
  appBg: "white",
  colorPrimary: "#7445FC",
  colorSecondary: "#7445FC",
  brandTitle: `<img src="/logo.png" height="40" width="120"/>`,
  brandTarget: "_self",
});

export default DefaultTheme;
