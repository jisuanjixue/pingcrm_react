import React from "react";

const Dashboard: React.FC = ({ git }) => {
  return (
    <>
      <div>{git?.commit_time}</div>
    </>
  );
};

export default Dashboard;
