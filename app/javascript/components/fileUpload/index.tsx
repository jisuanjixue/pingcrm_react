import { FormControl, Input, FormLabel, Box, Button, Text, useControllableState, FormErrorMessage } from "@chakra-ui/react";
import React, { useRef } from "react";

type IProps = {
  setData: (name, file) => void;
  label: string;
  errors: [];
  photo: {
    name: string;
    size: number;
  };
  type: string;
};

const FileUpload = ({ setData, label, photo, errors }: IProps) => {
  // const [files, setFiles] = useControllableState({defaultValue: []})
  const refFile = useRef();

  const browse = () => {
    refFile?.file.click();
  };

  const handRemove = () => {
    setData("photo", null);
  };

  const filesize = size => {
    const sizeNum = ["B", "kB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(size) / Math.log(1024));
    return `${(size / Math.pow(1024, i)).toFixed(2) * 1} ${sizeNum[i]}`;
  };

  return (
    <>
      {label && <FormLabel>{label}</FormLabel>}
      <FormControl>
        <Input type="file" accept="image/*" display="none" ref={refFile} onChange={e => setData("photo", e?.target?.files?.[0])} />
      </FormControl>
      {photo ? (
        <Box pr={8} pl={8}>
          <Button onClick={() => browse()} colorScheme="teal" variant="solid">
            Browse
          </Button>
        </Box>
      ) : (
        <Box display="flex" alignItems="center" justifyContent="space-between" pr={8} pl={8}>
          <Box>{photo?.name}</Box>
          <Text fontSize="" color="">
            {filesize(photo?.size)}
          </Text>
          <Button onClick={() => handRemove()} colorScheme="teal" variant="solid">
            Remove
          </Button>
        </Box>
      )}
      {errors.length > 0 && <FormErrorMessage>{errors[0]}</FormErrorMessage>}
    </>
  );
};

export default FileUpload;
