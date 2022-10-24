import React from "react";
import { Box, useStyleConfig } from "@chakra-ui/react";
import FlashMessages from "@/components/FlashMessages";

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
      <Box pl={16} pr={16} flex={{ md: "1 1 0%" }} overflowY={{ md: "auto" }} p={{ md: "48px" }} scroll-region>
        <FlashMessages />
      </Box>
      {children}
    </Box>
  );
};

export default page => <MainPanel>{page}</MainPanel>;
