import React, { Fragment } from "react";
import NavBar from "../../components/navbar/NavBar";
import EditGlobalIdenetifiers from "../../components/global idenetifiers/EditGlobalIdenetifiers";
import NotAuthPage from "../../pages/NotAuth/NotAuthPage";
import { notAdmin } from "../../util/roles";
import { useSelector } from "react-redux";

const EditGlobalIdenetifiersPage = () => {
  const role = useSelector((state) => state.login.role);

  if (!notAdmin.includes(role)) return <NotAuthPage />;

  return (
    <Fragment>
      <NavBar />
      <EditGlobalIdenetifiers />
    </Fragment>
  );
};
export default EditGlobalIdenetifiersPage;
