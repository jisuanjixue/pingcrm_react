import React, { useCallback } from "react";
import { FormControl, FormLabel, Input, FormErrorMessage, Stack, Button } from "@chakra-ui/react";
import { useForm } from "@inertiajs/inertia-react";
import PasswordField from "@/components/passwordInput/PasswordField";
// import FileUpload from "@/components/fileUpload/index";
import { FormLayout, Select } from "@saas-ui/react";
import * as Routes from "../../utils/routes";

const OrganizationForm = ({ organization, editForm }: any) => {

  const handValue = useCallback((e, name) => {
    const value = (() => {
      if (name === "country") return e
      return e.target.value
    })();
    editForm?.setData(name, value);
  }, [editForm?.data])

  return (
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
              { label: 'Canada', value: 'CA' },
              { label: 'United States', value: 'US' },
            ]}
            size="md"
            onChange={(value) => handValue(value, "owner")}
            renderValue={(value?: string[]) => data.owner ? value?.[0] : ""}
          />
        </FormLayout>
      </FormLayout>
    </form>
  )
}
export default OrganizationForm;