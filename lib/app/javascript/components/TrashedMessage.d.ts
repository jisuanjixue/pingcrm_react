/// <reference types="react" />
declare type IProps = {
    restore: () => void;
};
declare const TrashedMessage: ({ restore }: IProps) => JSX.Element;
export default TrashedMessage;
