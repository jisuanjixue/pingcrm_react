import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Flex, Link, List, ListItem, Text } from "@chakra-ui/react";
export default function Footer() {
    return (_jsxs(Flex, { flexDirection: {
            base: "column",
            xl: "row",
        }, alignItems: {
            base: "center",
            xl: "start",
        }, justifyContent: "space-between", px: "30px", pb: "20px", children: [_jsxs(Text, { color: "gray.400", textAlign: {
                    base: "center",
                    xl: "start",
                }, mb: { base: "20px", xl: "0px" }, children: ["\u00A9 ", 1900 + new Date().getYear(), ", ", _jsx(Text, { as: "span", children: document.documentElement.dir === "rtl" ? " " : "Made with ❤️ by " }), _jsx(Link, { color: "teal.400", href: "https://www.creative-tim.com", target: "_blank", children: document.documentElement.dir === "rtl" ? "" : "Creative Tim " }), "&", _jsx(Link, { color: "teal.400", href: "https://www.simmmple.com", target: "_blank", children: document.documentElement.dir === "rtl" ? "" : " Simmmple" }), document.documentElement.dir === "rtl" ? "" : " for a better web"] }), _jsxs(List, { display: "flex", children: [_jsx(ListItem, { me: {
                            base: "20px",
                            md: "44px",
                        }, children: _jsx(Link, { color: "gray.400", href: "https://www.creative-tim.com", children: document.documentElement.dir === "rtl" ? "" : "Creative Tim" }) }), _jsx(ListItem, { me: {
                            base: "20px",
                            md: "44px",
                        }, children: _jsx(Link, { color: "gray.400", href: "https://www.simmmple.com", children: document.documentElement.dir === "rtl" ? "" : "Simmmple" }) }), _jsx(ListItem, { me: {
                            base: "20px",
                            md: "44px",
                        }, children: _jsx(Link, { color: "gray.400", href: "#blog", href: "https://creative-tim.com/blog", children: document.documentElement.dir === "rtl" ? "" : "Blog" }) }), _jsx(ListItem, { children: _jsx(Link, { color: "gray.400", href: "#license", href: "https://www.creative-tim.com/license", children: document.documentElement.dir === "rtl" ? "" : "License" }) })] })] }));
}
//# sourceMappingURL=Footer.js.map