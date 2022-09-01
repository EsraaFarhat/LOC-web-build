import React, { Fragment } from "react";
import NavBar from "../../components/navbar/NavBar";
import AddNewGlobalIdenetifiers from "../../components/global idenetifiers/AddNewGlobalIdenetifiers";
import NotAuthPage from "../../pages/NotAuth/NotAuthPage";
import { notAdmin } from "../../util/roles";
import { useSelector } from "react-redux";

const AddNewGlobalIdenetifiersPage = () => {
  const role = useSelector((state) => state.login.role);

  if (!notAdmin.includes(role)) return <NotAuthPage />;

  return (
    <Fragment>
      <NavBar />
      <AddNewGlobalIdenetifiers />
    </Fragment>
  );
};
export default AddNewGlobalIdenetifiersPage;
