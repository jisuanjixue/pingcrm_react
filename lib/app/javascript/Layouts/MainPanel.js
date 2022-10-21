import { jsx as _jsx } from "react/jsx-runtime";
import { Box, useStyleConfig } from "@chakra-ui/react";
const MainPanel = props => {
    const { variant, children, ...rest } = props;
    const styles = useStyleConfig("MainPanel", { variant });
    return (_jsx(Box, { __css: styles, ...rest, w: {
            md: "100%",
            base: "100%",
            xl: "100%",
        }, children: children }));
};
export default page => _jsx(MainPanel, { children: page });
//# sourceMappingURL=MainPanel.js.map