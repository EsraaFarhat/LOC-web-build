import React, { Fragment } from "react";
import NavBar from "../../components/navbar/NavBar";
import UnAssignedLocs from "../../components/locs/UnAssignedLocs";

const UnAssignedLocsPage = () => {
  return (
    <Fragment>
         <NavBar />
         <UnAssignedLocs />
    </Fragment>
    );
}
export default UnAssignedLocsPage;