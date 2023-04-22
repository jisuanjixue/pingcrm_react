import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, CloseButton, useDisclosure } from "@chakra-ui/react";
import { usePage } from "@inertiajs/react";
const FlashMessages = () => {
    const { isOpen: isVisible, onClose } = useDisclosure({ defaultIsOpen: true });
    const status = ["error", "success", "warning", "info"];
    const { flash, errors } = usePage().props;
    return (_jsx(_Fragment, {
        children: isVisible && (_jsxs(Alert, {
            status: (() => {
                if (flash.success)
                    return status[1];
                if (flash.alert)
                    return status[2];
                if (errors)
                    return status[0];
                return status[3] || undefined;
            })(), variant: "left-accent", children: [_jsx(AlertIcon, {}), _jsxs(Box, {
                children: [_jsx(AlertTitle, {
                    children: (() => {
                        if (flash.success)
                            flash.success;
                        if (flash.alert)
                            flash.alert;
                        if (errors) {
                            if (Object.keys(errors).length === 1)
                                return "There is one form error.";
                            return `There are ${Object.keys(errors).length} form
              errors.`;
                        }
                    })()
                }), _jsx(AlertDescription, {})]
            }), _jsx(CloseButton, { alignSelf: "flex-start", position: "relative", right: -1, top: -1, onClick: onClose })]
        }))
    }));
};
export default FlashMessages;
//# sourceMappingURL=FlashMessages.js.map