/// <reference types="react" />
declare type IProps = {
    setData: (name: any, file: any) => void;
    label: string;
    errors: [];
    photo: {
        name: string;
        size: number;
    };
    type: string;
};
declare const FileUpload: ({ setData, label, photo, errors }: IProps) => JSX.Element;
export default FileUpload;
