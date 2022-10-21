/// <reference types="react" />
import { UserInfo, Filters, Can } from "@/data-types/user";
declare type IProps = {
    users: UserInfo[];
    filters: Filters;
    can: Can;
};
declare const Index: ({ users, filters, can }: IProps) => JSX.Element;
export default Index;
