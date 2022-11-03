import React from "react";
import { Flex, Button, Text } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

type IProps = {
  restore: () => void;
  children: any
};

const TrashedMessage = ({ restore, children }: IProps) => {
  const handRestore = () => restore();

  return (
    <>
      <Flex align="center" justify="space-between" borderRadius="1" borderWidth="0.25" borderColor="rgb(234 179 8)" bgColor="rgb(253 224 71)" p="4">
        <Flex align="center">
          <DeleteIcon mr="2" w="4" h="4" flexShrink="0" fill="#713f12" />
          <Text color="rgb(113 63 18)">
            {children}
          </Text>
          <Button color="rgb(113 63 18)" _hover={{ textDecorationLine: "underline" }} onClick={() => handRestore()}>
            Restore
          </Button>
        </Flex>
      </Flex>
    </>
  );
};

export default TrashedMessage;
