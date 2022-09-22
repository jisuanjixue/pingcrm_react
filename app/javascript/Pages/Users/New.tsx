import React from "react";
import { Head, useForm } from "@inertiajs/inertia-react"
import * as Routes from "../../utils/routes.js"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex } from "@chakra-ui/react";

const newIndex = () => {
  return (
    <>
      <Head title="Create User"></Head>
      <Breadcrumb fontWeight='medium' fontSize='md' color="rgb(120 134 215)" _hover={{ color: "rgb(86 97 179)" }}>
        <BreadcrumbItem>
          <BreadcrumbLink href={Routes.users()}>Users</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink isCurrentPage>Create</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Flex
        bg="#edf3f8"
        _dark={{
          bg: "#3e3e3e",
        }}
        p={50}
        w="full"
        alignItems="center"
        justifyContent="center"
      >

      </Flex>
    </>
  )
}

export default newIndex;