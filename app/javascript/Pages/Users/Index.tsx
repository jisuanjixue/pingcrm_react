import React from 'react';
import { Head, Link, useForm } from "@inertiajs/inertia-react"
import { Box, Button, Flex, FormControl, FormLabel, HStack, Avatar, Input, Select, Table, Tbody, Td, Th, Thead, Tr, Text, FormErrorMessage, FormHelperText } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons'
import pickBy from 'lodash/pickBy';
import * as Routes from "../../utils/routes";

import { UserInfo, Filters, Can } from "@/data-types/user"
type IProps = {
  users: UserInfo[];
  filters: Filters;
  can: Can
}

const Index = ({ users, filters, can }: IProps) => {
  const { data, get, setData, processing, errors, reset } = useForm(filters)

  const query = () => {
    let query = pickBy(data);
    get(
      Routes.users(
        Object.keys(query).length ? query : { remember: 'forget' },
      ),
      {
        preserveState: true,
        preserveScroll: true,
        replace: true,
        only: ['users'],
      },
    )
  }

  const header = ["Name", "Email", "Role"]

  const handleSubmit = (e) => {
    e.preventDefault()
    query()
  }

  const handleReset = (e) => {
    e.preventDefault()
    reset()
    query()
  }

  const handleChange = (e, name) => {
    const value = e.target.value
    setData(name, value)
  }

  return (
    <>
      <Head title="Users" />
      <Text mb={32} fontSize={30} lineHeight={36} fontWeight={700}>Users</Text>
      <Flex mb={24} alignItems="center" justifyContent="space-between">
        <form onSubmit={handleSubmit} onReset={handleReset}>
          <HStack spacing={8}>
            <FormControl>
              <FormLabel htmlFor="role">role</FormLabel>
              <Select placeholder='Select role'
                onChange={(e) => handleChange(e, "role")}
                value={data.role}
              >
                <option value='null' />
                <option value='user'>User</option>
                <option value='owner'>Owner</option>
              </Select>
              {errors.role && (
                <FormHelperText>
                  {errors.role}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="trashed">trash</FormLabel>
              <Select placeholder='Select Trashed'
                onChange={(e) => handleChange(e, "trashed")}
                value={data.trashed}
              >
                <option value='null' />
                <option value='with'>With Trashed</option>
                <option value='only'>Only Trashed</option>
              </Select>
              {errors.trashed && (
                <FormHelperText>
                  {errors.trashed}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="search">search</FormLabel>
              <Input
                type="search"
                variant="filled"
                onChange={(e) => handleChange(e, "search")}
                value={data.search}
              />
              {errors.search && (
                <FormHelperText>
                  {errors.search}
                </FormHelperText>
              )}
            </FormControl>
            <Button type="submit" colorScheme="purple" width="full" disabled={processing}>
              inquire
            </Button>
            <Button type="reset" colorScheme="purple" width="full">
              reset
            </Button>
          </HStack>
        </form>
        {can.create_user &&
          <Link href={Routes.new_user()} as="button" type="button" colorScheme='teal' variant='solid' size='md' data>Create User</Link>}
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
                          <Box display="flex" alignItems="center" pr={24} pl={24} pb={16} pt={16} _focus={{ color: "rgb(101 116 205)" }}>
                            <Link
                              href={Routes.edit_user(item.id)}
                              aria-label="Edit"
                            >
                              {(i === 0 && item.photo) && <Avatar name='Photo' mt={-8} mb={-8} size='sm' src={item.photo} />}
                              {item[x]}
                              {x === "owner" && item[x] ? 'Owner' : 'User'}
                              {(i === 0 && item.deleted_at) && <DeleteIcon w={12} h={12} fill="#64748b" flexShrink={0} ml={8} />}
                            </Link>
                          </Box>
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