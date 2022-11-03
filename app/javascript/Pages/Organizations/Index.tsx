import React, { useRef } from "react";
import { Head, Link, useForm } from "@inertiajs/inertia-react";
import { Box, Button, Flex, HStack, Avatar, Text, FormHelperText, AvatarBadge, ButtonGroup, IconButton, Stack, useDisclosure } from "@chakra-ui/react";
import { AddIcon, DeleteIcon, EditIcon, TimeIcon } from "@chakra-ui/icons";
import {
  DataTable,
  Form,
  FormDialog,
  FormLayout,
  PersonaContainer,
  PersonaDetails,
  PersonaLabel,
  PersonaSecondaryLabel,
  PersonaTertiaryLabel,
  SearchInput,
  Select,
  useModals
} from '@saas-ui/react'
import pickBy from "lodash/pickBy";
import * as Routes from "../../utils/routes";
import Form from "./Form"

import { Organizations, Filters } from "@/data-types/organizations";

type IProps = {
  organizations: Organizations[];
  filters: Filters;
};

const Index = ({ organizations, filters }: IProps) => {
  const disclosure = useDisclosure()
  const initialRef = useRef(null)
  const tableRef = useRef(null) as any
  const defaultFilterData: Filters = {
    search: '',
    trashed: '',
  }
  const { data, get, setData, processing, errors, reset } = useForm(defaultFilterData);
  const addForm = useForm('CreateUser', organization);
  const editForm = useForm(`EditUser:${user.id}`, organization);


  const query = () => {
    const query = pickBy(data);
    get(Routes.organizations(Object.keys(query).length ? query : { remember: "forget" }), {
      preserveState: true,
      preserveScroll: true,
      replace: true,
      only: ["organizations"],
    });
  };

  const handleSubmit = () => {
    query();
  };

  const onSaveSubmit = () => {
    disclosure.onClose()
  }

  const handleReset = e => {
    e.preventDefault();
    // reset() is not here, in button onClick function
    query();
  };

  const handleChange = (value, name) => {
    setData(name, value);
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
      accessor: 'email',
      Header: 'Email',
    },
    {
      accessor: 'role',
      Header: 'Role',
    },
    {
      accessor: 'action',
      Header: 'Action',
    },
  ];


  return (
    <>
      <Head title="Organizations" />
      <Text mb="8" fontSize="3xl" lineHeight="3xl" fontWeight={700}>
        Organization
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
          <Button leftIcon={<AddIcon />} colorScheme='teal' variant='solid' onClick={() => disclosure.onOpen()}>
            Create Organization
          </Button>
          <FormDialog
            title="New Organization info"
            defaultValues={{ title: '' }}
            {...disclosure}
            onSubmit={onSaveSubmit}
            initialFocusRef={initialRef}
          >
            <FormLayout>
              {/* <Field
                name="category"
                label="Category"
                type="select"
                options={[
                  {
                    value: 'general',
                    label: 'General',
                  },
                ]}
                ref={initialRef}
              />
              <Field
                name="title"
                label="Title"
                rules={{ required: 'Title is required' }}
              />
              <Field name="description" type="textarea" label="Description" /> */}
            </FormLayout>
          </FormDialog>
        </HStack>
        <Box overflowY="auto" borderRadius="1" bgColor="#ffffff" boxShadow="md">
          <DataTable
            ref={tableRef}
            columns={header}
            data={users.map(v => ({
              ...v,
              name: <PersonaContainer size="lg">
                <Avatar name={v.name} src={v?.photo}>
                  <AvatarBadge boxSize="1em" bg="presence.away">
                    <TimeIcon />
                  </AvatarBadge>
                </Avatar>
                <PersonaDetails>
                  <PersonaLabel>{v.name}</PersonaLabel>
                  {v.deleted_at && <PersonaSecondaryLabel>
                    <IconButton
                      colorScheme="red"
                      variant="outline"
                      icon={<DeleteIcon />}
                      aria-label="Delete"
                    /> delete</PersonaSecondaryLabel>}
                  <PersonaTertiaryLabel>can edit: {v.can?.edit_user ? "yes" : "no"}</PersonaTertiaryLabel>
                </PersonaDetails>
              </PersonaContainer>,
              role: v.owner ? "Owner" : "User",
              action: <ButtonGroup variant="solid" size="sm" spacing={3}>
                <IconButton
                  colorScheme="green"
                  icon={<EditIcon />}
                  aria-label="Edit"
                  onClick={() => Inertia.get(Routes.edit_user(v.id))}
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
                        Inertia.delete(Routes.user(v.id))
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
        </Box>
      </Flex>
    </>
  )
};

export default Index;

