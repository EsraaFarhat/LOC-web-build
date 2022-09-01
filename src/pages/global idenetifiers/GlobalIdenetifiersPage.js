import React, { Fragment } from "react";
import NavBar from "../../components/navbar/NavBar";
import GlobalIdenetifiers from "../../components/global idenetifiers/GlobalIdenetifiers";
import NotAuthPage from "../../pages/NotAuth/NotAuthPage";
import { notAdmin } from "../../util/roles";
import { useSelector } from "react-redux";

const GlobalIdenetifiersPage = () => {
  const role = useSelector((state) => state.login.role);
  if (!notAdmin.includes(role)) return <NotAuthPage />;

  return (
    <Fragment>
      <NavBar />
      <GlobalIdenetifiers />
    </Fragment>
  );
};
export default GlobalIdenetifiersPage;
