import { jsx as _jsx } from "react/jsx-runtime";
import { Flex } from "@chakra-ui/react";
const IconBox = props => {
    const { children, ...rest } = props;
    return (_jsx(Flex, { alignItems: "center", justifyContent: "center", borderRadius: "12px", ...rest, children: children }));
};
export default IconBox;
//# sourceMappingURL=IconBox.js.map