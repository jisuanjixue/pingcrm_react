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
export default extendTheme({
    breakpoints: {},
    fonts: {
        heading: "Heading Font Name",
        body: "Body Font Name",
        mono: "Menlo, monospace",
    },
    fontSizes: {},
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
    lineHeights: {},
    letterSpacings: {},
}, globalStyles, buttonStyles, inputStyles, badgeStyles, linkStyles, drawerStyles, CardComponent, CardBodyComponent, CardHeaderComponent, MainPanelComponent, PanelContentComponent, PanelContainerComponent);
//# sourceMappingURL=theme.js.map