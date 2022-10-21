import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Flex, Button } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
const TrashedMessage = ({ restore }) => {
    const handRestore = () => restore();
    return (_jsx(_Fragment, { children: _jsx(Flex, { align: "center", justify: "space-between", borderRadius: 4, borderWidth: 1, borderColor: "rgb(234 179 8)", bgColor: "rgb(253 224 71)", p: 16, children: _jsxs(Flex, { align: "center", children: [_jsx(DeleteIcon, { mr: 8, w: 16, h: 16, flexShrink: 0, fill: "#713f12" }), _jsx(Button, { color: "rgb(113 63 18)", _hover: { textDecorationLine: "underline" }, onClick: () => handRestore(), children: "Restore" })] }) }) }));
};
export default TrashedMessage;
//# sourceMappingURL=TrashedMessage.js.map