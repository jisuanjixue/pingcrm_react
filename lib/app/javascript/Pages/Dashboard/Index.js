import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Head } from "@inertiajs/react";
import * as timeago from "timeago.js";
import { Link, Text } from "@chakra-ui/react";
import Main from "../../Layouts/Main";
const Dashboard = ({ git }) => {
    return (_jsx(_Fragment, {
        children: _jsxs(Main, {
            children: [_jsx(Head, { title: "Dashboard" }), _jsx(Text, { mb: 8, fontSize: 30, lineHeight: 36, fontWeight: 700, children: "Dashboard" }), _jsxs(Text, {
                mb: 32, lineHeight: 1.5, children: ["Hey there! Welcome to Ping CRM, a demo app designed to help illustrate how", _jsx(Link, {
                    fontWeight: 700, textDecorationColor: "underline", color: "rgb(47 54 95)", _hover: {
                        color: "rgb(234 88 12)",
                    }, href: "https://inertiajs.com", children: "Inertia.js"
                }), "works with", _jsx(Link, {
                    fontWeight: 700, textDecorationColor: "underline", color: "rgb(47 54 95 / 1", _hover: {
                        color: "rgb(234 88 12 / 1)",
                    }, children: "Ruby on Rails"
                })]
            }), git?.commit_url && (_jsxs(Text, { mb: 40, lineHeight: 1.5, children: ["Version:", " ", _jsx(Link, { href: git?.commit_url, textDecorationColor: "underline", children: git?.commit_sha }), timeago.format(git?.commit_time)] }))]
        })
    }));
};
export default Dashboard;
//# sourceMappingURL=Index.js.map