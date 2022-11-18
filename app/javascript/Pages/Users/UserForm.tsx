import React, { useCallback } from "react";
import { FormControl, FormLabel, Input, FormErrorMessage, Stack, Button } from "@chakra-ui/react";
import { useForm } from "@inertiajs/inertia-react";
import PasswordField from "@/components/passwordInput/PasswordField";
// import FileUpload from "@/components/fileUpload/index";
import { Card, CardBody, CardFooter, CardHeader, CardTitle, FormLayout, Select } from "@saas-ui/react";
import * as Routes from "../../utils/routes";


const UserForm: React.FC = (userForm: any) => {
  const { data, setData, post, put, processing, errors, reset, progress } = useForm({ ...userForm });
  const handValue = useCallback((e, name) => {
    const value = (() => {
      if (name === "photo") return e?.target?.files?.[0]
      else if (name === "owner") return e === "0" ? true : false
      return e.target.value
    })();
    setData(name, value);
  }, [data])


  const fileProps = {
    handValue,
    label: "Photo",
    errors,
    photo: data.photo,
    type: "file",
    progress
  };


  const handleSubmit = useCallback(() => {
    if (data.id) {
      put(Routes.user(data.id), {
        onSuccess: () => reset('password', 'photo'),
      })
    } else {
      post(Routes.users(), {
        preserveScroll: true,
      })
    }
  }, [data])

  return (
    <Card maxW="1000" w="full" variant="solid" isHoverable>
      <CardHeader>
        <CardTitle fontSize="xl">Add a new user</CardTitle>
      </CardHeader>
      <CardBody>
        <form>
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
                placeholder={data.owner ? data.owner : "Select"}
                options={[
                  { label: 'Yes', value: '0' },
                  { label: 'No', value: '1' },
                ]}
                size="md"
                onChange={(value) => handValue(value, "owner")}
                renderValue={(value?: string[]) => data.owner ? value?.[0] : ""}
              />
              {/* <FileUpload {...fileProps}></FileUpload> */}
            </FormLayout>
          </FormLayout>
        </form>
      </CardBody>
      <CardFooter>
        <Stack direction='row' spacing={4} align='center' justify="space-between">
          <Button
            colorScheme='teal'
            variant='outline'
            spinnerPlacement='start'
            onClick={() => { reset() }}
          >
            reset
          </Button>
          <Button
            isLoading={processing}
            loadingText='Loading'
            colorScheme='teal'
            variant='solid'
            spinnerPlacement='end'
            onClick={() => handleSubmit()}
          >
            {data.id ? "Edit User" : "Create User"}
          </Button>
        </Stack>
      </CardFooter>
    </Card >
  );
};

export default UserForm;
