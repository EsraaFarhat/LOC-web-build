import React, { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  onAddingLocation,
  onChangeLocationInputs,
} from "../../store/Locations/LocationsReducers";

import { PropagateLoader } from "react-spinners";
import { css } from "@emotion/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import KelTechMap from "../Map/KelTechMap";
import LocationMap from "../Map/LocationMap";
import {
  onFetchingSpecificProject,
  onSelectingProject,
} from "../../store/Projects/ProjectsReducer";

const styleLinkBack = {
  textDecoration: "none",
  color: "#717993",
  fontSize: "22px",
};

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const AddNewLocation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [disableBtn, setDisableBtn] = useState(false);
  const token = useSelector((state) => state.login.token);
  const { id } = useParams();
  const { specificProject } = useSelector((state) => state.projects);
  const { locationForm, loadAdding } = useSelector((state) => state.locations);
  const [radius, setRadius] = useState(2000);

  const [globalIdentifier, setGlobalIdenetifier] = useState(null);
  const [project, setProject] = useState(null);

  useEffect(() => {
    fetch(`https://api.loc.store/api/projects/${id}/locations`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((resData) => {
        console.log(resData);
        setGlobalIdenetifier(resData.globalIdentifier);
        setProject(resData.project);
        console.log("kkkk".resData);
        console.log("jjjjj", globalIdentifier);
      });

    dispatch(onFetchingSpecificProject(id, token));
  }, []);

  return (
    <Fragment>
      <div className="container">
        <ToastContainer />
        {globalIdentifier?.name && project?.name ? (
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
          </Fragment>
        ) : null}
        {/* <Link to={"/gid"} style={styleLinkBack}>
          GID 1
        </Link>
        <span className="mx-2" style={{ color: "#28345C" }}>
          <i className="fas fa-chevron-right"></i>
          <i className="fas fa-chevron-right"></i>
        </span>
        <Link to={"/gid"} style={styleLinkBack}>
          ADD NEW LOCATION
        </Link> */}
        <div className="row">
          <div className="col-10 col-md-6 m-auto">
            <h3 className="text-center my-3">NEW LOCATION</h3>
            <form
              onSubmit={(e) =>
                dispatch(
                  onAddingLocation(
                    e,
                    token,
                    locationForm.name.value,
                    locationForm.lat.value,
                    locationForm.long.value,
                    locationForm.radius.value,
                    id,
                    globalIdentifier.gid,
                    navigate
                  )
                )
              }
            >
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={locationForm.name.value}
                onChange={(e) =>
                  dispatch(onChangeLocationInputs(e.target.value, "name"))
                }
                style={
                  locationForm.name.valid ? {} : { border: "1px solid red" }
                }
              />
              {locationForm.name.valid ? null : (
                <div style={{ color: "red", fontSize: 14 }}>
                  {locationForm.name.validationError}
                </div>
              )}
              {/* <div className="bg-light mt-3">Map</div> */}
              <LocationMap
                radius={radius}
                projectLat={specificProject && specificProject.latitude}
                projectLong={specificProject && specificProject.longitude}
              />

              <div className="row my-3">
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    name="Latitude"
                    placeholder="Latitude"
                    disabled={true}
                    onChange={(e) =>
                      dispatch(
                        onChangeLocationInputs(Number(e.target.value), "lat")
                      )
                    }
                    value={
                      locationForm.lat.value !== ""
                        ? locationForm.lat.value.toFixed(2)
                        : locationForm.lat.value
                    }
                    style={true ? {} : { border: "1px solid red" }}
                  />
                  {true ? null : (
                    <div style={{ color: "red", fontSize: 14 }}>
                      {locationForm.lat.validationError}
                    </div>
                  )}
                </div>
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    name="Longitude"
                    placeholder="Longitude"
                    disabled={true}
                    onChange={(e) =>
                      dispatch(
                        onChangeLocationInputs(Number(e.target.value), "long")
                      )
                    }
                    value={
                      locationForm.long.value !== ""
                        ? locationForm.long.value.toFixed(2)
                        : locationForm.long.value
                    }
                    style={true ? {} : { border: "1px solid red" }}
                  />
                  {true ? null : (
                    <div style={{ color: "red", fontSize: 14 }}>
                      {locationForm.long.validationError}
                    </div>
                  )}
                </div>
              </div>
              <div
                style={{
                  width: "90%",
                  display: "flex",
                  // justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <input
                  type="number"
                  step={10}
                  min={0}
                  className="form-control"
                  name="Radius"
                  placeholder="Radius"
                  id="Radius"
                  onChange={(e) => {
                    dispatch(onChangeLocationInputs(e.target.value, "radius"));
                    setRadius(e.target.value);
                  }}
                  value={
                    locationForm.radius.value !== ""
                      ? locationForm.radius.value
                      : 10
                  }
                  // style={
                  //   locationForm.radius.valid ? {} : { border: "1px solid red" }
                  // }
                />
                <span style={{ marginLeft: 5 }}>Meter</span>
              </div>
              {/* {locationForm.radius.valid ? null : (
                <div style={{ color: "red", fontSize: 14 }}>
                  {locationForm.radius.validationError}
                </div>
              )} */}
              <div className="d-flex justify-content-center my-3">
                <button
                  disabled={
                    disableBtn
                      ? disableBtn
                      : !(
                          (
                            locationForm.name.valid &&
                            locationForm.lat.valid &&
                            locationForm.long.valid
                          )
                          //  && locationForm.radius.valid
                        )
                  }
                  type="submit"
                  className="btn btn-primary w-25"
                  style={{ width: "130px", height: "40px" }}
                  onClick={() => {
                    setTimeout(() => {
                      setDisableBtn(true);
                    }, 1);
                    setTimeout(() => {
                      setDisableBtn(false);
                    }, 2000);
                  }}
                >
                  {loadAdding ? (
                    <PropagateLoader color={"#fff"} css={override} size={10} />
                  ) : (
                    "Create"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default AddNewLocation;
