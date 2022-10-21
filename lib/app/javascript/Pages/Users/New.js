import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Head } from "@inertiajs/inertia-react";
import * as Routes from "../../utils/routes.js";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Flex } from "@chakra-ui/react";
import UserForm from "./UserForm";
const newIndex = ({ user }) => {
    return (_jsxs(_Fragment, { children: [_jsx(Head, { title: "Create User" }), _jsxs(Breadcrumb, { fontWeight: "medium", fontSize: "md", color: "rgb(120 134 215)", _hover: { color: "rgb(86 97 179)" }, children: [_jsx(BreadcrumbItem, { children: _jsx(BreadcrumbLink, { href: Routes.users(), children: "Users" }) }), _jsx(BreadcrumbItem, { children: _jsx(BreadcrumbLink, { isCurrentPage: true, children: "Create" }) })] }), _jsxs(Flex, { bg: "#edf3f8", _dark: {
                    bg: "#3e3e3e",
                }, p: 50, w: "full", alignItems: "center", justifyContent: "center", children: [_jsx(UserForm, { userForm: user }), _jsx(Flex, { justify: "end", children: _jsx(Button, { isLoading: true, loadingText: "Loading", colorScheme: "teal", variant: "outline", spinnerPlacement: "start", type: "submit", children: "Create User" }) })] })] }));
};
export default newIndex;
//# sourceMappingURL=New.js.map