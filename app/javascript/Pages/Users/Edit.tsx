import React from "react";
import { Head, Link } from "@inertiajs/inertia-react";
import { Box, Flex, Text, Image } from "@chakra-ui/react";
import * as Routes from "../../utils/routes"

import TrashedMessage from "@/components/TrashedMessage"

type IProps = {
  user: any
}
const EditIndex = ({ user }: IProps) => {
  const restore = () => {

  }
  return (
    <>
      <Head title={`${user.first_name} ${user.last_name}`} />
      <Flex mb={32} maxWidth={768} justifyContent="center">
        <Text fontSize={30} lineHeight={36} fontWeight="bold">
          <Box color="rgb(101 116 205)" _hover={{ color: "rgb(86 97 179)" }}>
            <Link href={Routes.users()}>users</Link>
          </Box>
          <span fontWeight={500} color="rgb(120 134 215)">/</span>
          {user?.first_name}{user?.last_name}
        </Text>
        {user.photo && <Image boxSize={32} ml={16} src={user.photo} objectFit='cover' borderRadius='full'
          alt='' />}
      </Flex>
      {user.deleted_at && <TrashedMessage restore={restore} >
        <Text color="rgb(113 63 68)">This user has been deleted.</Text>
      </TrashedMessage>}
    </>
  );
};

export default EditIndex