import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useCallback } from "react";
import { Box, Flex, Button, FormControl, FormLabel, Heading, Input, Switch, Text, useColorModeValue, HStack } from "@chakra-ui/react";
import { useForm } from "@inertiajs/inertia-react";
import * as Routes from "../../utils/routes.js";
import PasswordField from "../../components/passwordInput/PasswordField";
import { Head } from "@inertiajs/inertia-react";
const Login = () => {
    const titleColor = useColorModeValue("teal.300", "teal.200");
    const textColor = useColorModeValue("gray.400", "white");
    const bgColor = useColorModeValue("white", "gray.700");
    const defauleData = {
        user: {
            email: "johndoe@example.com",
            password: "secret",
            remember: null,
        },
    };
    const { data, setData, post, processing, errors } = useForm(defauleData);
    const handValue = useCallback(e => setData({ user: { ...data.user, [e.target.name]: e.target.value } }), [data]);
    const handleSubmit = () => {
        post(Routes.user_session());
    };
    return (_jsxs(_Fragment, { children: [_jsx(Head, { title: "Login" }), _jsx(Flex, { position: "relative", mb: "40px", children: _jsxs(Flex, { h: { sm: "initial", md: "75vh", lg: "85vh" }, w: "100%", maxW: "1044px", mx: "auto", justifyContent: "space-between", mb: "30px", pt: { sm: "100px", md: "0px" }, children: [_jsx(Flex, { alignItems: "center", justifyContent: "start", style: { userSelect: "none" }, mb: "60px", mt: "20px", w: { base: "100%", md: "100%", lg: "102%" }, children: _jsxs(Flex, { direction: "column", w: "440px", height: "620px", background: "transparent", borderRadius: "15px", p: "40px", mt: { sm: "80px", md: "120px", lg: "200px", xl: "140px" }, mx: { base: "100px", md: "150px", lg: "80px" }, bg: bgColor, boxShadow: "0 20px 27px 0 rgb(0 0 0 / 5%)", children: [_jsx(Heading, { color: titleColor, fontSize: "32px", mb: "10px", children: "\u6B22\u8FCE\u56DE\u6765" }), _jsx(Text, { mb: "36px", ms: "4px", color: textColor, fontWeight: "bold", fontSize: "14px", children: "\u586B\u5165\u4F60\u7684\u90AE\u7BB1\u548C\u5BC6\u7801" }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs(FormControl, { variant: "floating", isRequired: true, children: [_jsx(Input, { autoFocus: true, borderRadius: "15px", fontSize: "sm", mb: "36px", variant: "filled", type: "text", placeholder: " ", size: "lg", value: data?.user?.email, name: "email", onChange: e => handValue(e) }), _jsx(FormLabel, { ms: "4px", fontSize: "sm", fontWeight: "normal", htmlFor: "login", children: "\u7535\u5B50\u90AE\u4EF6" })] }), _jsx(PasswordField, { password: data?.user?.password, handValue: handValue, ref: undefined, isConfirm: false }), _jsx(HStack, { justify: "space-between", children: _jsxs(FormControl, { display: "flex", alignItems: "center", children: [_jsx(Switch, { id: "remember-login", colorScheme: "teal", me: "10px" }), _jsx(FormLabel, { htmlFor: "remember-login", mb: "0", ms: "1", fontWeight: "normal", children: "\u8BB0\u4F4F\u6211" })] }) }), _jsx(Button, { fontSize: "10px", type: "submit", bg: "teal.300", w: "100%", h: "45", mb: "10px", color: "white", mt: "20px", _hover: {
                                                    bg: "teal.200",
                                                }, _active: {
                                                    bg: "teal.400",
                                                }, disabled: processing, onClick: () => handleSubmit(), children: _jsx(Box, { fontSize: "18px", children: "\u767B\u5F55" }) })] }), _jsx(Flex, { flexDirection: "column", justifyContent: "center", alignItems: "center", maxW: "100%", mt: "0px" })] }) }), _jsx(Box, { display: { base: "none", md: "block" }, overflowX: "hidden", h: "100%", w: "40vw", position: "absolute", right: "0px", children: _jsx(Box, { w: "100%", h: "100%", bgSize: "cover", bgPosition: "50%", position: "absolute", borderBottomLeftRadius: "20px" }) })] }) })] }));
};
export default Login;
//# sourceMappingURL=Login.js.map