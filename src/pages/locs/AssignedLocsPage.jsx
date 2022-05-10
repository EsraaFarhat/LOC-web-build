import React, { Fragment } from "react";
import NavBar from "../../components/navbar/NavBar";
import AssignedLocs from "../../components/locs/AssignedLocs";

const AssignedLocsPage = () => {
  return (
    <Fragment>
         <NavBar />
         <AssignedLocs />
    </Fragment>
    );
}
export default AssignedLocsPage;