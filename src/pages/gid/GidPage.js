import React, { Fragment } from "react";
import NavBar from "../../components/navbar/NavBar";
import Gid from "../../components/gid/Gid";
import NotAuthPage from "../../pages/NotAuth/NotAuthPage";
import { notAdmin } from "../../util/roles";
import { useSelector } from "react-redux";

const GidPage = () => {
  const role = useSelector((state) => state.login.role);

  if (!notAdmin.includes(role)) return <NotAuthPage />;
  return (
    <Fragment>
      <NavBar />
      <Gid />
    </Fragment>
  );
};
export default GidPage;
