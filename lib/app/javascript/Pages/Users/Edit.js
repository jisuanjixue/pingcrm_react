import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Head, Link } from "@inertiajs/inertia-react";
import { Box, Flex, Text, Image } from "@chakra-ui/react";
import * as Routes from "../../utils/routes";
import TrashedMessage from "@/components/TrashedMessage";
const EditIndex = ({ user }) => {
    const restore = () => { };
    return (_jsxs(_Fragment, { children: [_jsx(Head, { title: `${user.first_name} ${user.last_name}` }), _jsxs(Flex, { mb: 32, maxWidth: 768, justifyContent: "center", children: [_jsxs(Text, { fontSize: 30, lineHeight: 36, fontWeight: "bold", children: [_jsx(Box, { color: "rgb(101 116 205)", _hover: { color: "rgb(86 97 179)" }, children: _jsx(Link, { href: Routes.users(), children: "users" }) }), _jsx("span", { fontWeight: 500, color: "rgb(120 134 215)", children: "/" }), user?.first_name, user?.last_name] }), user.photo && _jsx(Image, { boxSize: 32, ml: 16, src: user.photo, objectFit: "cover", borderRadius: "full", alt: "" })] }), user.deleted_at && (_jsx(TrashedMessage, { restore: restore, children: _jsx(Text, { color: "rgb(113 63 68)", children: "This user has been deleted." }) }))] }));
};
export default EditIndex;
//# sourceMappingURL=Edit.js.map