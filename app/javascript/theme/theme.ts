import { extendTheme } from "@chakra-ui/react";
import { globalStyles } from "./styles";
import { buttonStyles } from "./components/button";
import { inputStyles } from "./components/input";
import { badgeStyles } from "./components/badge";
import { linkStyles } from "./components/link";
import { drawerStyles } from "./components/drawer";
import { CardComponent } from "./additions/card/Card";
import { CardBodyComponent } from "./additions/card/CardBody";
import { CardHeaderComponent } from "./additions/card/CardHeader";
import { MainPanelComponent } from "./additions/layout/MainPanel";
import { PanelContentComponent } from "./additions/layout/PanelContent";
import { PanelContainerComponent } from "./additions/layout/PanelContainer";
import { theme as baseTheme } from '@saas-ui/react'
import { theme as glassTheme } from '@saas-ui/theme-glass'

export default extendTheme(
  {
    breakpoints: {
      // sm: "1024px",
      // md: "1280px",
      // lg: "1440px",
      // xl: "1920px",
      // "2xl": "1536px",
    },
    fonts: {
      heading: "Heading Font Name",
      body: "Body Font Name",
      mono: "Menlo, monospace",
    },
    // config,
    fontSizes: {
      xs: "0.75rem",
      sm: "0.875rem",
      md: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "3.75rem",
      "7xl": "4.5rem",
      "8xl": "6rem",
      "9xl": "8rem",
    },
    fontWeights: {
      hairline: 100,
      thin: 200,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
    },
    lineHeights: {
      normal: "normal",
      none: 1,
      shorter: 1.25,
      short: 1.375,
      base: 1.5,
      tall: 1.625,
      taller: "2",
    },
    letterSpacings: {
    },
  },
  baseTheme,
  glassTheme,
  globalStyles,
  buttonStyles, // Button styles
  inputStyles, // input styles
  badgeStyles, // Badge styles
  linkStyles, // Link styles
  drawerStyles, // Sidebar variant for Chakra's drawer
  CardComponent, // Card component
  CardBodyComponent, // Card Body component
  CardHeaderComponent, // Card Header component
  MainPanelComponent, // Main Panel component
  PanelContentComponent, // Panel Content component
  PanelContainerComponent // Panel Container component
);
