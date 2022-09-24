import React from "react";
import { Head } from "@inertiajs/inertia-react"
import * as Routes from "../../utils/routes.js"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Flex } from "@chakra-ui/react";
import UserForm from "./UserForm"

type IProps = {
  user: any
}

const newIndex = ({ user }: IProps) => {

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
        <UserForm userForm={user} />
        <Flex justify="end">
          <Button
            isLoading
            loadingText='Loading'
            colorScheme='teal'
            variant='outline'
            spinnerPlacement='start'
            type='submit'
          >
            Create User
          </Button>
        </Flex>
      </Flex>
    </>
  )
}

export default newIndex;