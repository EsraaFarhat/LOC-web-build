import React, { Fragment } from "react";
import NavBar from "../../components/navbar/NavBar";
import AssignedLocs from "../../components/locs/AssignedLocs";
import NotAuthPage from "../../pages/NotAuth/NotAuthPage";

import {notAdmin} from "../../util/roles";
import { useSelector } from "react-redux";


const AssignedLocsPage = () => {
  const role = useSelector((state) => state.login.role);
  
  if (!notAdmin.includes(role)) return <NotAuthPage />;
  return (
    <Fragment>
         <NavBar />
         <AssignedLocs />
    </Fragment>
    );
}
export default AssignedLocsPage