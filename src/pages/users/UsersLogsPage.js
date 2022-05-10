import React, { Fragment } from "react";
import NavBar from "../../components/navbar/NavBar";
import UserLogs from "../../components/users/UserLogs";

const UserLogsPage = () => {
  return (
    <Fragment>
         <NavBar />
         <UserLogs />
    </Fragment>
    );
}
export default UserLogsPage;