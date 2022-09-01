import React, { Fragment } from "react";
import NavBar from "../../components/navbar/NavBar";
import UserLogs from "../../components/users/UserLogs";
import NotAuthPage from "../../pages/NotAuth/NotAuthPage";
import { notUser } from "../../util/roles";
import { useSelector } from "react-redux";

const UserLogsPage = () => {
  const { role } = useSelector((state) => state.login);

  if (!notUser.includes(role)) return <NotAuthPage />;

  return (
    <Fragment>
      <NavBar />
      <UserLogs />
    </Fragment>
  );
};
export default UserLogsPage;
