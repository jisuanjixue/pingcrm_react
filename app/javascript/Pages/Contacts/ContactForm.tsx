import React, { useCallback } from "react";
import { FormControl, FormLabel, Input, FormErrorMessage, Stack, Button } from "@chakra-ui/react";
import { useForm } from "@inertiajs/inertia-react";
import { Card, CardBody, CardFooter, CardHeader, CardTitle, FormLayout, Select } from "@saas-ui/react";
import * as Routes from "../../utils/routes";

const ContactForm: React.FC = (contactForm: any) => {
  const { data, setData, post, put, processing, errors, reset, progress } = useForm({ ...contactForm.contact });
  const handValue = useCallback(
    (e, name) => {
      const value = (() => {
        if (name === "photo") return e?.target?.files?.[0];
        else if (name === "owner") return e === "0" ? true : false;
        return e.target.value;
      })();
      setData(name, value);
    },
    [data]
  );

  const handleSubmit = useCallback(() => {
    if (data.id) {
      put(Routes.contact(data.id), {
        onSuccess: () => reset("password", "photo"),
      });
    } else {
      post(Routes.contacts(), {
        preserveScroll: true,
      });
    }
  }, [data]);

  return (
    <Card maxW="1000" w="full" variant="solid" isHoverable>
      <CardHeader>
        <CardTitle fontSize="xl">Add a new contact</CardTitle>
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
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                Organization
              </FormLabel>
              <Select
                name="organization"
                placeholder={data.organization_id ? contactForm?.organizations.find(f => f.id === data.organization_id)?.name : "Select"}
                options={contactForm?.organizations.map(v => ({ label: v.name, value: v.id }))}
                size="md"
                onChange={value => handValue(value, "organization_id")}
                renderValue={(value?: string[]) => (data.organization_id ? value?.[0] : "")}
              />
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
                  value={data?.phone}
                  name="phone"
                  onChange={e => handValue(e, "phone")}
                />
                <FormLabel ms="4px" fontSize="sm" fontWeight="normal" htmlFor="contact">
                  Phone
                </FormLabel>
                {errors.phone && <FormErrorMessage>{errors.email}</FormErrorMessage>}
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
                  value={data?.address}
                  name="address"
                  onChange={e => handValue(e, "address")}
                />
                <FormLabel ms="4px" fontSize="sm" fontWeight="normal" htmlFor="contact">
                  Address
                </FormLabel>
                {errors.address && <FormErrorMessage>{errors.address}</FormErrorMessage>}
              </FormControl>
            </FormLayout>
          </FormLayout>
        </form>
      </CardBody>
      <CardFooter>
        <Stack direction="row" spacing={4} align="center" justify="space-between">
          <Button
            colorScheme="teal"
            variant="outline"
            spinnerPlacement="start"
            onClick={() => {
              reset();
            }}
          >
            reset
          </Button>
          <Button isLoading={processing} loadingText="Loading" colorScheme="teal" variant="solid" spinnerPlacement="end" onClick={() => handleSubmit()}>
            {data.id ? "Edit contact" : "Create contact"}
          </Button>
        </Stack>
      </CardFooter>
    </Card>
  );
};

export default ContactForm;
