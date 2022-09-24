import { Flex, FormControl, FormLabel, Input, SimpleGrid, Spacer } from "@chakra-ui/react";
import { useForm } from "@inertiajs/inertia-react";
import React from "react";

type IProps = {
  userForm: any
}

const UserForm = ({ userForm }: IProps) => {
  const { data, get, setData, processing, errors, reset } = useForm({})
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
            value={userForm?.first_name}
            name="first_name"
            onChange={(e) => handValue(e)}
          />
          <FormLabel
            ms="4px"
            fontSize="sm"
            fontWeight="normal"
            htmlFor="login"
          >
            First name
          </FormLabel>
          {/* {errors.email && (
            <FormErrorMessage>{errors.email}</FormErrorMessage>
          )} */}
        </FormControl>
        {/* <Box w='170px' h='10' bg='red.500' /> */}

      </SimpleGrid>
    </form>
  );
}

export default UserForm