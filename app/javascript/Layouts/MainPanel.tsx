import React from "react";
import { Box, useStyleConfig } from "@chakra-ui/react";
import Main from "./Main";
import { usePage } from "@inertiajs/inertia-react";
import { ModalsProvider, HotkeysProvider, HotkeysListOptions } from "@saas-ui/react";
// import { Inertia } from '@inertiajs/inertia';
// import { NProgress, NProgressNextRouter } from '@saas-ui/react'


const MainPanel: React.FC = props => {
  // let timeout: any = null

  // Inertia.on('start', () => {
  //   timeout = setTimeout(() => NProgress.start(), 250)
  // })

  // Inertia.on('progress', (event) => {
  //   if (NProgress.isStarted() && event.detail.progress.percentage) {
  //     NProgress.set((event.detail.progress.percentage / 100) * 0.9)
  //   }
  // })

  // Inertia.on('finish', (event) => {
  //   clearTimeout(timeout)
  //   if (!NProgress.isStarted()) {
  //     return
  //   } else if (event.detail.visit.completed) {
  //     NProgress.done()
  //   } else if (event.detail.visit.interrupted) {
  //     NProgress.set(0)
  //   } else if (event.detail.visit.cancelled) {
  //     NProgress.done()
  //     NProgress.remove()
  //   }
  // })
  const hotkeys: HotkeysListOptions = {
    general: {
      title: 'General',
      hotkeys: {
        help: { label: 'Help', command: '?' },
        search: { label: 'Search', command: '⌘ K' },
      },
    }
  }
  const {
    auth: { user },
  } = usePage().props as any;
  const { variant, children, ...rest } = props as any;
  const styles = useStyleConfig("MainPanel", { variant });
  // Pass the computed styles into the `__css` prop
  return (
    <Box
      __css={styles}
      {...rest}
      w={{
        md: "100%",
        base: "100%",
        xl: "100%",
      }}
    >
      <ModalsProvider>
        {user ?
          <HotkeysProvider hotkeys={hotkeys}>
            <Main>
              {children}
            </Main>
          </HotkeysProvider> : children}
      </ModalsProvider>
    </Box >
  );
};

export default page => <MainPanel>{page}</MainPanel>;
