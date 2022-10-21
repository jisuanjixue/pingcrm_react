import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Flex, Menu, MenuButton, MenuList, MenuItem, Text, Box } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { InertiaLink, Link, usePage } from "@inertiajs/inertia-react";
import * as Routes from "../utils/routes.js";
import Logo from "@/components/Logo";
import MainMenu from "@/components/MainMenu";
import FlashMessages from "@/components/FlashMessages";
const Main = ({ children }) => {
    const { auth: { user }, } = usePage().props;
    return (_jsx(Flex, { direction: { md: "column" }, display: { md: "flex" }, children: _jsxs(Flex, { direction: { md: "column" }, h: { md: "100vh" }, display: { md: "flex" }, children: [_jsxs(Flex, { flexShrink: { md: 0 }, display: { md: "flex" }, children: [_jsx(Flex, { align: "center", justify: { md: "center", base: "space-between" }, bgColor: "rgb(25 30 56)", pr: 24, pl: 24, pt: 16, pb: 16, w: { md: "224px" }, h: { md: "24px" }, flexShrink: { md: 0 }, children: _jsx(InertiaLink, { className: "mt-1", href: Routes.root(), "aria-label": "Home", role: "navigation", children: _jsx(Logo, {}) }) }), _jsxs(Flex, { w: "100%", align: "center", justify: "space-between", borderBottomWidth: 1, bgColor: "rgb(255 255 255)", p: 16, fontSize: 14, lineHeight: 20, pt: { md: "0px" }, pb: { md: "0px" }, pl: { md: "48px" }, pr: { md: "48px" }, children: [_jsx(Box, { mt: 4, mr: 16, children: user.account.name }), _jsxs(Menu, { children: [_jsxs(MenuButton, { as: Box, rightIcon: _jsx(ChevronDownIcon, {}), children: [_jsx(Box, { mr: 4, whiteSpace: "nowrap", color: "rgb(30 42 59)", _focus: { color: "rgb(86 97 179)" }, _groupHover: { color: "rgb(86 97 179)" }, children: user.first_name }), _jsx(Text, { display: { base: "none", md: "inline" }, children: user.last_name })] }), _jsxs(MenuList, { children: [_jsx(MenuItem, { children: _jsx(Link, { role: "navigation", href: Routes.edit_user("1"), children: "My Profile" }) }), _jsx(MenuItem, { children: _jsx(Link, { role: "navigation", href: Routes.users(), children: "Manage Users" }) }), _jsx(MenuItem, { children: _jsx(Link, { href: Routes.destroy_user_session(), method: "delete", as: "button", children: "Logout" }) })] })] })] })] }), _jsxs(Flex, { flexGrow: { md: 1 }, overflow: { md: "hidden" }, children: [_jsx(MainMenu, {}), children, _jsx(Box, { pl: 16, pr: 16, flex: { md: "1 1 0%" }, overflowY: { md: "auto" }, p: { md: "48px" }, "scroll-region": true, children: _jsx(FlashMessages, {}) })] })] }) }));
};
export default Main;
//# sourceMappingURL=Main.js.map