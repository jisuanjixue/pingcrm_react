import React from "react";
import { Box, useStyleConfig } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme/theme";

const MainPanel = props => {
  console.log("132434")
  const { variant, children, ...rest } = props;
  const styles = useStyleConfig("MainPanel", { variant });
  // Pass the computed styles into the `__css` prop
  return (
    <ChakraProvider theme={theme} resetCSS={false}>
      <Box __css={styles} {...rest}>
        {children}
      </Box>
    </ChakraProvider>
  );
};

export default MainPanel;
