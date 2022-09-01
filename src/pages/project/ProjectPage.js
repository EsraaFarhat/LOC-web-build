import React, { Fragment } from "react";
import NavBar from "../../components/navbar/NavBar";
import Project from "../../components/project/Project";
import NotAuthPage from "../../pages/NotAuth/NotAuthPage";

import { notAdmin } from "../../util/roles";
import { useSelector } from "react-redux";

const ProjectPage = () => {
  const role = useSelector((state) => state.login.role);

  if (!notAdmin.includes(role)) return <NotAuthPage />;
  return (
    <Fragment>
      <NavBar />
      <Project />
    </Fragment>
  );
};
export default ProjectPage;
