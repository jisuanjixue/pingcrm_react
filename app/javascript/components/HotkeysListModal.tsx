import React, { useRef } from "react";
import { Box, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react";
import { HotkeysList, HotkeysListItems, HotkeysSearch, useHotkeysShortcut } from "@saas-ui/react";

const HotkeysListModal: React.FC = () => {
  const searchRef = useRef(null)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const help = useHotkeysShortcut('?' /* general.help */, () => {
    console.log("1111")
    onOpen()
  })

  // for the sake of this example we don't depend on the hotkeys context here.
  // const { hotkeys } = useHotkeysContext()

  const hotkeys = {
    general: {
      title: 'General',
      hotkeys: {
        help: { label: 'Help', command: '?' },
        search: { label: 'Search', command: '⌘ K' },
      },
    },
  }

  return (
    <Box>
      <Text>
        Press <strong>{help}</strong> for help
      </Text>

      <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={searchRef}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>Keyboard shortcuts</ModalHeader>

          <ModalBody>
            <HotkeysList hotkeys={hotkeys}>
              <HotkeysSearch ref={searchRef} />
              <HotkeysListItems />
            </HotkeysList>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default HotkeysListModal