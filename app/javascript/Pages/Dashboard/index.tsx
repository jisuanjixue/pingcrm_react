import React from 'react';
import { Head } from '@inertiajs/inertia-react';
// import { Inertia } from '@inertiajs/inertia';
import * as timeago from 'timeago.js';
import MainPanel from '../../Layouts/MainPanel';
import { forwardRef } from '@chakra-ui/react';
// import Footer from "@components/Footer";
import PanelContent from '../../Layouts/PanelContent';
import PanelContainer from '../../Layouts/PanelContainer';
import Main from '../../Layouts/Main';

type IProps = {
  git: {
    commit_url: string;
    commit_sha: string;
    commit_time: string;
  };
  auth: {
    user: {
      id: string;
      first_name: string;
      last_name;
      account: {
        name: string
      }
    }
  };
  flash: any;
  errors: any;
};

const Dashboard = ({ git, auth, flash, errors }: IProps) => {
  // ref for main panel div
  const mainProps = { auth, flash, errors }
  const mainPanel = forwardRef(null);

  return (
    <MainPanel
      ref={mainPanel}
      w={{
        base: "100%",
        xl: "calc(100% - 275px)",
      }}
    >
      <PanelContent>
        <PanelContainer>
          <Head title="Dashboard" />
          <Main {...mainProps} />
          <h1 mb={8} fontSize={30} lineHeight={36} fontWeight={700}>Dashboard</h1>
          <p mb={32} lineHeight={1.5} >
            Hey there! Welcome to Ping CRM, a demo app designed to help illustrate how
            <a
              fontWeight={700}
              textDecorationColor="underline"
              color="rgb(47 54 95)"
              _hover={{
                color: "rgb(234 88 12)",
              }}
              href="https://inertiajs.com"
            >
              Inertia.js
            </a>
            works with
            <a
              fontWeight={700}
              textDecorationColor="underline"
              color="rgb(47 54 95 / 1"
              _hover={{
                color: "rgb(234 88 12 / 1)",
              }}
            >
              Ruby on Rails </a
            >.
          </p>
          {git.commit_url && (
            <p mb={40} lineHeight={1.5}>
              Version:{' '}
              <a href={git.commit_url} textDecorationColor="underline">
                {git.commit_sha}
              </a>
              {timeago.format(git?.commit_time)}
            </p>
          )}
        </PanelContainer>
      </PanelContent>
    </MainPanel>
  );
};

export default Dashboard;
