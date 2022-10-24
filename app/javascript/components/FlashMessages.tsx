import React from "react";
import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, CloseButton, useDisclosure } from "@chakra-ui/react";
import { usePage } from "@inertiajs/inertia-react";

const FlashMessages = () => {
  const { isOpen: isVisible, onClose } = useDisclosure({ defaultIsOpen: true });
  const status = ["error", "success", "warning", "info"];
  const { flash, errors } = usePage().props as any;
  return (
    <>
      {isVisible && (
        <Alert
          status={(() => {
            if (flash.success) return status[1];
            if (flash.alert) return status[2];
            if (errors) return status[0];
            return status[3] || undefined;
          })()}
          variant="left-accent"
        >
          <AlertIcon />
          <Box>
            <AlertTitle>
              {(() => {
                if (flash.success) flash.success;
                if (flash.alert) flash.alert;
                if (errors) {
                  if (Object.keys(errors).length === 1) return "There is one form error.";
                  return `There are ${Object.keys(errors).length} form
              errors.`;
                }
              })()}
            </AlertTitle>
            <AlertDescription></AlertDescription>
          </Box>
          <CloseButton alignSelf="flex-end" position="relative" right={-1} top={-1} onClick={onClose} />
        </Alert>
      )}
    </>
  );
};
export default FlashMessages;
