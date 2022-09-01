import React, { Fragment } from "react";
import NavBar from "../../components/navbar/NavBar";
import AddNewProject from "../../components/project/AddNewProject";
import NotAuthPage from "../../pages/NotAuth/NotAuthPage";

import { notAdmin, notUser } from "../../util/roles";
import { useSelector } from "react-redux";

const AddNewProjectPage = () => {
  const role = useSelector((state) => state.login.role);

  if (!notAdmin.includes(role)) return <NotAuthPage />;
  if (!notUser.includes(role)) return <NotAuthPage />;

  return (
    <Fragment>
      <NavBar />
      <AddNewProject />
    </Fragment>
  );
};
export default AddNewProjectPage;
