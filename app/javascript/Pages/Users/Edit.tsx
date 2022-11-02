import React from "react";
import { Head, Link } from "@inertiajs/inertia-react";
import { Box, Flex, Text, Image, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import UserForm from "./UserForm";
import * as Routes from "../../utils/routes";

// import TrashedMessage from "@/components/TrashedMessage";

type IProps = {
  user: any;
};
const EditIndex = ({ user }: IProps) => {
  const userForm = {
    ...user
  }
  // const restore = () => { };
  return (
    <>
      <Head title={`Edit${user.first_name} ${user.last_name}`} />
      <Breadcrumb fontWeight="medium" fontSize="md" color="rgb(120 134 215)" _hover={{ color: "rgb(86 97 179)" }}>
        <BreadcrumbItem>
          <BreadcrumbLink href={Routes.users()}>Users</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink isCurrentPage> {user?.first_name} {user?.last_name} {user.photo && <Image boxSize={32} ml={16} src={user.photo} objectFit="cover" borderRadius="full" alt="" />}</BreadcrumbLink>
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
      {/* {user.deleted_at && (
        <TrashedMessage restore={restore}>
          <Text color="rgb(113 63 68)">This user has been deleted.</Text>
        </TrashedMessage>
      )} */}
    </>
  );
};

export default EditIndex;
