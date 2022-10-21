import * as React from "react";
declare type IProps = {
    password: string;
    ref: any;
    handValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isConfirm?: boolean;
    password_confirmation?: string;
};
declare const PasswordField: {
    ({ password, handValue, ref, isConfirm, password_confirmation }: IProps): JSX.Element;
    displayName: string;
};
export default PasswordField;
