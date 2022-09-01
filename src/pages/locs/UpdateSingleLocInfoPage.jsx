import React, { Fragment } from "react";
import NavBar from "../../components/navbar/NavBar";
import UpdateSingleLocInfo from "../../components/locs/UpdateSingleLocInfo";
import NotAuthPage from "../../pages/NotAuth/NotAuthPage";

import {notAdmin} from "../../util/roles";
import { useSelector } from "react-redux";

const UpdateSingleLocInfoPage = () => {
  const role = useSelector((state) => state.login.role);

  if (!notAdmin.includes(role)) return <NotAuthPage />;
  return (
    <Fragment>
         <NavBar />
         <UpdateSingleLocInfo />
    </Fragment>
    );
}
export default UpdateSingleLocInfoPage;
