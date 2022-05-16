import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import { onFetchingLocations } from "../../store/Locations/LocationsReducers";

const styleLinkBack = {
  textDecoration: "none",
  color: "#717993",
  fontSize: "22px",
};

const ViewLocs = () => {
  const { id } = useParams();

  const token = useSelector((state) => state.login.token);
  // const { selectedIdentifier } = useSelector((state) => state.globalIdentifier);
  // const { selectedEditProject } = useSelector((state) => state.projects);
  // const { selectedEditLocation } = useSelector((state) => state.locations);

  const [globalIdentifier, setGlobalIdenetifier] = useState(null);
  const [project, setProject] = useState(null);
  const [location, setLocation] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(onFetchingLocations(id, token));

    fetch(`http://63.33.18.108:5000/api/locations/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((resData) => {
        console.log(resData);
        setGlobalIdenetifier(resData.globalIdentifier);
        setProject(resData.project);
        setLocation(resData.location);
      });
  }, [dispatch]);

  return (
    <Fragment>
      <div className="container">
        {globalIdentifier?.name && project?.name && location?.name ? (
          <Fragment>
            <Link
              to={"/globalidenetifiers/projects/" + globalIdentifier.gid}
              style={styleLinkBack}
            >
              {globalIdentifier.name}
            </Link>
            <span className="mx-2" style={{ color: "#28345C" }}>
              <i className="fas fa-chevron-right"></i>
              <i className="fas fa-chevron-right"></i>
            </span>
            <Link to={"/locations/" + project.id} style={styleLinkBack}>
              {project.name}
            </Link>
            <span className="mx-2" style={{ color: "#28345C" }}>
              <i className="fas fa-chevron-right"></i>
              <i className="fas fa-chevron-right"></i>
            </span>
            <Link to={"/viewlocs/" + location.id} style={styleLinkBack}>
              {location.name}
            </Link>
          </Fragment>
        ) : null}

        {/* {selectedEditProject.name && selectedIdentifier.name ? (
          <Fragment>
            <Link
              to={"/globalidenetifiers/projects/" + selectedEditProject.gid}
              style={styleLinkBack}
            >
              {selectedIdentifier.name}
            </Link>
            <span className="mx-2" style={{ color: "#28345C" }}>
              <i className="fas fa-chevron-right"></i>
              <i className="fas fa-chevron-right"></i>
            </span>
            <Link
              to={"/locations/" + selectedEditProject.id}
              style={styleLinkBack}
            >
              {selectedEditProject.name}
            </Link>
            <span className="mx-2" style={{ color: "#28345C" }}>
              <i className="fas fa-chevron-right"></i>
              <i className="fas fa-chevron-right"></i>
            </span>
            <Link
              to={"/viewlocs/" + selectedEditLocation.id}
              style={styleLinkBack}
            >
              {selectedEditLocation.name}
            </Link>
          </Fragment>
        ) : null} */}

        {/* <Link to={"/gid"} style={styleLinkBack}>
            GID 1
        </Link>
        <span className="mx-2" style={{ color: "#28345C" }}>
          <i className="fas fa-chevron-right"></i>
          <i className="fas fa-chevron-right"></i>
        </span>
        <Link to={"/gid"} style={styleLinkBack}>
            Project 1
        </Link>
        <span className="mx-2" style={{ color: "#28345C" }}>
          <i className="fas fa-chevron-right"></i>
          <i className="fas fa-chevron-right"></i>
        </span>
        <Link to={"/gid"} style={styleLinkBack}>
            Location 1
        </Link> */}
        <div className="row my-5">
          <div className="col-12 col-md-8 col-lg-6 m-auto">
            <div className="d-flex justify-content-center">
              <Link
                to={"/assignedlocs/" + id}
                className="btn btn-primary p-3 w-50"
                style={{
                  width: "100%",
                  fontSize: 15,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <span style={{ width: "80%" }}>VIEW ASSIGNED LOCs</span>
                <div
                  style={{
                    marginLeft: 10,
                    backgroundColor: "#000",
                    width: 25,
                    height: 25,
                    borderRadius: 12.5,
                    border: "1px solid #fff",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <i className="fas fa-check"></i>
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-md-8 col-lg-6 m-auto">
            <div className="d-flex justify-content-center">
              <Link
                to={"/unassignedlocs/" + id}
                className="btn btn-success p-3 w-50"
                style={{
                  backgroundColor: "#09B13B",
                  fontSize: 15,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <span style={{ width: "80%" }}>VIEW UNASSIGNED LOCS</span>
                <div
                  style={{
                    marginLeft: 10,
                    backgroundColor: "#000",
                    width: 25,
                    height: 25,
                    borderRadius: 12.5,
                    border: "1px solid #fff",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <i className="fas fa-close"></i>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default ViewLocs;
