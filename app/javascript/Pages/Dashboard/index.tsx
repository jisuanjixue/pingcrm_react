import React from "react";
import { Head } from "@inertiajs/inertia-react";
import * as timeago from "timeago.js";
import { Link, Text } from "@chakra-ui/react";
import type { IProps } from "@/data-types/dashboard";

const Dashboard = ({ git }: IProps) => {
  return (
    <>
      <Head title="Dashboard" />
      <Text mb="8" fontSize="3xl" lineHeight="4xl" fontWeight={700}>
        Dashboard
      </Text>
      <Text mb="8" lineHeight="2xl">
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
          color="rgb(47 54 95)"
          _hover={{
            color: "rgb(234 88 12 / 1)",
          }}
        >
          Ruby on Rails
        </Link>
      </Text>
      {git?.commit_url && (
        <Text mb="10" lineHeight="2xl">
          Version:{" "}
          <Link href={git?.commit_url} textDecorationColor="underline">
            {git?.commit_sha}
          </Link>
          {timeago.format(git?.commit_time)}
        </Text>
      )}
    </>
  );
};

export default Dashboard;
