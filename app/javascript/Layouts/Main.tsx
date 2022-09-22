import {
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  Box
} from "@chakra-ui/react";
import { ChevronDownIcon } from '@chakra-ui/icons'
import React from "react";
import { InertiaLink, Link } from '@inertiajs/inertia-react';
import * as Routes from '../utils/routes.js';
import Logo from "../components/Logo"
import MainMenu from '../Shared/MainMenu';
import FlashMessages from '../Shared/FlashMessages';

const Main: React.FC = ({ auth, flash, errors }) => {

  const messageProps = { flash, errors }
  return (
    <Flex direction={{ md: 'column' }} >
      <Flex direction={{ md: 'column' }} h={{ md: "100vh" }}>
        <Flex flexShrink={{ md: 0 }}>
          <Flex align="center" justify={{ md: "center", base: "space-between" }} bgColor="rgb(25 30 56)" pr={24} pl={24} pt={16} pb={16} w={{ md: '224px' }} flexShrink={{ md: 0 }} >
            <InertiaLink
              class="mt-1"
              mb={4}
              href={Routes.root()}
              aria-label="Home"
              role="navigation"
            >
              <Logo fill="#fff" w={120} h={28} />
            </InertiaLink>
          </Flex>
          <Flex w="100%" align="center" justify="space-between" borderBottomWidth={1} bgColor="rgb(255 255 255)" p={16} fontSize={14} lineHeight={20} pt={{ md: "0px" }} pb={{ md: "0px" }} pl={{ md: "48px" }} pr={{ md: "48px" }}>
            <Box mt={4} mr={16}>
              {auth.user.account.name}
            </Box>
            <Menu>
              <MenuButton as={Box} rightIcon={<ChevronDownIcon />}>
                <Box mr={4} whitespace="nowrap" color="rgb(30 42 59)" _focus={{ color: "rgb(86 97 179)" }}
                  _groupHover={{ color: "rgb(86 97 179)" }}>
                  {auth.user.first_name}
                </Box>
                <Text display={{ base: "none", md: "inline" }} >{auth.user.last_name}</Text>
              </MenuButton>
              <MenuList>
                <MenuItem>
                  <Link
                    role="navigation"
                    href={Routes.edit_user(auth.user.id)}
                  >
                    My Profile
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    role="navigation"
                    href={Routes.users()}
                  >
                    Manage Users
                  </Link></MenuItem>
                <MenuItem>
                  <Link
                    href={Routes.destroy_user_session()}
                    method="delete"
                    as="button"
                  >
                    Logout
                  </Link>
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
        <Flex flexGrow={{ md: 1 }} overFlow={{ md: "hidden" }}>
          <MainMenu display={{ md: "block", base: "none" }} w={224} flexShrink={0} overflowY="auto" bgColor="rgb(47 54 95)" p={48}></MainMenu>
          <Box
            pl={16}
            pr={16}
            flex={{ md: "1 1 0%" }}
            overflowY={{ md: "auto" }}
            p={{ md: "48px" }}
            scroll-region
          >
            <FlashMessages {...messageProps} />
          </Box>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Main;