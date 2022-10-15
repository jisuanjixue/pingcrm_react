import React from "react";
import { Box, useStyleConfig } from "@chakra-ui/react";

const PanelContent: React.FC = props => {
  const { variant, children, ...rest } = props as any;
  const styles = useStyleConfig("PanelContent", { variant });
  // Pass the computed styles into the `__css` prop
  return (
    <Box __css={styles} {...rest}>
      {...children}
    </Box>
  );
};

export default PanelContent;
