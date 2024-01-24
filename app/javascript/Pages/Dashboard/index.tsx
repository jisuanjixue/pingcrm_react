import React from "react";
import { Head } from "@inertiajs/react";
// import * as timeago from "timeago.js";

const Dashboard: React.FC = ({ git }) => {
  return (
    <>
      <Head title="Dashboard" />
      <div>{git.commit_time}</div>
    </>
  );
};

export default Dashboard;
