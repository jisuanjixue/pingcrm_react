import React from 'react';
import { Head, Link } from "@inertiajs/inertia-react"
import { Box, Button, Flex, FormControl, FormLabel, HStack, Avatar, Input, Select, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons'
import { useFormik } from "formik";
import pickBy from 'lodash/pickBy';
import { Inertia } from '@inertiajs/inertia'
import * as Routes from "../../utils/routes";


import { UserInfo, Filters, Can } from "../../data-types/user"
type IProps = {
  users: UserInfo[];
  filters: Filters;
  can: Can
}

const Index = ({ users, filters, can }: IProps) => {
  const query = (values) => {
    let query = pickBy(values);
    Inertia.get(
      Routes.users(
        Object.keys(query).length ? query : { remember: 'forget' },
      ),
      {},
      {
        preserveState: true,
        preserveScroll: true,
        replace: true,
        only: ['users'],
      },
    );
  }
  // const [form, setForm] = useControllableState({ defaultValue: filters })
  const formik = useFormik({
    initialValues: filters,
    onSubmit: (values) => query(values),
    onReset: (values) => query(values)
  });
  const header = ["Name", "Email", "Role"]

  return (
    <>
      <Head title="Users" />
      <h1 mb={32} fontSize={30} lineHeight={36} fontWeight={700}>Users</h1>
      <Flex mb={24} alignItems="center" justifyContent="space-between">
        <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
          <HStack spacing={8}>
            <FormControl>
              <FormLabel htmlFor="role">role</FormLabel>
              <Select placeholder='Select role' id='role' name='role'
                onChange={formik.handleChange}
                value={formik.values.role}
              >
                <option value='null' />
                <option value='user'>User</option>
                <option value='owner'>Owner</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="trashed">trash</FormLabel>
              <Select placeholder='Select Trashed' id='Trashed' name='Trashed'
                onChange={formik.handleChange}
                value={formik.values.trashed}
              >
                <option value='null' />
                <option value='with'>With Trashed</option>
                <option value='only'>Only Trashed</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="search">search</FormLabel>
              <Input
                id="search"
                name="search"
                type="search"
                variant="filled"
                onChange={formik.handleChange}
                value={formik.values.search}
              />
            </FormControl>
            <Button type="submit" colorScheme="purple" width="full">
              inquire
            </Button>
            <Button type="reset" colorScheme="purple" width="full">
              reset
            </Button>
          </HStack>
        </form>
        <Link
          v-if="can.create_user"
          class="btn-indigo"
          href={Routes.new_user()}
        >
          Create <span display={{ base: "none", md: "inline" }}>User</span>
        </Link>
      </Flex>
      <Box overflowY="auto" borderRadius={4} bgColor="#ffffff" boxShadow='md'>
        <Table
          w="full"
          bg="white"
          _dark={{
            bg: "gray.800",
          }}
          display={{
            base: "block",
            md: "table",
          }}
          sx={{
            "@media print": {
              display: "table",
            },
          }}
          whiteSpace="nowrap"
        >
          <Thead
            display={{
              base: "none",
              md: "table-header-group",
            }}
            sx={{
              "@media print": {
                display: "table-header-group",
              },
            }}
          >
            <Tr textAlign="left" fontWeight={700}>
              {header.map((x) => (
                <Th key={x}>{x}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody
            display={{
              base: "block",
              lg: "table-row-group",
            }}
            sx={{
              "@media print": {
                display: "table-row-group",
              },
            }}
          >
            {users?.map((item, index) => {
              return (
                <Tr
                  key={index}
                  display={{
                    base: "grid",
                    md: "table-row",
                  }}
                  sx={{
                    "@media print": {
                      display: "table-row",
                    },
                    gridTemplateColumns: "minmax(0px, 35%) minmax(0px, 65%)",
                    gridGap: "10px",
                  }}
                  _focusWithin={{ backgroundColor: "(rgb(241 245 249 )" }}
                  _hover={{ backgroundColor: "(rgb(241 245 249 )" }}
                >
                  {Object.keys(item).map((x, i) => {
                    return (
                      <React.Fragment key={`${index}${x}`}>
                        <Td
                          display={{
                            base: "table-cell",
                            md: "none",
                          }}
                          sx={{
                            "@media print": {
                              display: "none",
                            },
                            textTransform: "uppercase",
                            color: "#fff",
                            fontSize: "xs",
                            fontWeight: "bold",
                            letterSpacing: "wider",
                            fontFamily: "heading",
                          }}
                        >
                          {x}
                        </Td>
                        <Td
                          fontSize="md"
                          fontWeight="hairline"
                        >
                          <Link
                            class="flex items-center px-6 py-4 focus:text-indigo-500"
                            href={Routes.edit_user(item.id)}
                            aria-label="Edit"
                          >
                            {(i === 0 && item.photo) && <Avatar name='Photo' mt={-8} mb={-8} size='sm' src={item.photo} />}
                            {item[x]}
                            {(i === 0 && item.deleted_at) && <DeleteIcon w={12} h={12} fill="#64748b" flexShrink={0} ml={8} />}
                          </Link>
                        </Td>
                      </React.Fragment>
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>
    </>
  )
}

export default Index