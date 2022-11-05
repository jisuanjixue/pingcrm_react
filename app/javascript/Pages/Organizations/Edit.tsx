import React, { useCallback } from "react";
import { Head, useForm } from "@inertiajs/inertia-react";
import { Flex, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Stack, Button } from "@chakra-ui/react";
import OrganizationForm from "./Form";
import * as Routes from "../../utils/routes";

import TrashedMessage from "@/components/TrashedMessage";
import { Card, CardBody, CardFooter, CardHeader, CardTitle } from "@saas-ui/react";

type IProps = {
  organization: any;
};
const EditIndex = ({ organization }: IProps) => {
  const editForm = useForm(`EditUser:${organization.id}`, organization);

  const organizationForm = {
    editForm,
  }

  const handleSubmit = useCallback(() => {
    if (organization.id) {
      editForm?.put(Routes.user(organization.id))
    }
  }, [editForm?.data])


  const restore = () => { };
  return (
    <>
      <Head title={`Edit${organization.name}`} />
      <Breadcrumb fontWeight="medium" fontSize="md" color="rgb(120 134 215)" _hover={{ color: "rgb(86 97 179)" }}>
        <BreadcrumbItem>
          <BreadcrumbLink href={Routes.users()}>Organizations</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink isCurrentPage>{organization?.name}</BreadcrumbLink>
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
        <Card maxW="1000" w="full" variant="solid" isHoverable>
          <CardHeader>
            <CardTitle fontSize="xl">Add a new Organization</CardTitle>
          </CardHeader>
          <CardBody>
            <OrganizationForm {...organizationForm} />
          </CardBody>
          <CardFooter>
            <Stack direction='row' spacing={4} align='center' justify="space-between">
              <Button
                colorScheme='teal'
                variant='outline'
                spinnerPlacement='start'
                onClick={() => { editForm?.reset() }}
              >
                reset
              </Button>
              <Button
                isLoading={editForm?.processing}
                loadingText='Loading'
                colorScheme='teal'
                variant='solid'
                spinnerPlacement='end'
                onClick={() => handleSubmit()}
              >
                Edit Organization
              </Button>
            </Stack>
          </CardFooter>
        </Card>
      </Flex>
      {organization.deleted_at && (
        <TrashedMessage restore={restore}>
          This organization has been deleted.
        </TrashedMessage>
      )}
    </>
  );
};

export default EditIndex;
