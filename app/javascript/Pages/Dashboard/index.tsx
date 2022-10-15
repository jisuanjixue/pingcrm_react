import React from "react";
import { Head } from "@inertiajs/inertia-react";
import * as timeago from "timeago.js";
import { Link, Text } from "@chakra-ui/react";
// import PanelContent from "../../Layouts/PanelContent";
// import PanelContainer from "../../Layouts/PanelContainer";
import MainPanel from "../../Layouts/MainPanel";
import Main from "../../Layouts/Main";
import type { IProps } from "@/data-types/dashboard";

const Dashboard = ({ git, auth, flash, errors }: IProps) => {
  // ref for main panel div
  const mainProps = { auth, flash, errors };

  return (
    <MainPanel>
      <Head title="Dashboard" />
      <Main {...mainProps} />
      <Text mb={8} fontSize={30} lineHeight={36} fontWeight={700}>
        Dashboard
      </Text>
      <Text mb={32} lineHeight={1.5}>
        Hey there! Welcome to Ping CRM, a demo app designed to help illustrate how
        <Link
          fontWeight={700}
          textDecorationColor="underline"
          color="rgb(47 54 95)"
          _hover={{
            color: "rgb(234 88 12)",
          }}
          href="https://inertiajs.com"
        >
          Inertia.js
        </Link>
        works with
        <Link
          fontWeight={700}
          textDecorationColor="underline"
          color="rgb(47 54 95 / 1"
          _hover={{
            color: "rgb(234 88 12 / 1)",
          }}
        >
          Ruby on Rails
        </Link>
      </Text>
      {git?.commit_url && (
        <Text mb={40} lineHeight={1.5}>
          Version:{" "}
          <Link href={git?.commit_url} textDecorationColor="underline">
            {git?.commit_sha}
          </Link>
          {timeago.format(git?.commit_time)}
        </Text>
      )}
    </MainPanel>
  );
};

export default Dashboard;
