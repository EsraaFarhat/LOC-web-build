import React, { Fragment } from "react";
import NavBar from "../../components/navbar/NavBar";
import ViewLocs from "../../components/locs/ViewLocs";
import NotAuthPage from "../../pages/NotAuth/NotAuthPage";

import {notAdmin} from "../../util/roles";
import { useSelector } from "react-redux";

const ViewLocsPage = () => {
  const role = useSelector((state) => state.login.role);

  if (!notAdmin.includes(role)) return <NotAuthPage />;
  return (
    <Fragment>
         <NavBar />
         <ViewLocs />
    </Fragment>
    );
}
export default ViewLocsPage;
