import { jsxs as _jsxs } from "react/jsx-runtime";
import { Box, useStyleConfig } from "@chakra-ui/react";
const PanelContainer = props => {
    const { variant, children, ...rest } = props;
    const styles = useStyleConfig("PanelContainer", { variant });
    return (_jsxs(Box, { __css: styles, ...rest, children: [...children] }));
};
export default PanelContainer;
//# sourceMappingURL=PanelContainer.js.map