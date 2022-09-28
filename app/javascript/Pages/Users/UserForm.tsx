import { Flex, FormControl, FormLabel, Input, SimpleGrid, Spacer, FormErrorMessage, Select } from "@chakra-ui/react";
import { useForm } from "@inertiajs/inertia-react";
import React from "react";
import PasswordField from '../../components/passwordInput/PasswordField';

type IProps = {
  userForm: any
}

const UserForm = ({ userForm }: IProps) => {
  const { data, get, setData, processing, errors, reset } = useForm({ ...userForm })
  const handValue = (e, name) => {
    const value = e.target.value
    setData(name, value)
  }

  return (
    <form>
      <SimpleGrid columns={2} spacing={10}>
        <FormControl variant="floating" isRequired>
          <Input
            autoFocus={true}
            borderRadius="15px"
            fontSize="sm"
            mb="36px"
            variant="filled"
            type="text"
            placeholder=" "
            size="lg"
            value={data?.first_name}
            name="first_name"
            onChange={(e) => handValue(e, "first_name")}
          />
          <FormLabel
            ms="4px"
            fontSize="sm"
            fontWeight="normal"
            htmlFor="login"
          >
            First name
          </FormLabel>
          {errors.first_name && (
            <FormErrorMessage>{errors.first_name}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl variant="floating">
          <Input
            autoFocus={true}
            borderRadius="15px"
            fontSize="sm"
            mb="36px"
            variant="filled"
            type="text"
            placeholder=" "
            size="lg"
            value={data?.last_name}
            name="last_name"
            onChange={(e) => handValue(e, "last_name")}
          />
          <FormLabel
            ms="4px"
            fontSize="sm"
            fontWeight="normal"
            htmlFor="login"
          >
            Last name
          </FormLabel>
          {errors.last_name && (
            <FormErrorMessage>{errors.last_name}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl variant="floating">
          <Input
            autoFocus={true}
            borderRadius="15px"
            fontSize="sm"
            mb="36px"
            variant="filled"
            type="email"
            placeholder=" "
            size="lg"
            value={data?.email}
            name="email"
            onChange={(e) => handValue(e, "email")}
          />
          <FormLabel
            ms="4px"
            fontSize="sm"
            fontWeight="normal"
            htmlFor="login"
          >
            Email
          </FormLabel>
          {errors.email && (
            <FormErrorMessage>{errors.email}</FormErrorMessage>
          )}
        </FormControl>
        <PasswordField
          password={data?.password}
          handValue={(e) => handValue(e, "password")}
          ref={undefined}
          isConfirm={false}
        />
        <FormControl>
          <FormLabel htmlFor="owner">Owner</FormLabel>
          <Select placeholder='Select yes or no owner'
            onChange={(e) => handValue(e, "owner")}
            value={data?.owner}
          >
            <option value='true'>Yes</option>
            <option value='false'>No</option>
          </Select>
          {errors.owner && (
            <FormErrorMessage>
              {errors.owner}
            </FormErrorMessage>
          )}
        </FormControl>

      </SimpleGrid>
    </form>
  );
}

export default UserForm