import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { FormControl, Input, FormLabel, Box, Button, Text, FormErrorMessage } from "@chakra-ui/react";
import { useRef } from "react";
const FileUpload = ({ setData, label, photo, errors }) => {
    const refFile = useRef();
    const browse = () => {
        refFile?.file.click();
    };
    const handRemove = () => {
        setData("photo", null);
    };
    const filesize = size => {
        const sizeNum = ["B", "kB", "MB", "GB", "TB"];
        const i = Math.floor(Math.log(size) / Math.log(1024));
        return `${(size / Math.pow(1024, i)).toFixed(2) * 1} ${sizeNum[i]}`;
    };
    return (_jsxs(_Fragment, { children: [label && _jsx(FormLabel, { children: label }), _jsx(FormControl, { children: _jsx(Input, { type: "file", accept: "image/*", display: "none", ref: refFile, onChange: e => setData("photo", e?.target?.files?.[0]) }) }), photo ? (_jsx(Box, { pr: 8, pl: 8, children: _jsx(Button, { onClick: () => browse(), colorScheme: "teal", variant: "solid", children: "Browse" }) })) : (_jsxs(Box, { display: "flex", alignItems: "center", justifyContent: "space-between", pr: 8, pl: 8, children: [_jsx(Box, { children: photo?.name }), _jsx(Text, { fontSize: "", color: "", children: filesize(photo?.size) }), _jsx(Button, { onClick: () => handRemove(), colorScheme: "teal", variant: "solid", children: "Remove" })] })), errors.length > 0 && _jsx(FormErrorMessage, { children: errors[0] })] }));
};
export default FileUpload;
//# sourceMappingURL=index.js.map