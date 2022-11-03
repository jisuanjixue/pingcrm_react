import React from "react";
import { Head } from "@inertiajs/inertia-react";
import * as Routes from "../../utils/routes.js";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex } from "@chakra-ui/react";
import UserForm from "./UserForm";

type IProps = {
  user: any;
};

const newIndex = ({ user }: IProps) => {
  const userForm = {
    ...user,
    photo: null
  }
  return (
    <>
      <Head title="Create User"></Head>
      <Breadcrumb fontWeight="medium" fontSize="md" color="rgb(120 134 215)" _hover={{ color: "rgb(86 97 179)" }}>
        <BreadcrumbItem>
          <BreadcrumbLink href={Routes.users()}>Users</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink isCurrentPage>Create</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Flex
        _dark={{
          bg: "#3e3e3e",
        }}
        mt="5"
        w="full"
        alignItems="center"
        justifyContent="start"
      >
        <UserForm {...userForm} />
      </Flex>
    </>
  );
};

export default newIndex;
