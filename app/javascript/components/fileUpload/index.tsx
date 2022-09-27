import { FormControl } from "@chakra-ui/react";
import React from "react";

const FileUpload = () => {
  return (
    <FormControl variant="floating">
      <Input type="file" value={data.avatar} onChange={e => setData('avatar', e.target.files[0])} />
    </FormControl>
  )
};

export default FileUpload;