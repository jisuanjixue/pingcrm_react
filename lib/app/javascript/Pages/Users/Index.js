import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import { Box, Button, Flex, FormControl, FormLabel, HStack, Avatar, Input, Select, Table, Tbody, Td, Th, Thead, Tr, Text, FormHelperText } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import pickBy from "lodash/pickBy";
import * as Routes from "../../utils/routes";
const Index = ({ users, filters, can }) => {
    const { data, get, setData, processing, errors, reset } = useForm(filters);
    const query = () => {
        const query = pickBy(data);
        get(Routes.users(Object.keys(query).length ? query : { remember: "forget" }), {
            preserveState: true,
            preserveScroll: true,
            replace: true,
            only: ["users"],
        });
    };
    const header = ["Name", "Email", "Role"];
    const handleSubmit = e => {
        e.preventDefault();
        query();
    };
    const handleReset = e => {
        e.preventDefault();
        reset();
        query();
    };
    const handleChange = (e, name) => {
        const value = e.target.value;
        setData(name, value);
    };
    return (_jsxs(_Fragment, {
        children: [_jsx(Head, { title: "Users" }), _jsx(Text, { mb: 32, fontSize: 30, lineHeight: 36, fontWeight: 700, children: "Users" }), _jsxs(Flex, { mb: 24, alignItems: "center", justifyContent: "space-between", children: [_jsx("form", { onSubmit: handleSubmit, onReset: handleReset, children: _jsxs(HStack, { spacing: 8, children: [_jsxs(FormControl, { children: [_jsx(FormLabel, { htmlFor: "role", children: "role" }), _jsxs(Select, { placeholder: "Select role", onChange: e => handleChange(e, "role"), value: data.role, children: [_jsx("option", { value: "null" }), _jsx("option", { value: "user", children: "User" }), _jsx("option", { value: "owner", children: "Owner" })] }), errors.role && _jsx(FormHelperText, { children: errors.role })] }), _jsxs(FormControl, { children: [_jsx(FormLabel, { htmlFor: "trashed", children: "trash" }), _jsxs(Select, { placeholder: "Select Trashed", onChange: e => handleChange(e, "trashed"), value: data.trashed, children: [_jsx("option", { value: "null" }), _jsx("option", { value: "with", children: "With Trashed" }), _jsx("option", { value: "only", children: "Only Trashed" })] }), errors.trashed && _jsx(FormHelperText, { children: errors.trashed })] }), _jsxs(FormControl, { children: [_jsx(FormLabel, { htmlFor: "search", children: "search" }), _jsx(Input, { type: "search", variant: "filled", onChange: e => handleChange(e, "search"), value: data.search }), errors.search && _jsx(FormHelperText, { children: errors.search })] }), _jsx(Button, { type: "submit", colorScheme: "purple", width: "full", disabled: processing, children: "inquire" }), _jsx(Button, { type: "reset", colorScheme: "purple", width: "full", children: "reset" })] }) }), can.create_user && (_jsx(Link, { href: Routes.new_user(), as: "button", type: "button", colorScheme: "teal", variant: "solid", size: "md", data: true, children: "Create User" }))] }), _jsx(Box, {
            overflowY: "auto", borderRadius: 4, bgColor: "#ffffff", boxShadow: "md", children: _jsxs(Table, {
                w: "full", bg: "white", _dark: {
                    bg: "gray.800",
                }, display: {
                    base: "block",
                    md: "table",
                }, sx: {
                    "@media print": {
                        display: "table",
                    },
                }, whiteSpace: "nowrap", children: [_jsx(Thead, {
                    display: {
                        base: "none",
                        md: "table-header-group",
                    }, sx: {
                        "@media print": {
                            display: "table-header-group",
                        },
                    }, children: _jsx(Tr, { textAlign: "left", fontWeight: 700, children: header.map(x => (_jsx(Th, { children: x }, x))) })
                }), _jsx(Tbody, {
                    display: {
                        base: "block",
                        lg: "table-row-group",
                    }, sx: {
                        "@media print": {
                            display: "table-row-group",
                        },
                    }, children: users?.map((item, index) => {
                        return (_jsx(Tr, {
                            display: {
                                base: "grid",
                                md: "table-row",
                            }, sx: {
                                "@media print": {
                                    display: "table-row",
                                },
                                gridTemplateColumns: "minmax(0px, 35%) minmax(0px, 65%)",
                                gridGap: "10px",
                            }, _focusWithin: { backgroundColor: "(rgb(241 245 249 )" }, _hover: { backgroundColor: "(rgb(241 245 249 )" }, children: Object.keys(item).map((x, i) => {
                                return (_jsxs(React.Fragment, {
                                    children: [_jsx(Td, {
                                        display: {
                                            base: "table-cell",
                                            md: "none",
                                        }, sx: {
                                            "@media print": {
                                                display: "none",
                                            },
                                            textTransform: "uppercase",
                                            color: "#fff",
                                            fontSize: "xs",
                                            fontWeight: "bold",
                                            letterSpacing: "wider",
                                            fontFamily: "heading",
                                        }, children: x
                                    }), _jsx(Td, { fontSize: "md", fontWeight: "hairline", children: _jsx(Box, { display: "flex", alignItems: "center", pr: 24, pl: 24, pb: 16, pt: 16, _focus: { color: "rgb(101 116 205)" }, children: _jsxs(Link, { href: Routes.edit_user(item.id), "aria-label": "Edit", children: [i === 0 && item.photo && _jsx(Avatar, { name: "Photo", mt: -8, mb: -8, size: "sm", src: item.photo }), item[x], x === "owner" && item[x] ? "Owner" : "User", i === 0 && item.deleted_at && _jsx(DeleteIcon, { w: 12, h: 12, fill: "#64748b", flexShrink: 0, ml: 8 })] }) }) })]
                                }, `${index}${x}`));
                            })
                        }, index));
                    })
                })]
            })
        })]
    }));
};
export default Index;
//# sourceMappingURL=Index.js.map