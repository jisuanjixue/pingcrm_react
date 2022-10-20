import { Flex, Menu, MenuButton, MenuList, MenuItem, Text, Box } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import React from "react";
import { InertiaLink, Link, usePage } from "@inertiajs/inertia-react";
import * as Routes from "../utils/routes.js";

import Logo from "@/components/Logo";
import MainMenu from "@/components/MainMenu";
import FlashMessages from "@/components/FlashMessages";

// eslint-disable-next-line @typescript-eslint/ban-types
const Main: React.FC = ({ children }: React.PropsWithChildren<{}>) => {
  const {
    auth: { user },
  } = usePage().props as any;
  return (
    <Flex direction={{ md: "column" }} display={{ md: "flex" }}>
      <Flex direction={{ md: "column" }} h={{ md: "100vh" }} display={{ md: "flex" }}>
        <Flex flexShrink={{ md: 0 }} display={{ md: "flex" }}>
          <Flex align="center" justify={{ md: "center", base: "space-between" }} bgColor="rgb(25 30 56)" pr={24} pl={24} pt={16} pb={16} w={{ md: "224px" }} h={{ md: "24px" }} flexShrink={{ md: 0 }}>
            <InertiaLink className="mt-1" href={Routes.root()} aria-label="Home" role="navigation">
              <Logo />
            </InertiaLink>
          </Flex>
          <Flex
            w="100%"
            align="center"
            justify="space-between"
            borderBottomWidth={1}
            bgColor="rgb(255 255 255)"
            p={16}
            fontSize={14}
            lineHeight={20}
            pt={{ md: "0px" }}
            pb={{ md: "0px" }}
            pl={{ md: "48px" }}
            pr={{ md: "48px" }}
          >
            <Box mt={4} mr={16}>
              {user.account.name}
            </Box>
            <Menu>
              <MenuButton as={Box} rightIcon={<ChevronDownIcon />}>
                <Box mr={4} whiteSpace="nowrap" color="rgb(30 42 59)" _focus={{ color: "rgb(86 97 179)" }} _groupHover={{ color: "rgb(86 97 179)" }}>
                  {user.first_name}
                </Box>
                <Text display={{ base: "none", md: "inline" }}>{user.last_name}</Text>
              </MenuButton>
              <MenuList>
                <MenuItem>
                  <Link role="navigation" href={Routes.edit_user("1")}>
                    My Profile
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link role="navigation" href={Routes.users()}>
                    Manage Users
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link href={Routes.destroy_user_session()} method="delete" as="button">
                    Logout
                  </Link>
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
        <Flex flexGrow={{ md: 1 }} overflow={{ md: "hidden" }}>
          <MainMenu></MainMenu>
          {children}
          <Box pl={16} pr={16} flex={{ md: "1 1 0%" }} overflowY={{ md: "auto" }} p={{ md: "48px" }} scroll-region>
            <FlashMessages />
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Main;
