import React, { Fragment } from "react";
import NavBar from "../../components/navbar/NavBar";
import UnAssignedLocs from "../../components/locs/UnAssignedLocs";
import NotAuthPage from "../../pages/NotAuth/NotAuthPage";

import {notAdmin} from "../../util/roles";
import { useSelector } from "react-redux";


const UnAssignedLocsPage = () => {
  const role = useSelector((state) => state.login.role);

  if (!notAdmin.includes(role)) return <NotAuthPage />;
  return (
    <Fragment>
         <NavBar />
         <UnAssignedLocs />
    </Fragment>
    );
}
export default UnAssignedLocsPage;
