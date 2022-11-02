import React, { useRef } from "react";
import { Head, Link, useForm } from "@inertiajs/inertia-react";
import { Box, Button, Flex, HStack, Avatar, Text, FormHelperText, AvatarBadge, ButtonGroup, IconButton, Stack } from "@chakra-ui/react";
import { AddIcon, DeleteIcon, EditIcon, TimeIcon } from "@chakra-ui/icons";
import {
  DataTable,
  Form,
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

import { UserInfo, Filters, Can } from "@/data-types/user";
import { Inertia } from "@inertiajs/inertia";

type IProps = {
  users: UserInfo[];
  filters: Filters;
  can: Can;
};

const Index = ({ users, can }: IProps) => {
  const modals = useModals()

  const defaultFilterData: Filters = {
    search: '',
    trashed: '',
    role: ''
  }
  const { data, get, setData, processing, errors, reset } = useForm(defaultFilterData);


  const tableRef = useRef(null) as any

  const query = () => {
    const query = pickBy(data);
    get(Routes.users(Object.keys(query).length ? query : { remember: "forget" }), {
      preserveState: true,
      preserveScroll: true,
      replace: true,
      only: ["users"],
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
      <Head title="Users" />
      <Text mb="8" fontSize="3xl" lineHeight="3xl" fontWeight={700}>
        Users
      </Text>
      <Flex mb="6" alignItems="center" justifyContent="space-between">
        <Form onSubmit={handleSubmit} onReset={handleReset}>
          <FormLayout columns={[1, null, 6]}>
            <Select
              name="role"
              placeholder={data.role ? data.role : "Select a Role"}
              options={[
                { label: 'User', value: 'user' },
                { label: 'Owner', value: 'owner' },
              ]}
              size="md"
              onChange={(value) => handleChange(value, "role")}
              renderValue={(value?: string[]) => data.role ? value?.[0] : ""}
            />
            {errors.role && <FormHelperText>{errors.role}</FormHelperText>}
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
        {can.create_user && (
          <Button leftIcon={<AddIcon />} colorScheme='teal' variant='solid'>
            <Link href={Routes.new_user()}>
              Create User
            </Link>
          </Button>
        )}
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
                onClick={() => Routes.edit_user(v.id)}
              />
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
    </>
  );
};

export default Index;
