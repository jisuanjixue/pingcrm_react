import React, { useRef } from "react";
import { Head, Link, useForm } from "@inertiajs/inertia-react";
import { Box, Button, Flex, HStack, Avatar, Text, FormHelperText, AvatarBadge, ButtonGroup, IconButton, Stack } from "@chakra-ui/react";
import { AddIcon, DeleteIcon, EditIcon, TimeIcon, WarningIcon } from "@chakra-ui/icons";
import {
  DataTable,
  EmptyState,
  Form,
  FormLayout,
  SearchInput,
  Select,
  useModals
} from '@saas-ui/react';
import pickBy from "lodash/pickBy";
import * as Routes from "../../utils/routes";

import { Contacts, Filters } from "@/data-types/contacts";
import { Inertia } from "@inertiajs/inertia";

type IProps = {
  contacts: {
    data: Contacts["data"][];
    meta: Contacts["meta"]
  };
  filters: Filters;
};

const Index = ({ contacts }: IProps) => {
  const modals = useModals()
  const defaultFilterData: Filters = {
    search: '',
    trashed: '',
  }
  const { data, get, setData, processing, errors, reset } = useForm(defaultFilterData);


  const tableRef = useRef(null) as any

  const query = () => {
    const query = pickBy(data);
    get(Routes.contacts(Object.keys(query).length ? query : { remember: "forget" }), {
      preserveState: true,
      preserveScroll: true,
      replace: true,
      only: ["contacts"],
    });
  };

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
      accessor: 'organization',
      Header: 'Organization',
    },
    {
      accessor: 'city',
      Header: 'City',
    },
    {
      accessor: 'phone',
      Header: 'Phone',
    },
    {
      accessor: 'action',
      Header: 'Action',
    },
  ];

  const handleSubmit = () => {
    query();
  };

  const handleReset = e => {
    e.preventDefault();
    // reset() is not here, in button onClick function
    query();
  };

  const handleChange = (value, name) => {
    setData(name, value);
  };


  return (
    <>
      <Head title="Contacts" />
      <Text mb="8" fontSize="3xl" lineHeight="3xl" fontWeight={700}>
        Contacts
      </Text>
      <Flex mb="6" alignItems="center" justifyContent="space-between">
        <Form onSubmit={handleSubmit} onReset={handleReset}>
          <FormLayout columns={[1, null, 6]}>
            <Select
              name="trashed"
              placeholder="Select Trashed"
              options={[
                { label: 'With Trashed', value: 'with' },
                { label: 'Only Trashed', value: 'only' },
              ]}
              onChange={(value) => handleChange(value, "trashed")}
              renderValue={(value?: string[]) => data.trashed ? value?.[0] : ""}
              size="md"
            />
            {errors.trashed && <FormHelperText>{errors.trashed}</FormHelperText>}
            <SearchInput
              placeholder="Search"
              value={data.search}
              onChange={(e) => handleChange(e.target.value, "search")}
              onReset={() => handleChange('', "search")}
            />
            <Button type="submit" colorScheme="facebook" width="full" disabled={processing}>
              inquire
            </Button>
            <Button type="reset" colorScheme="gray" width="full" onClick={() => { reset() }}>
              reset
            </Button>
          </FormLayout>
        </Form>
      </Flex>
      <HStack mb="2" spacing="900">
        <Button
          onClick={() =>
            tableRef.current.toggleAllRowsSelected(
              !tableRef.current.isAllRowsSelected
            )
          }
        >
          Select all rows
        </Button>
        <Button leftIcon={<AddIcon />} colorScheme='teal' variant='solid'>
          <Link href={Routes.new_contact()}>
            Create Contact
          </Link>
        </Button>
      </HStack>
      <Box overflowY="auto" borderRadius="1" bgColor="#ffffff" boxShadow="md">
        {contacts?.data.length > 0 ? (
          <DataTable
            ref={tableRef}
            columns={header}
            data={contacts?.data.map(v => ({
              ...v,
              organization: v.organization.name,
              name: <HStack spacing='24px'>
                <Box w='40px' h='40px' bg='yellow.200'>
                  {v.name}
                </Box>
                <Box w='40px' h='40px' bg='tomato'>
                  <IconButton
                    colorScheme="red"
                    variant="outline"
                    icon={<DeleteIcon />}
                    aria-label="Delete"
                  />
                </Box>
              </HStack>,
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
                      title: 'Delete contact',
                      body: 'Are you sure you want to delete this contact?',
                      confirmProps: {
                        colorScheme: 'red',
                        label: 'Delete',
                      },
                      onConfirm: () => {
                        Inertia.delete(Routes.contact(v.id))
                      }, // action
                    })
                  }
                />
              </ButtonGroup>
            }))}
            autoResetHiddenColumns={true}
            isSortable
            isSelectable
            onSelectedRowsChange={(selected) => console.log(selected)}
            onSortChange={(column) => console.log(column)}
          />
        ) : (
          <EmptyState
            colorScheme="primary"
            icon={WarningIcon}
            title="No contacts yet"
            description="You haven't create any contacts yet."
            actions={
              <>
                <Button colorScheme='teal' variant='solid' onClick={() => Inertia.get(Routes.new_contact())} >Create contacts</Button>
                <Button variant="ghost">Back</Button>
              </>
            }
          />
        )}
      </Box>
    </>
  );
};
export default Index;
