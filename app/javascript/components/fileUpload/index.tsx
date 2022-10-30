import { FormControl, Input, FormLabel, Box, Button, Text, Progress, FormErrorMessage, Flex, Avatar } from "@chakra-ui/react";
import React, { useRef } from "react";

type IProps = {
  handValue: (file, name) => void;
  label: string;
  errors: [];
  photo: {
    name: string;
    size: number;
  };
  type: string;
  progress: any
};

const FileUpload = ({ handValue, label, photo, errors, type, progress }: IProps) => {

  const handRemove = () => {
    handValue(null, "photo");
  };

  const filesize = size => {
    const sizeNum = ["B", "kB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(size) / Math.log(1024));
    return `${(size / Math.pow(1024, i)).toFixed(2) * 1} ${sizeNum[i]}`;
  };

  return (
    <>
      <FormControl>
        {label &&
          <>
            <FormLabel
              fontSize="sm"
              fontWeight="md"
              color="gray.700"
              _dark={{
                color: "gray.50",
              }}
            >
              {label}
            </FormLabel>
            <Flex alignItems="center" mt="1">
              <Avatar
                boxSize="12"
                bg="gray.100"
                _dark={{
                  bg: "gray.800",
                }}
                src='https://bit.ly/broken-link'
              />
              {!photo ?
                (<Input type={type} accept="image/*" value={photo} onChange={e => handValue(e, "photo")} />) :
                (
                  <Box display="flex" alignItems="center" justifyContent="space-between" pr="2" pl="2">
                    <Box>{photo?.name}</Box>
                    <Text fontSize="" color="">
                      {filesize(photo?.size)}
                    </Text>
                    <Button onClick={() => handRemove()} colorScheme="teal" variant="solid">
                      Remove
                    </Button>
                  </Box>
                )
              }
            </Flex>
          </>
        }

        {progress && (
          <Progress colorScheme='green' size='md' value={progress.percentage}>
            {progress.percentage}%
          </Progress>
        )}
      </FormControl>
      {errors.length > 0 && <FormErrorMessage>{errors}</FormErrorMessage>}
    </>
  );
};

export default FileUpload;
