import { FormControl, Input, FormLabel } from "@chakra-ui/react";
import React, { useRef } from "react";

type IProps = {
  setData: (name, file) => void;
  label: string;
}

const FileUpload = ({ setData, label }: IProps) => {
  const refFile = useRef();
  return (
    <>
      {label ?
        <>
          <FormLabel>
            {label}
          </FormLabel>
          <FormControl>
            <Input type="file" accept="accept" display="none" ref={refFile} onChange={(e) => setData('avatar', e.target.files[0])} />
          </FormControl>
        </>
        : <>

        </>}

    </>
  )
};

export default FileUpload;

