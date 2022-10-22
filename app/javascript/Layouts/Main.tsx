import {
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  Box,
  Avatar,
  Button,
  CloseButton,
  HStack,
  IconButton,
  Input,
  chakra,
  InputGroup,
  InputLeftElement,
  VisuallyHidden,
  VStack,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
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
  const bg = useColorModeValue("white", "gray.800");
  const mobileNav = useDisclosure();
  return (
    <Flex direction={{ md: "column" }} display={{ md: "flex" }}>
      <Flex direction={{ md: "column" }} h={{ md: "100vh" }} display={{ md: "flex" }}>
        <Flex flexShrink={{ md: 0 }} display={{ md: "flex" }}>
          <chakra.header
            bg={bg}
            w="full"
            px={{
              base: 2,
              sm: 4,
            }}
            py={4}
            shadow="md"
          >
            <Flex alignItems="center" justifyContent="space-between" mx="auto">
              <HStack display="flex" spacing={3} alignItems="center">
                <Box
                  display={{
                    base: "inline-flex",
                    md: "none",
                  }}
                >
                  <IconButton
                    display={{
                      base: "flex",
                      md: "none",
                    }}
                    aria-label="Open menu"
                    fontSize="20px"
                    color="gray.800"
                    _dark={{
                      color: "inherit",
                    }}
                    variant="ghost"
                    // icon={<AiOutlineMenu />}
                    onClick={mobileNav.onOpen}
                  />
                  <VStack pos="absolute" top={0} left={0} right={0} display={mobileNav.isOpen ? "flex" : "none"} flexDirection="column" p={2} pb={4} m={2} bg={bg} spacing={3} rounded="sm" shadow="sm">
                    <CloseButton aria-label="Close menu" justifySelf="self-start" onClick={mobileNav.onClose} />
                    <Button w="full" variant="ghost">
                      Dashboard
                    </Button>
                    {/* <Button w="full" variant="solid" colorScheme="brand" leftIcon={<AiOutlineInbox />}>
                      Inbox
                    </Button>
                    <Button w="full" variant="ghost" leftIcon={<BsFillCameraVideoFill />}>
                      Videos
                    </Button> */}
                  </VStack>
                </Box>
                {/* <chakra.a href="/" title="Choc Home Page" display="flex" alignItems="center">
                  <Logo />
                  <VisuallyHidden>Choc</VisuallyHidden>
                </chakra.a> */}

                <HStack
                  spacing={3}
                  display={{
                    base: "none",
                    md: "inline-flex",
                  }}
                >
                  {/* <Button variant="ghost" leftIcon={<AiFillHome />} size="sm">
                    Dashboard
                  </Button>
                  <Button variant="solid" colorScheme="brand" leftIcon={<AiOutlineInbox />} size="sm">
                    Inbox
                  </Button>
                  <Button variant="ghost" leftIcon={<BsFillCameraVideoFill />} size="sm">
                    Videos
                  </Button> */}
                </HStack>
              </HStack>
              <HStack spacing={3} display={mobileNav.isOpen ? "none" : "flex"} alignItems="center">
                <InputGroup>
                  <InputLeftElement pointerEvents="none">{/* <AiOutlineSearch /> */}</InputLeftElement>
                  <Input type="tel" placeholder="Search..." />
                </InputGroup>

                {/* <chakra.a
                  p={3}
                  color="gray.800"
                  _dark={{
                    color: "inherit",
                  }}
                  rounded="sm"
                  _hover={{
                    color: "gray.800",
                    _dark: {
                      color: "gray.600",
                    },
                  }}
                >
                  <AiFillBell />
                  <VisuallyHidden>Notifications</VisuallyHidden>
                </chakra.a> */}

                <Avatar size="sm" name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
              </HStack>
            </Flex>
          </chakra.header>
          {/* <Flex align="center" justify={{ md: "center", base: "space-between" }} bgColor="rgb(25 30 56)" pr={24} pl={24} pt={16} pb={16} w={{ md: "224px" }} h={{ md: "24px" }} flexShrink={{ md: 0 }}>
            <InertiaLink className="mt-1" href={Routes.root()} aria-label="Home" role="navigation">
              <Logo />
            </InertiaLink>
            <Flex
              // w="100%"
              // align="center"
              // justify="space-between"
              borderBottomWidth={1}
              bgColor="rgb(255 255 255)"
              p={16}
              fontSize={14}
              lineHeight={20}
              pt={{ md: "0px" }}
              pb={{ md: "0px" }}
              pl={{ md: "48px" }}
              pr={{ md: "48px" }}
              display={{ md: "none" }}
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
          </Flex> */}
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
