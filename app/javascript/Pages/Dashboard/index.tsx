import React from "react";
import { Head } from "@inertiajs/react";
// import * as timeago from "timeago.js";
import type { IProps } from "@/data-types/dashboard";

const Dashboard: React.FC = ({ git }: IProps) => {
  return (
    <>
      <Head title="Dashboard" />
    </>
  );
};

export default Dashboard;
