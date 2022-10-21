import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FormControl, FormErrorMessage, FormLabel, IconButton, Input, InputGroup, InputRightElement, useDisclosure, useMergeRefs } from "@chakra-ui/react";
import * as React from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
const PasswordField = ({ password, handValue, ref, isConfirm, password_confirmation }) => {
    const { isOpen, onToggle } = useDisclosure();
    const inputRef = React.useRef();
    const isError = password !== password_confirmation;
    const isShortError = password?.length < 8;
    const mergeRef = useMergeRefs(inputRef, ref);
    const onClickReveal = () => {
        onToggle();
        if (inputRef.current) {
            inputRef.current?.focus({ preventScroll: true });
        }
    };
    return (_jsx(FormControl, { variant: "floating", isRequired: true, children: _jsxs(InputGroup, { children: [_jsx(InputRightElement, { children: _jsx(IconButton, { variant: "link", mb: "-12px", "aria-label": isOpen ? "Mask password" : "Reveal password", icon: isOpen ? _jsx(HiEyeOff, {}) : _jsx(HiEye, {}), onClick: onClickReveal }) }), _jsx(Input, { id: isConfirm ? "password_confirmation" : "password", fontSize: "sm", ms: "4px", borderRadius: "15px", placeholder: " ", ref: mergeRef, name: isConfirm ? "password_confirmation" : "password", type: isOpen ? "text" : "password", autoComplete: "current-password", required: true, mb: "24px", size: "lg", variant: "filled", value: isConfirm ? password_confirmation : password, onChange: e => handValue(e) }), _jsx(FormLabel, { ms: "4px", fontSize: "sm", fontWeight: "normal", children: isConfirm ? "密码确认" : "密码" }), isShortError && _jsx(FormErrorMessage, { children: "\u5BC6\u7801\u592A\u77ED" }), isConfirm && isError && _jsx(FormErrorMessage, { children: "\u5BC6\u7801\u9519\u8BEF" })] }) }));
};
PasswordField.displayName = "PasswordField";
export default PasswordField;
//# sourceMappingURL=PasswordField.js.map