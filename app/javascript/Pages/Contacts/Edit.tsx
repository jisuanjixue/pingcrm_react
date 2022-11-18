import React from "react";
import { Head } from "@inertiajs/inertia-react";
import { Flex, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import ContactForm from "./ContactForm";
import * as Routes from "../../utils/routes";

import TrashedMessage from "@/components/TrashedMessage";

type IProps = {
  contact: any;
  organizations: any
};
const EditIndex: React.FC = ({ contact, organizations }: IProps) => {
  const userForm = {
    contact,
    organizations
  }
  const restore = () => { };
  return (
    <>
      <Head title={`Edit Contact`} />
      <Breadcrumb fontWeight="medium" fontSize="md" color="rgb(120 134 215)" _hover={{ color: "rgb(86 97 179)" }}>
        <BreadcrumbItem>
          <BreadcrumbLink href={Routes.users()}>Contacts</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink isCurrentPage> {contact.first_name} {contact.last_name}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Flex
        _dark={{
          bg: "#3e3e3e",
        }}
        mt="5"
        w="full"
        alignItems="center"
        justifyContent="start"
      >
        <ContactForm {...userForm} />
      </Flex>
      {contact.deleted_at && (
        <TrashedMessage restore={restore}>
          This contact has been deleted.
        </TrashedMessage>
      )}
    </>
  );
};

export default EditIndex;
