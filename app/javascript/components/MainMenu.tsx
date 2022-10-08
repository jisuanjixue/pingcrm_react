import React from "react";
import { Box, Icon, Link } from "@chakra-ui/react";
import { dashboardMenus } from "../variables/general";

const MainMenu = () => {
  const isUrl = (...urls) => {
    const currentUrl = window.location.href;
    if (urls[0] === "") {
      return currentUrl === "";
    }

    return urls.filter(url => currentUrl.startsWith(url)).length;
  };
  return (
    <>
      {dashboardMenus.map((m, i) => (
        <Box mb={16} key={i} display={{ md: "block", base: "none" }} w={224} flexShrink={0} overflowY="auto" bgColor="rgb(47 54 95)" p={48}>
          <Link display="flex" role="group" alignItems="center" pt={12} pb={12} href={m.url} aria-label={m.linkName}>
            <Icon mr={8} h={16} w={16} as={m.iconName} fill={isUrl(m.urlName) ? "#fff" : "#7886d7"} _groupHover={{ color: isUrl(m.urlName) ? "" : "#fff" }} />
            <Box color={isUrl("") ? "#fff" : "#rgb(178 183 255)"} _groupHover={{ color: isUrl("") ? "" : "#fff" }}>
              {m.linkName}
            </Box>
          </Link>
        </Box>
      ))}
    </>
  );
};

export default MainMenu;
