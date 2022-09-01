import React, { Fragment } from "react";
import NavBar from "../../components/navbar/NavBar";
import AddNewLocation from "../../components/project/AddNewLocation";
import NotAuthPage from "../../pages/NotAuth/NotAuthPage";

import { notAdmin, notUser } from "../../util/roles";
import { useSelector } from "react-redux";

const AddNewLocationPage = () => {
  const role = useSelector((state) => state.login.role);

  if (!notAdmin.includes(role)) return <NotAuthPage />;
  if (!notUser.includes(role)) return <NotAuthPage />;

  return (
    <Fragment>
      <NavBar />
      <AddNewLocation />
    </Fragment>
  );
};
export default AddNewLocationPage;
