import React, { useRef } from "react";
import { Flex, FormControl, FormLabel, Input, FormErrorMessage, Stack, Box, Button, Avatar, Icon } from "@chakra-ui/react";
import { useForm } from "@inertiajs/inertia-react";
import PasswordField from "@/components/passwordInput/PasswordField";
import FileUpload from "@/components/fileUpload/index";
import { Card, CardBody, CardFooter, CardHeader, CardTitle, Field, Form, FormLayout, Select } from "@saas-ui/react";
import * as Routes from "../../utils/routes";

type IProps = {
  userForm: any;
};

const UserForm = ({ userForm }: IProps) => {
  const formRef = useRef(null)
  const { data, post, setData, processing, errors, reset } = useForm({ ...userForm });
  const handValue = (e, name) => {
    const value = e.target.value;
    setData(name, value);
  };

  const postData = () => {
    post("/users", {
      preserveScroll: true,
    })
  }

  const fileProps = {
    setData,
    label: "Photo",
    errors,
    photo: data.photo,
    type: "file",
  };

  const saveHandler = () => {

  }

  return (
    <Card maxW="1000" w="full" variant="solid" isHoverable>
      <CardHeader>
        <CardTitle fontSize="xl">Add a new user</CardTitle>
      </CardHeader>
      <CardBody>
        <Form ref={formRef} onSubmit={saveHandler}>
          <FormLayout>
            <FormLayout columns={2}>
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
                  onChange={e => handValue(e, "first_name")}
                />
                <FormLabel ms="4px" fontSize="sm" fontWeight="normal" htmlFor="login">
                  First name
                </FormLabel>
                {errors.first_name && <FormErrorMessage>{errors.first_name}</FormErrorMessage>}
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
                  onChange={e => handValue(e, "last_name")}
                />
                <FormLabel ms="4px" fontSize="sm" fontWeight="normal" htmlFor="login">
                  Last name
                </FormLabel>
                {errors.last_name && <FormErrorMessage>{errors.last_name}</FormErrorMessage>}
              </FormControl>
            </FormLayout>
            <FormLayout columns={2}>
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
                  onChange={e => handValue(e, "email")}
                />
                <FormLabel ms="4px" fontSize="sm" fontWeight="normal" htmlFor="login">
                  Email
                </FormLabel>
                {errors.email && <FormErrorMessage>{errors.email}</FormErrorMessage>}
              </FormControl>
              <PasswordField password={data?.password} handValue={e => handValue(e, "password")} ref={undefined} isConfirm={false} />
            </FormLayout>
            <FormLayout columns={2}>
              <Select
                name="owner"
                placeholder={data.owner ? data.owner : "Select a Role"}
                options={[
                  { label: 'Yes', value: 'true' },
                  { label: 'No', value: 'false' },
                ]}
                size="md"
                onChange={(value) => handValue(value, "role")}
                renderValue={(value?: string[]) => data.owner ? value?.[0] : ""}
              />
              <FormControl>
                <FormLabel
                  fontSize="sm"
                  fontWeight="md"
                  color="gray.700"
                  _dark={{
                    color: "gray.50",
                  }}
                >
                  Photo
                </FormLabel>
                <Flex alignItems="center" mt={1}>
                  <Avatar
                    boxSize={12}
                    bg="gray.100"
                    _dark={{
                      bg: "gray.800",
                    }}
                    src='https://bit.ly/broken-link'
                  />
                  <Button
                    type="button"
                    ml={5}
                    variant="outline"
                    size="sm"
                    fontWeight="medium"
                    _focus={{
                      shadow: "none",
                    }}
                  >
                    Change
                  </Button>
                </Flex>
              </FormControl>
            </FormLayout>
          </FormLayout>
        </Form>
      </CardBody>
      <CardFooter>
        <Button variant="solid" colorScheme="gray">
          Continue
        </Button>
        <Button>Dismiss</Button>
      </CardFooter>
    </Card>

    // </Box>
    // <Form ref={formRef} onSubmit={saveHandler}>

    //   <SimpleGrid columns={2} spacing={10}>
    //     <FormControl variant="floating" isRequired>
    //       <Input
    //         autoFocus={true}
    //         borderRadius="15px"
    //         fontSize="sm"
    //         mb="36px"
    //         variant="filled"
    //         type="text"
    //         placeholder=" "
    //         size="lg"
    //         value={data?.first_name}
    //         name="first_name"
    //         onChange={e => handValue(e, "first_name")}
    //       />
    //       <FormLabel ms="4px" fontSize="sm" fontWeight="normal" htmlFor="login">
    //         First name
    //       </FormLabel>
    //       {errors.first_name && <FormErrorMessage>{errors.first_name}</FormErrorMessage>}
    //     </FormControl>
    //     <FormControl variant="floating">
    //       <Input
    //         autoFocus={true}
    //         borderRadius="15px"
    //         fontSize="sm"
    //         mb="36px"
    //         variant="filled"
    //         type="text"
    //         placeholder=" "
    //         size="lg"
    //         value={data?.last_name}
    //         name="last_name"
    //         onChange={e => handValue(e, "last_name")}
    //       />
    //       <FormLabel ms="4px" fontSize="sm" fontWeight="normal" htmlFor="login">
    //         Last name
    //       </FormLabel>
    //       {errors.last_name && <FormErrorMessage>{errors.last_name}</FormErrorMessage>}
    //     </FormControl>
    //     <FormControl variant="floating">
    //       <Input
    //         autoFocus={true}
    //         borderRadius="15px"
    //         fontSize="sm"
    //         mb="36px"
    //         variant="filled"
    //         type="email"
    //         placeholder=" "
    //         size="lg"
    //         value={data?.email}
    //         name="email"
    //         onChange={e => handValue(e, "email")}
    //       />
    //       <FormLabel ms="4px" fontSize="sm" fontWeight="normal" htmlFor="login">
    //         Email
    //       </FormLabel>
    //       {errors.email && <FormErrorMessage>{errors.email}</FormErrorMessage>}
    //     </FormControl>
    //     <PasswordField password={data?.password} handValue={e => handValue(e, "password")} ref={undefined} isConfirm={false} />
    //     <FormControl>
    //       <FormLabel htmlFor="owner">Owner</FormLabel>
    //       <Select placeholder="Select yes or no owner" onChange={e => handValue(e, "owner")} value={data?.owner}>
    //         <option value="true">Yes</option>
    //         <option value="false">No</option>
    //       </Select>
    //       {errors.owner && <FormErrorMessage>{errors.owner}</FormErrorMessage>}
    //     </FormControl>
    //     <FileUpload {...fileProps}></FileUpload>
    //   </SimpleGrid>
    // </Form>
  );
};

export default UserForm;
