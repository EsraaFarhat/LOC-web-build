import React, { Fragment } from "react";
import NavBar from "../../components/navbar/NavBar";
import Projects from "../../components/project/Projects";
import NotAuthPage from "../../pages/NotAuth/NotAuthPage";

import { notAdmin } from "../../util/roles";
import { useSelector } from "react-redux";

const ProjectsPage = () => {
  const role = useSelector((state) => state.login.role);

  if (!notAdmin.includes(role)) return <NotAuthPage />;
  return (
    <Fragment>
      <NavBar />
      <Projects />
    </Fragment>
  );
};
export default ProjectsPage;
