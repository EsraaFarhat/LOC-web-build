import React, { Fragment } from "react";
import NavBar from "../../components/navbar/NavBar";
import CreateSingleLocInfo from "../../components/locs/CreateSingleLocInfo";

const CreateSingleLocInfoPage = () => {
  return (
    <Fragment>
         <NavBar />
         <CreateSingleLocInfo />
    </Fragment>
    );
}
export default CreateSingleLocInfoPage;