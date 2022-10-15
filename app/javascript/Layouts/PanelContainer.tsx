import React from "react";
import { Box, useStyleConfig } from "@chakra-ui/react";

const PanelContainer: React.FC = props => {
  const { variant, children, ...rest } = props as any;
  const styles = useStyleConfig("PanelContainer", { variant });
  // Pass the computed styles into the `__css` prop
  return (
    <Box __css={styles} {...rest}>
      {...children}
    </Box>
  );
};

export default PanelContainer;
