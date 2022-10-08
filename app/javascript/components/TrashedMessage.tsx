import { Flex, Button } from "@chakra-ui/react";
import React from "react";
import { DeleteIcon } from "@chakra-ui/icons";

type IProps = {
  restore: () => void;
};

const TrashedMessage = ({ restore }: IProps) => {
  const handRestore = () => restore();

  return (
    <>
      <Flex align="center" justify="space-between" borderRadius={4} borderWidth={1} borderColor="rgb(234 179 8)" bgColor="rgb(253 224 71)" p={16}>
        <Flex align="center">
          <DeleteIcon mr={8} w={16} h={16} flexShrink={0} fill="#713f12" />
          <Button color="rgb(113 63 18)" _hover={{ textDecorationLine: "underline" }} onClick={() => handRestore()}>
            Restore
          </Button>
        </Flex>
      </Flex>
    </>
  );
};

export default TrashedMessage;
