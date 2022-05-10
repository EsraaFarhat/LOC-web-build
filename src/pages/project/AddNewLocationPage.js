import React, { Fragment } from "react";
import NavBar from "../../components/navbar/NavBar";
import AddNewLocation from "../../components/project/AddNewLocation";

const AddNewLocationPage = () => {
  return (
    <Fragment>
         <NavBar />
         <AddNewLocation/>
    </Fragment>
    );
}
export default AddNewLocationPage;