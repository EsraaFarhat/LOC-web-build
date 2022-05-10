import React, { Fragment } from "react";
import NavBar from "../../components/navbar/NavBar";
import GidLogs from "../../components/gid/GidLogs";

const GidLogsPage = () => {
  return (
    <Fragment>
         <NavBar />
         <GidLogs />
    </Fragment>
    );
}
export default GidLogsPage;