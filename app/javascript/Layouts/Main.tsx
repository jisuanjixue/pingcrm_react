import {
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  Box,
  Avatar,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  useDisclosure,
  Drawer,
  Icon,
  DrawerOverlay,
  DrawerContent,
  Link,
} from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon, HamburgerIcon, SearchIcon } from "@chakra-ui/icons";
import React from "react";
import { InertiaLink, usePage } from "@inertiajs/inertia-react";
import * as Routes from "../utils/routes.js";
import DashboardMenus from "../variables/general";

import Logo from "@/components/Logo";
import FlashMessages from "@/components/FlashMessages";

// eslint-disable-next-line @typescript-eslint/ban-types
const Main: React.FC = ({ children }: React.PropsWithChildren<{}>) => {
  const {
    auth: { user },
  } = usePage().props as any;
  const sidebar = useDisclosure();

  const isUrl = (...urls) => {
    const currentUrl = window.location.href;
    if (urls[0] === "") {
      return currentUrl === "";
    }

    return urls.filter(url => currentUrl.startsWith(url)).length;
  };

  const NavItem = props => {
    const { item, children, ...rest } = props;
    return (
      <Flex
        align="center"
        px="4"
        mx="2"
        rounded="md"
        py="3"
        cursor="pointer"
        color="whiteAlpha.700"
        _hover={{
          bg: "blackAlpha.300",
          color: "whiteAlpha.900",
        }}
        role="group"
        fontWeight="semibold"
        transition=".15s ease"
        {...rest}
      >
        <Link display="flex" role="group" alignItems="center" pt={12} pb={12} href={item?.url} aria-label={item?.linkName}>
          {item.icon && (
            <Icon
              mr="2"
              boxSize="4"
              _groupHover={{
                color: "gray.300",
              }}
              as={item.icon}
            />
          )}
          <Box color={isUrl("") ? "#fff" : "#rgb(178 183 255)"} _groupHover={{ color: isUrl("") ? "" : "#fff" }}>
            {item?.linkName}
          </Box>
          {children}
        </Link>
      </Flex>
    );
  };

  const SidebarContent = props => (
    <Box
      as="nav"
      pos="fixed"
      top="0"
      left="0"
      zIndex="sticky"
      h="full"
      pb="10"
      overflowX="hidden"
      overflowY="auto"
      bg="rgb(47 54 95)"
      borderColor="blackAlpha.300"
      borderRightWidth="1px"
      w="60"
      flexShrink={0}
      {...props}
    >
      <Flex px="4" py="5" align="center">
        <InertiaLink className="mt-1" href={Routes.root()} aria-label="Home" role="navigation">
          <Logo />
        </InertiaLink>
      </Flex>
      <Flex direction="column" as="nav" fontSize="sm" color="gray.600" aria-label="Main Navigation">
        {DashboardMenus.map((m, i) => (
          <NavItem key={i} item={m} />
        ))}
      </Flex>
    </Box>
  );

  return (
    <Flex direction={{ md: "column" }} display={{ md: "flex" }}>
      <Flex direction={{ md: "column" }} h={{ md: "100vh" }} display={{ md: "flex" }}>
        <Flex flexShrink={{ md: 0 }} display={{ md: "flex" }}>
          <Box
            as="section"
            bg="gray.50"
            _dark={{
              bg: "gray.700",
            }}
            w="auto"
            display="flex"
            minWidth="300vh"
            minH="100vh"
          >
            <SidebarContent
              display={{
                base: "none",
                md: "unset",
              }}
            />
            <Drawer isOpen={sidebar.isOpen} onClose={sidebar.onClose} placement="left">
              <DrawerOverlay />
              <DrawerContent>
                <SidebarContent w="full" borderRight="none" />
              </DrawerContent>
            </Drawer>
            <Box
              ml={{
                base: 0,
                md: 60,
              }}
              transition=".3s ease"
            >
              <Flex
                as="header"
                align="center"
                justify="space-between"
                w="full"
                px="4"
                bg="white"
                _dark={{
                  bg: "gray.800",
                }}
                borderBottomWidth="1px"
                borderColor="blackAlpha.300"
                h="14"
              >
                <IconButton
                  aria-label="Menu"
                  display={{
                    base: "inline-flex",
                    md: "none",
                  }}
                  onClick={sidebar.onOpen}
                  icon={<HamburgerIcon />}
                  size="sm"
                />
                <Box
                  w="30"
                  display={{
                    base: "none",
                    md: "flex",
                  }}
                >
                  {user.account.name}
                </Box>
                <InputGroup
                  w="66"
                  display={{
                    base: "none",
                    md: "flex",
                  }}
                >
                  <InputLeftElement color="gray.500">
                    <SearchIcon />
                  </InputLeftElement>
                  <Input placeholder="Search for articles..." />
                </InputGroup>

                <Flex align="center">
                  <Icon color="gray.500" as={BellIcon} cursor="pointer" />
                  <Avatar ml="4" size="sm" name="anubra266" src="https://avatars.githubusercontent.com/u/30869823?v=4" cursor="pointer" />
                  <Menu>
                    <MenuButton as={Box} rightIcon={<ChevronDownIcon />}>
                      <Box display={{ base: "none", md: "inline" }} mr={4} whiteSpace="nowrap" color="rgb(30 42 59)" _focus={{ color: "rgb(86 97 179)" }} _groupHover={{ color: "rgb(86 97 179)" }}>
                        <Text>
                          {user.first_name} {user.last_name}
                        </Text>
                      </Box>
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
                        <InertiaLink href={Routes.destroy_user_session()} method="delete" as="button">
                          Logout
                        </InertiaLink>
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Flex>
              </Flex>
              <Box as="main" p="4">
                {/* Add content here, remove div below  */}
                <Box borderWidth="4px" borderStyle="dashed" rounded="md" h="96">
                  <Box pl={16} pr={16} flex={{ md: "1 1 0%" }} overflowY={{ md: "auto" }} p={{ md: "48px" }} scroll-region>
                    <FlashMessages />
                  </Box>
                  {children}
                </Box>
              </Box>
            </Box>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Main;
