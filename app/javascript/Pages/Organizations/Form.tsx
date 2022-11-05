import React, { useCallback, useMemo } from "react";
import { FormControl, FormLabel, Input, FormErrorMessage } from "@chakra-ui/react";
import { FormLayout, Select } from "@saas-ui/react";

const OrganizationForm = ({ editForm }: any) => {

  const organization = useMemo(() => editForm.data, [editForm.data])

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
              value={organization?.name}
              name="name"
              onChange={e => handValue(e, "name")}
            />
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal" htmlFor="organization">
              Name
            </FormLabel>
            {editForm?.errors.name && <FormErrorMessage>{editForm?.errors.name}</FormErrorMessage>}
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
              value={organization?.email}
              name="email"
              onChange={e => handValue(e, "email")}
            />
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal" htmlFor="organization">
              Email
            </FormLabel>
            {editForm?.errors.email && <FormErrorMessage>{editForm?.errors.email}</FormErrorMessage>}
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
              type="phone"
              placeholder=" "
              size="lg"
              value={organization?.phone}
              name="phone"
              onChange={e => handValue(e, "phone")}
            />
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal" htmlFor="organization">
              Phone
            </FormLabel>
            {editForm?.errors.phone && <FormErrorMessage>{editForm?.errors.email}</FormErrorMessage>}
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
              value={organization?.address}
              name="address"
              onChange={e => handValue(e, "address")}
            />
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal" htmlFor="organization">
              Address
            </FormLabel>
            {editForm?.errors.address && <FormErrorMessage>{editForm?.errors.address}</FormErrorMessage>}
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
              type="text"
              placeholder=" "
              size="lg"
              value={organization?.city}
              name="city"
              onChange={e => handValue(e, "city")}
            />
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal" htmlFor="organization">
              City
            </FormLabel>
            {editForm?.errors.city && <FormErrorMessage>{editForm?.errors.city}</FormErrorMessage>}
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
              value={organization?.region}
              name="region"
              onChange={e => handValue(e, "region")}
            />
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal" htmlFor="organization">
              Region
            </FormLabel>
            {editForm?.errors.region && <FormErrorMessage>{editForm?.errors.region}</FormErrorMessage>}
          </FormControl>
        </FormLayout>
        <FormLayout columns={2}>
          <Select
            name="country"
            placeholder={organization.country ? organization.country : "Select"}
            options={[
              { label: 'Canada', value: 'CA' },
              { label: 'United States', value: 'US' },
            ]}
            size="md"
            onChange={(value) => handValue(value, "country")}
            renderValue={(value?: string[]) => organization.owner ? value?.[0] : ""}
          />
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
              value={organization?.postal_code}
              name="postal_code"
              onChange={e => handValue(e, "postal_code")}
            />
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal" htmlFor="organization">
              Postal Code
            </FormLabel>
            {editForm?.errors.postal_code && <FormErrorMessage>{editForm?.errors.postal_code}</FormErrorMessage>}
          </FormControl>
        </FormLayout>
      </FormLayout>
    </form>
  )
}
export default OrganizationForm;