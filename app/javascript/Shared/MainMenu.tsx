import React from "react";
import { Box, Icon } from "@chakra-ui/react"
import { Link } from "@inertiajs/inertia-react";
import { dashboardMenus } from "../variables/general"


const MainMenu = () => {
  const isUrl = (...urls) => {
    let currentUrl = window.location.href
    if (urls[0] === '') {
      return currentUrl === '';
    }

    return urls.filter((url) => currentUrl.startsWith(url)).length;
  }
  return (
    <>
      {dashboardMenus.map((m, i) => (
        <Box mb={16} key={i}>
          <Link group display="flex" alignItems="center" pt={12} pb={12} href={m.url} role="navigation" aria-label={m.linkName}>
            <Icon mr={8} h={16} w={16} as={m.iconName} fill={isUrl(m.urlName) ? "#fff" : "#7886d7"} _groupHover={{ color: isUrl(m.urlName) ? "" : "#fff" }} />
            <Box color={isUrl('') ? "#fff" : "#rgb(178 183 255)"} _groupHover={{ color: isUrl('') ? "" : "#fff" }}>{m.linkName}</Box>
          </Link>
        </Box>
      ))}
    </>
  );
}

export default MainMenu