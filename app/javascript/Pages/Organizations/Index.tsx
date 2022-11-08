import React, { forwardRef, useCallback, useMemo, useRef } from "react";
import { Head, Link, useForm } from "@inertiajs/inertia-react";
import { Box, Button, Flex, HStack, Avatar, Text, FormHelperText, ButtonGroup, IconButton, Stack, useDisclosure, useControllableState, useToast } from "@chakra-ui/react";
import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  DataTable,
  Form,
  FormDialog,
  FormLayout,
  SearchInput,
  Select,
  useModals
} from '@saas-ui/react'
import pickBy from "lodash/pickBy";
import * as Routes from "../../utils/routes";
import OrganizationForm from "./Form"
import Pagination from "@choc-ui/paginator";

import { Organizations, Filters } from "@/data-types/organizations";
import { Inertia } from "@inertiajs/inertia";

type IProps = {
  organizations: {
    data: Organizations["data"][];
    meta: Organizations["meta"]
  };
  filters: Filters;
};

const Index = ({ organizations, filters }: IProps) => {
  const modals = useModals()
  const toast = useToast();
  const [current, setCurrent] = useControllableState({ defaultValue: 1 })
  const disclosure = useDisclosure()
  const initialRef = useRef(null)
  const tableRef = useRef(null) as any
  const defaultFilterData: Filters = {
    search: '',
    trashed: '',
  };

  const pageSize = 10;
  const offset = (current - 1) * pageSize;
  const organizationsData = organizations?.data.slice(offset, offset + pageSize);

  const { data, get, setData, processing, errors, reset } = useForm(defaultFilterData);
  const addForm = useForm('CreateUser', {});

  const organizationForm = {
    editForm: addForm,
  }

  const url = (pageNumber: string) => pageNumber ? organizations.meta.scaffold_url.replace(/__pagy_page__/, pageNumber) : null
  // const active = (pageNumber: string) => organizations.meta.page == pageNumber

  const Prev = forwardRef((props, ref) => (
    <Button ref={ref} {...props} onClick={() => Inertia.get(url(organizations?.meta?.prev))} >
      Prev
    </Button>
  ));
  const Next = forwardRef((props, ref) => (
    <Button ref={ref} {...props} onClick={() => Inertia.get(url(organizations?.meta?.next))}>
      Next
    </Button>
  ));

  const itemRender = (_, type) => {
    if (type === "prev") {
      return Prev;
    }
    if (type === "next") {
      return Next;
    }
  };

  // const links = useMemo(() => [
  //   {
  //     label: 'Previous',
  //     url: url(organizations.meta.prev),
  //   },
  //   ...organizations.meta.sequels['0'].map((page) => {
  //     return {
  //       label: page,
  //       url: url(page),
  //       active: active(page),
  //     };
  //   }),
  //   {
  //     label: 'Next',
  //     url: url(organizations.meta.next),
  //   },
  // ], [organizations.meta])


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

  const handleSaveSubmit = useCallback(() => {
    addForm?.post(Routes.organizations(), {
      onSuccess: () => {
        addForm?.reset()
      },
      preserveScroll: true,
    })
  }, [addForm?.data])

  const onSaveSubmit = () => {
    handleSaveSubmit()
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
      accessor: 'city',
      Header: 'City',
    },
    {
      accessor: 'phone',
      Header: 'Phone',
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
        <Button leftIcon={<AddIcon />} colorScheme='teal' variant='solid' onClick={() => disclosure.onOpen()}>
          Create Organization
        </Button>
      </HStack>
      <Box overflowY="auto" borderRadius="1" bgColor="#ffffff" boxShadow="md">
        <DataTable
          ref={tableRef}
          columns={header}
          data={(organizationsData || []).map(v => ({
            ...v,
            action: <ButtonGroup variant="solid" size="sm" spacing={3}>
              <IconButton
                colorScheme="green"
                icon={<EditIcon />}
                aria-label="Edit"
                onClick={() => Inertia.get(Routes.edit_organization(v.id))}
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
          isSelectable
          onSelectedRowsChange={(selected) => console.log(selected)}
          onSortChange={(column) => console.log(column)}
        />
        <Flex
          w="full"
          bg={"gray.400"}
          _dark={{
            bg: "gray.600",
          }}
          p={50}
          alignItems="center"
          justifyContent="center"
        >
          <Pagination
            defaultCurrent={1}
            current={current}
            onChange={(page: number) => {
              setCurrent(page);
              toast({
                title: "Pagination.",
                description: `You changed to page ${page}`,
                variant: "solid",
                duration: 9000,
                isClosable: true,
                position: "top-right"
              });
            }}
            pageSize={pageSize}
            total={organizations?.data.length}
            itemRender={itemRender}
            paginationProps={{
              display: "flex",
              pos: "absolute",
              left: "50%",
              transform: "translateX(-50%)"
            }}
            colorScheme="red"
            focusRing="green"
          />
        </Flex>
      </Box>
      <FormDialog
        title="New Organization info"
        defaultValues={{ title: '' }}
        {...disclosure}
        onSubmit={onSaveSubmit}
        initialFocusRef={initialRef}
      >
        <OrganizationForm {...organizationForm}></OrganizationForm>
      </FormDialog>
    </>
  )
};

export default Index;

