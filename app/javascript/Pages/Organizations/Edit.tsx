import React, { useCallback } from "react";
import { Head, useForm } from "@inertiajs/inertia-react";
import { Flex, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Stack, Button, Box, ButtonGroup, IconButton } from "@chakra-ui/react";
import OrganizationForm from "./Form";
import * as Routes from "../../utils/routes";

import TrashedMessage from "@/components/TrashedMessage";
import { Card, CardBody, CardFooter, CardHeader, CardTitle, DataTable, useModals } from "@saas-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Inertia } from "@inertiajs/inertia";

type IProps = {
  organization: any;
  contacts: []
};
const EditIndex = ({ organization, contacts }: IProps) => {
  const modals = useModals()

  const editForm = useForm(`EditUser:${organization.id}`, organization);

  const organizationForm = {
    editForm,
  }

  const handleSubmit = useCallback(() => {
    if (organization.id) {
      editForm?.put(Routes.user(organization.id))
    }
  }, [editForm?.data])

  const header = [
    {
      accessor: 'id',
      Header: 'Id',
    },
    {
      accessor: 'name',
      Header: 'Name',
    },
    {
      accessor: 'city',
      Header: 'City',
    },
    {
      accessor: 'phone',
      Header: 'Phone',
    },
  ]


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
        <Box overflowY="auto" borderRadius="1" bgColor="#ffffff" boxShadow="md">
          <DataTable
            columns={header}
            data={(contacts || []).map(v => ({
              ...v,
              action: <ButtonGroup variant="solid" size="sm" spacing={3}>
                <IconButton
                  colorScheme="green"
                  icon={<EditIcon />}
                  aria-label="Edit"
                  onClick={() => Inertia.get(Routes.edit_contact(v.id))}
                >
                </IconButton>
                <IconButton
                  colorScheme="red"
                  icon={<DeleteIcon />}
                  aria-label="Delete"
                  onClick={() =>
                    modals.confirm({
                      title: 'Delete user',
                      body: 'Are you sure you want to delete this user?',
                      confirmProps: {
                        colorScheme: 'red',
                        label: 'Delete',
                      },
                      onConfirm: () => {
                        Inertia.delete(Routes.organization(v.id))
                      }, // action
                    })
                  }
                />
              </ButtonGroup>
            }))}
            autoResetHiddenColumns={true}
            isSortable
          />
        </Box>
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
