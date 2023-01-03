/*eslint-disable*/
import React from "react";
import { Flex, Link, List, ListItem, Text } from "@chakra-ui/react";

const Footer: React.FC = () => {
  // const linkTeal = useColorModeValue("teal.400", "red.200");=
  return (
    <Flex
      flexDirection={{
        base: "column",
        xl: "row",
      }}
      alignItems={{
        base: "center",
        xl: "start",
      }}
      justifyContent="space-between"
      px="30px"
      pb="20px"
    >
      <Text
        color="gray.400"
        textAlign={{
          base: "center",
          xl: "start",
        }}
        mb={{ base: "20px", xl: "0px" }}
      >
        &copy; {1900 + new Date().getYear()}, <Text as="span">Made with ❤️ by</Text>
        <Link
          // color={linkTeal}
          color="teal.400"
          href="https://xiaobo.blog/"
          target="_blank"
        >
          "bobo"
        </Link>
        &
        <Link
          // color={linkTeal}
          color="teal.400"
          href="https://github.com/jisuanjixue "
          target="_blank"
        >
          github
        </Link>
        for a better web use
      </Text>
      <List display="flex">
        <ListItem
          me={{
            base: "20px",
            md: "44px",
          }}
        >
          <Link color="gray.400" href="https://github.com/ledermann/pingcrm/">
            ledermann
          </Link>
        </ListItem>
        <ListItem
          me={{
            base: "20px",
            md: "44px",
          }}
        >
          <Link color="gray.400" href="https://inertiajs.com/">
            Inertiajs
          </Link>
        </ListItem>
        <ListItem
          me={{
            base: "20px",
            md: "44px",
          }}
        >
          <Link color="gray.400" href="https://github.com/inertiajs/inertia-rails">
            inertia with rails
          </Link>
        </ListItem>
      </List>
    </Flex>
  );
}

export default Footer;
