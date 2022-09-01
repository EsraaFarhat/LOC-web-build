import React, { Fragment } from "react";
import NavBar from "../../components/navbar/NavBar";
import EditProject from "../../components/project/EditProject";
import NotAuthPage from "../../pages/NotAuth/NotAuthPage";

import { notAdmin, notUser } from "../../util/roles";
import { useSelector } from "react-redux";

const EditProjectPage = () => {
  const role = useSelector((state) => state.login.role);

  if (!notAdmin.includes(role)) return <NotAuthPage />;
  if (!notUser.includes(role)) return <NotAuthPage />;

  return (
    <Fragment>
      <NavBar />
      <EditProject />
    </Fragment>
  );
};
export default EditProjectPage;
