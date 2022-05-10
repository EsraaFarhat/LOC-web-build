import React, { Fragment } from "react";
import NavBar from "../../components/navbar/NavBar";
import AddNewProject from "../../components/project/AddNewProject";

const AddNewProjectPage = () => {
  return (
    <Fragment>
         <NavBar />
         <AddNewProject/>
    </Fragment>
    );
}
export default AddNewProjectPage;