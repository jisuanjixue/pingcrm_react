import React from "react";
import { Head } from "@inertiajs/inertia-react";
import * as Routes from "../../utils/routes.js";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex } from "@chakra-ui/react";
import ContactForm from "./ContactForm";
import { Organizations } from "@/data-types/organizations";

type IProps = {
  organizations: Organizations["data"][];
};

const newIndex: React.FC = ({ organizations }: IProps) => {
  const contactForm = {
    organizations,
    contact: {},
  }
  return (
    <>
      <Head title="Create Contact"></Head>
      <Breadcrumb fontWeight="medium" fontSize="md" color="rgb(120 134 215)" _hover={{ color: "rgb(86 97 179)" }}>
        <BreadcrumbItem>
          <BreadcrumbLink href={Routes.contacts()}>Contacts</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink isCurrentPage>Create</BreadcrumbLink>
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
        <ContactForm {...contactForm} />
      </Flex>
    </>
  );
};

export default newIndex;
