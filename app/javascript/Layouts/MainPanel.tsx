import React from "react";
import { Box, useStyleConfig } from "@chakra-ui/react";
import Main from "./Main";

const MainPanel = props => {
  const { variant, children, ...rest } = props as any;
  const styles = useStyleConfig("MainPanel", { variant });
  // Pass the computed styles into the `__css` prop
  return (
    <Box
      __css={styles}
      {...rest}
      w={{
        md: "100%",
        base: "100%",
        xl: "100%",
      }}
    >
      <Main>{children}</Main>
    </Box>
  );
};

export default page => <MainPanel>{page}</MainPanel>;
