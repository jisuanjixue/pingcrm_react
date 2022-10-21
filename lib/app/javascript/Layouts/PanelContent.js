import { jsxs as _jsxs } from "react/jsx-runtime";
import { Box, useStyleConfig } from "@chakra-ui/react";
const PanelContent = props => {
    const { variant, children, ...rest } = props;
    const styles = useStyleConfig("PanelContent", { variant });
    return (_jsxs(Box, { __css: styles, ...rest, children: [...children] }));
};
export default PanelContent;
//# sourceMappingURL=PanelContent.js.map