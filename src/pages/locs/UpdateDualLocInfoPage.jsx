import React, { Fragment } from "react";
import NavBar from "../../components/navbar/NavBar";
import UpdateDualLocInfo from "../../components/locs/UpdateDualLocInfo";
import NotAuthPage from "../../pages/NotAuth/NotAuthPage";

import {notAdmin} from "../../util/roles";
import { useSelector } from "react-redux";

const UpdateDualLocInfoPage = () => {
  const role = useSelector((state) => state.login.role);

  if (!notAdmin.includes(role)) return <NotAuthPage />;
  return (
    <Fragment>
         <NavBar />
         <UpdateDualLocInfo />
    </Fragment>
    );
}
export default UpdateDualLocInfoPage;
