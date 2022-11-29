import React from "react";
import { Box, Icon, IconButton, Spacer, useDisclosure, useStyleConfig } from "@chakra-ui/react";
import Main from "./Main";
import { usePage, InertiaLink } from "@inertiajs/inertia-react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { ModalsProvider } from "@saas-ui/react";
import DashboardMenus from "../variables/general";
import { AppShell } from '@saas-ui/app-shell'
import Logo from "@/components/Logo";
import * as Routes from "../utils/routes.js";
import { NavGroup, NavItem, Sidebar, SidebarOverlay, SidebarSection } from "@saas-ui/sidebar";


const MainPanel: React.FC = props => {
  const {
    auth: { user },
  } = usePage().props as any;
  const { variant, children, ...rest } = props as any;
  const styles = useStyleConfig("MainPanel", { variant });
  const { isOpen, onToggle } = useDisclosure({
    defaultIsOpen: true,
  })

  const isUrl = (...urls) => {
    const currentUrl = window.location.href;
    if (urls[0] === "") {
      return currentUrl === "";
    }

    return urls.filter(url => currentUrl.startsWith(url)).length;
  };
  // Pass the computed styles into the `__css` prop
  return (

    <AppShell
      variant="static"
      minH="100%"
      navbar={
        <Box
          as="header"
          borderBottomWidth="1px"
          py="2"
          px="4"
          position="sticky"
          top="0"
        >
        </Box>
      }
      sidebar={
        <Sidebar
          breakpoints={{ base: false }}
          variant={isOpen ? 'default' : 'condensed'}
          transition="width"
          transitionDuration="normal"
          width={isOpen ? '280px' : '48px'}
          minWidth="auto"
        >
          <SidebarSection direction={isOpen ? 'row' : 'column'}>
            <InertiaLink className="mt-1" href={Routes.root()} aria-label="Home" role="navigation">
              <Logo />
            </InertiaLink>
            <Spacer />
            <IconButton
              onClick={onToggle}
              variant="ghost"
              size="sm"
              icon={isOpen ? <ArrowLeftIcon /> : <ArrowRightIcon />}
              aria-label="Toggle Sidebar"
            />
          </SidebarSection>
          <SidebarSection flex="1" overflowY="auto" overflowX="hidden">
            <NavGroup>
              {DashboardMenus.map((m, i) => (
                <NavItem
                  key={i}
                  icon={m?.iconName && <Icon mr="2" boxSize="4" h="2" w="2" fill={isUrl(m.urlName) ? "#fff" : "#7886d7"} _groupHover={{ color: isUrl(m.urlName) ? "" : "#fff" }} as={m.iconName} />}
                  isActive={i === 0 ? true : false}
                >
                  <Box color={isUrl("") ? "#fff" : "#rgb(178 183 255)"} _groupHover={{ color: isUrl("") ? "" : "#fff" }}>
                    {m?.linkName}
                  </Box>
                </NavItem>
              ))}
            </NavGroup>
          </SidebarSection>
          <SidebarOverlay zIndex="1" />
        </Sidebar>
      }
    >
      <Box as="main" flex="1" py="2" px="4">
        Your application content
      </Box>
    </AppShell>
  );
};

export default page => <MainPanel>{page}</MainPanel>;
