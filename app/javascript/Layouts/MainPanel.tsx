import React from "react";
import { Box, useStyleConfig } from "@chakra-ui/react";

const MainPanel = props => {
  const { variant, children, ...rest } = props as any;
  const styles = useStyleConfig("MainPanel", { variant });
  // Pass the computed styles into the `__css` prop
  return (
    <Box
      __css={styles}
      {...rest}
      w={{
        base: "100%",
        xl: "calc(100% - 275px)",
      }}
    >
      {children}
    </Box>
  );
};

export default MainPanel;
