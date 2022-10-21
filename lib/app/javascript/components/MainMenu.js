import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Box, Icon, Link } from "@chakra-ui/react";
import DashboardMenus from "../variables/general";
const MainMenu = () => {
    const isUrl = (...urls) => {
        const currentUrl = window.location.href;
        if (urls[0] === "") {
            return currentUrl === "";
        }
        return urls.filter(url => currentUrl.startsWith(url)).length;
    };
    return (_jsx(_Fragment, { children: DashboardMenus.map((m, i) => (_jsx(Box, { mb: 16, display: { md: "block", base: "none" }, w: 224, flexShrink: 0, overflowY: "auto", bgColor: "rgb(47 54 95)", p: 48, children: _jsxs(Link, { display: "flex", role: "group", alignItems: "center", pt: 12, pb: 12, href: m.url, "aria-label": m.linkName, children: [_jsx(Icon, { mr: 8, h: 16, w: 16, as: m.iconName, fill: isUrl(m.urlName) ? "#fff" : "#7886d7", _groupHover: { color: isUrl(m.urlName) ? "" : "#fff" } }), _jsx(Box, { color: isUrl("") ? "#fff" : "#rgb(178 183 255)", _groupHover: { color: isUrl("") ? "" : "#fff" }, children: m.linkName })] }) }, i))) }));
};
export default MainMenu;
//# sourceMappingURL=MainMenu.js.map