import { jsx as _jsx } from "react/jsx-runtime";
import { Flex } from "@chakra-ui/react";
export function Separator(props) {
    const { children, ...rest } = props;
    return (_jsx(Flex, { h: "1px", w: "100%", bg: "linear-gradient(90deg, rgba(224, 225, 226, 0) 0%, #E0E1E2 49.52%, rgba(224, 225, 226, 0) 100%)", ...rest, children: children }));
}
//# sourceMappingURL=Separator.js.map