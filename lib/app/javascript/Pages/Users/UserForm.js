import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FormControl, FormLabel, Input, SimpleGrid, FormErrorMessage, Select } from "@chakra-ui/react";
import { useForm } from "@inertiajs/inertia-react";
import PasswordField from "@/components/passwordInput/PasswordField";
import FileUpload from "@/components/fileUpload/index";
const UserForm = ({ userForm }) => {
    const { data, get, setData, processing, errors, reset } = useForm({ ...userForm });
    const handValue = (e, name) => {
        const value = e.target.value;
        setData(name, value);
    };
    const fileProps = {
        setData,
        label: "Photo",
        errors,
        photo: data.photo,
        type: "file",
    };
    return (_jsx("form", { children: _jsxs(SimpleGrid, { columns: 2, spacing: 10, children: [_jsxs(FormControl, { variant: "floating", isRequired: true, children: [_jsx(Input, { autoFocus: true, borderRadius: "15px", fontSize: "sm", mb: "36px", variant: "filled", type: "text", placeholder: " ", size: "lg", value: data?.first_name, name: "first_name", onChange: e => handValue(e, "first_name") }), _jsx(FormLabel, { ms: "4px", fontSize: "sm", fontWeight: "normal", htmlFor: "login", children: "First name" }), errors.first_name && _jsx(FormErrorMessage, { children: errors.first_name })] }), _jsxs(FormControl, { variant: "floating", children: [_jsx(Input, { autoFocus: true, borderRadius: "15px", fontSize: "sm", mb: "36px", variant: "filled", type: "text", placeholder: " ", size: "lg", value: data?.last_name, name: "last_name", onChange: e => handValue(e, "last_name") }), _jsx(FormLabel, { ms: "4px", fontSize: "sm", fontWeight: "normal", htmlFor: "login", children: "Last name" }), errors.last_name && _jsx(FormErrorMessage, { children: errors.last_name })] }), _jsxs(FormControl, { variant: "floating", children: [_jsx(Input, { autoFocus: true, borderRadius: "15px", fontSize: "sm", mb: "36px", variant: "filled", type: "email", placeholder: " ", size: "lg", value: data?.email, name: "email", onChange: e => handValue(e, "email") }), _jsx(FormLabel, { ms: "4px", fontSize: "sm", fontWeight: "normal", htmlFor: "login", children: "Email" }), errors.email && _jsx(FormErrorMessage, { children: errors.email })] }), _jsx(PasswordField, { password: data?.password, handValue: e => handValue(e, "password"), ref: undefined, isConfirm: false }), _jsxs(FormControl, { children: [_jsx(FormLabel, { htmlFor: "owner", children: "Owner" }), _jsxs(Select, { placeholder: "Select yes or no owner", onChange: e => handValue(e, "owner"), value: data?.owner, children: [_jsx("option", { value: "true", children: "Yes" }), _jsx("option", { value: "false", children: "No" })] }), errors.owner && _jsx(FormErrorMessage, { children: errors.owner })] }), _jsx(FileUpload, { ...fileProps })] }) }));
};
export default UserForm;
//# sourceMappingURL=UserForm.js.map