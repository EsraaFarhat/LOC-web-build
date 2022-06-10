import React, { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  onAddingDualLoc,
  onChangeLocsDualInputs,
} from "../../store/Locs/LocsReducer";

import { PropagateLoader } from "react-spinners";
import { css } from "@emotion/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import KelTechMap from "../Map/KelTechMap";
import LOCMap from "../Map/LOCMap";
import { onFetchingSpecificLocation } from "../../store/Locations/LocationsReducers";
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

const CreateDualLocInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [disableBtn, setDisableBtn] = useState(false);
  const { id } = useParams();
  const { dualLocForm, loading } = useSelector((state) => state.locs);
  const { specificLocation } = useSelector((state) => state.locations);
  const token = useSelector((state) => state.login.token);
  const [radius, setRadius] = useState(10);
  // const { selectedIdentifier } = useSelector((state) => state.globalIdentifier);
  // const { selectedEditProject } = useSelector((state) => state.projects);
  // const { selectedEditLocation } = useSelector((state) => state.locations);

  const [globalIdentifier, setGlobalIdenetifier] = useState(null);
  const [project, setProject] = useState(null);
  const [location, setLocation] = useState(null);
  const [gid, setGid] = useState("");

  useEffect(() => {
    fetch(`https://api.loc.store/api/locations/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((resData) => {
        console.log(resData);
        setGlobalIdenetifier(resData.globalIdentifier);
        setProject(resData.project);
        setLocation(resData.location);
        setGid(resData.globalIdentifier.gid);
        // console.log(location);
      });

    dispatch(onFetchingSpecificLocation(id, token));
  }, []);
  return (
    <Fragment>
      <div className="container">
        <ToastContainer />

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
            <Link to={"/globalidenetifiers"} style={styleLinkBack}>
              {selectedIdentifier.name}
            </Link>
            <span className="mx-2" style={{ color: "#28345C" }}>
              <i className="fas fa-chevron-right"></i>
              <i className="fas fa-chevron-right"></i>
            </span>
            <Link
              to={"/globalidenetifiers/projects/" + selectedEditProject.gid}
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
        <div className="row">
          <div className="col-12 col-md-10 m-auto">
            <h3 className="text-center mt-3">Create dual LOC</h3>
            <form
              className="form-horizontal mt-3"
              role="form"
              onSubmit={(e) => {
                e.preventDefault();
                dispatch(
                  onAddingDualLoc(
                    e,
                    token,
                    dualLocForm.routeId.value,
                    dualLocForm.cableOrigin.value,
                    dualLocForm.filed1Origin.value,
                    dualLocForm.filed2Origin.value,
                    dualLocForm.filed3Origin.value,
                    "dm5",
                    "dual",
                    id,
                    dualLocForm.origin_status.value,
                    dualLocForm.destination_status.value,
                    dualLocForm.cableDestination.value,
                    dualLocForm.filed1Destination.value,
                    dualLocForm.filed2Destination.value,
                    dualLocForm.filed3Destination.value,
                    dualLocForm.lat.value,
                    dualLocForm.long.value,
                    dualLocForm.radius.value,
                    gid,
                    navigate
                  )
                );
              }}
            >
              <div className="mb-3 m-auto col-10 col-md-5">
                <label
                  htmlFor="RouteID"
                  className="form-label"
                  style={{ color: "#0987B1" }}
                >
                  Route ID
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="RouteID"
                  id="RouteID"
                  onChange={(e) =>
                    dispatch(onChangeLocsDualInputs(e.target.value, "routeId"))
                  }
                  value={dualLocForm.routeId.value}
                  style={
                    dualLocForm.routeId.valid ? {} : { border: "1px solid red" }
                  }
                />
                {dualLocForm.routeId.valid ? null : (
                  <div style={{ color: "red", fontSize: 14 }}>
                    {dualLocForm.routeId.validationError}
                  </div>
                )}
              </div>
              <div className="row">
                <div className="col-12 col-md-6 m-auto">
                  <div className="mb-3 m-auto col-10 col-md-8">
                    <h5 className="mt-3">LOC Origin</h5>
                    <label
                      htmlFor="CableOrigin"
                      className="form-label"
                      style={{ color: "#0987B1" }}
                    >
                      Cable Origin
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="CableOrigin"
                      id="RouteID"
                      onChange={(e) =>
                        dispatch(
                          onChangeLocsDualInputs(e.target.value, "cableOrigin")
                        )
                      }
                      value={dualLocForm.cableOrigin.value}
                      style={
                        dualLocForm.cableOrigin.valid
                          ? {}
                          : { border: "1px solid red" }
                      }
                    />
                    {dualLocForm.cableOrigin.valid ? null : (
                      <div style={{ color: "red", fontSize: 14 }}>
                        {dualLocForm.cableOrigin.validationError}
                      </div>
                    )}
                  </div>
                  <div className="mb-3 m-auto col-10 col-md-8">
                    <label
                      htmlFor="Field1"
                      className="form-label"
                      style={{ color: "#0987B1" }}
                    >
                      Field 1
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="Field1"
                      id="Field1"
                      onChange={(e) =>
                        dispatch(
                          onChangeLocsDualInputs(e.target.value, "filed1Origin")
                        )
                      }
                      value={dualLocForm.filed1Origin.value}
                      style={
                        dualLocForm.filed1Origin.valid
                          ? {}
                          : { border: "1px solid red" }
                      }
                    />
                    {dualLocForm.filed1Origin.valid ? null : (
                      <div style={{ color: "red", fontSize: 14 }}>
                        {dualLocForm.filed1Origin.validationError}
                      </div>
                    )}
                  </div>
                  <div className="mb-3 m-auto col-10 col-md-8">
                    <label
                      htmlFor="Field2"
                      className="form-label"
                      style={{ color: "#0987B1" }}
                    >
                      Field 2
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="Field2"
                      id="Field2"
                      onChange={(e) =>
                        dispatch(
                          onChangeLocsDualInputs(e.target.value, "filed2Origin")
                        )
                      }
                      value={dualLocForm.filed2Origin.value}
                      style={
                        dualLocForm.filed2Origin.valid
                          ? {}
                          : { border: "1px solid red" }
                      }
                    />
                    {dualLocForm.filed2Origin.valid ? null : (
                      <div style={{ color: "red", fontSize: 14 }}>
                        {dualLocForm.filed2Origin.validationError}
                      </div>
                    )}
                  </div>
                  <div className="mb-3 m-auto col-10 col-md-8">
                    <label
                      htmlFor="Field3"
                      className="form-label"
                      style={{ color: "#0987B1" }}
                    >
                      Field 3
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="Field3"
                      id="Field3"
                      onChange={(e) =>
                        dispatch(
                          onChangeLocsDualInputs(e.target.value, "filed3Origin")
                        )
                      }
                      value={dualLocForm.filed3Origin.value}
                      style={
                        dualLocForm.filed3Origin.valid
                          ? {}
                          : { border: "1px solid red" }
                      }
                    />
                    {dualLocForm.filed3Origin.valid ? null : (
                      <div style={{ color: "red", fontSize: 14 }}>
                        {dualLocForm.filed3Origin.validationError}
                      </div>
                    )}
                  </div>
                  {/* <div className="mb-3 m-auto col-10 col-md-8">
                    <label
                      htmlFor="Field2"
                      className="form-label"
                      style={{ color: "#0987B1" }}
                    >
                      Origin Status
                    </label>
                    <select
                      style={{ width: "100%" }}
                      id="select"
                      className="form-select mt-1 p-2"
                      onChange={(e) =>
                        dispatch(
                          onChangeLocsDualInputs(
                            e.target.value,
                            "origin_status"
                          )
                        )
                      }
                      value={dualLocForm.origin_status.value}
                      style={
                        dualLocForm.status.valid
                          ? {}
                          : { border: "1px solid red" }
                      }
                    >
                      <option value="unassigned">Unassigned</option>
                      <option value="assigned">Assigned</option>
                    </select>
                  </div> */}
                </div>

                <div className="col-12 col-md-6 m-auto">
                  <div className="mb-3 m-auto col-10 col-md-8">
                    <h5 className="mt-3">LOC Destination</h5>
                    <label
                      htmlFor="CableDestination"
                      className="form-label"
                      style={{ color: "#0987B1" }}
                    >
                      Cable Destination
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="CableDestination"
                      id="RouteID"
                      onChange={(e) =>
                        dispatch(
                          onChangeLocsDualInputs(
                            e.target.value,
                            "cableDestination"
                          )
                        )
                      }
                      value={dualLocForm.cableDestination.value}
                      style={
                        dualLocForm.cableDestination.valid
                          ? {}
                          : { border: "1px solid red" }
                      }
                    />
                    {dualLocForm.cableDestination.valid ? null : (
                      <div style={{ color: "red", fontSize: 14 }}>
                        {dualLocForm.cableDestination.validationError}
                      </div>
                    )}
                  </div>
                  <div className="mb-3 m-auto col-10 col-md-8">
                    <label
                      htmlFor="Field1"
                      className="form-label"
                      style={{ color: "#0987B1" }}
                    >
                      Field 1
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="Field1"
                      id="Field1"
                      onChange={(e) =>
                        dispatch(
                          onChangeLocsDualInputs(
                            e.target.value,
                            "filed1Destination"
                          )
                        )
                      }
                      value={dualLocForm.filed1Destination.value}
                      style={
                        dualLocForm.filed1Destination.valid
                          ? {}
                          : { border: "1px solid red" }
                      }
                    />
                    {dualLocForm.filed1Destination.valid ? null : (
                      <div style={{ color: "red", fontSize: 14 }}>
                        {dualLocForm.filed1Destination.validationError}
                      </div>
                    )}
                  </div>
                  <div className="mb-3 m-auto col-10 col-md-8">
                    <label
                      htmlFor="Field2"
                      className="form-label"
                      style={{ color: "#0987B1" }}
                    >
                      Field 2
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="Field2"
                      id="Field2"
                      onChange={(e) =>
                        dispatch(
                          onChangeLocsDualInputs(
                            e.target.value,
                            "filed2Destination"
                          )
                        )
                      }
                      value={dualLocForm.filed2Destination.value}
                      style={
                        dualLocForm.filed2Destination.valid
                          ? {}
                          : { border: "1px solid red" }
                      }
                    />
                    {dualLocForm.filed2Destination.valid ? null : (
                      <div style={{ color: "red", fontSize: 14 }}>
                        {dualLocForm.filed2Destination.validationError}
                      </div>
                    )}
                  </div>
                  <div className="mb-3 m-auto col-10 col-md-8">
                    <label
                      htmlFor="Field3"
                      className="form-label"
                      style={{ color: "#0987B1" }}
                    >
                      Field 3
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="Field3"
                      id="Field3"
                      onChange={(e) =>
                        dispatch(
                          onChangeLocsDualInputs(
                            e.target.value,
                            "filed3Destination"
                          )
                        )
                      }
                      value={dualLocForm.filed3Destination.value}
                      style={
                        dualLocForm.filed3Destination.valid
                          ? {}
                          : { border: "1px solid red" }
                      }
                    />
                    {dualLocForm.filed3Destination.valid ? null : (
                      <div style={{ color: "red", fontSize: 14 }}>
                        {dualLocForm.filed3Destination.validationError}
                      </div>
                    )}
                  </div>

                  {/* <div className="mb-3 m-auto col-10 col-md-8">
                    <label
                      htmlFor="Field2"
                      className="form-label"
                      style={{ color: "#0987B1" }}
                    >
                      Destination Status
                    </label>
                    <select
                      style={{ width: "100%" }}
                      id="select"
                      className="form-select mt-1 p-2"
                      onChange={(e) =>
                        dispatch(
                          onChangeLocsDualInputs(
                            e.target.value,
                            "destination_status"
                          )
                        )
                      }
                      value={dualLocForm.destination_status.value}
                      style={
                        dualLocForm.status.valid
                          ? {}
                          : { border: "1px solid red" }
                      }
                    >
                      <option value="unassigned">Unassigned</option>
                      <option value="assigned">Assigned</option>
                    </select>
                  </div> */}
                </div>
              </div>

              <div className="row">
                <div className="col-10 col-md-8 col-lg-7 m-auto">
                  <h5 className="text-center my-3">LOC Location</h5>
                  <LOCMap
                    radius={radius}
                    cmp={"dual"}
                    locationLat={specificLocation.latitude}
                    locationLong={specificLocation.longitude}
                  />

                  <div className="row my-3">
                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
                        name="Latitude"
                        placeholder="Latitude"
                        disabled={true}
                        onChange={(e) => {
                          dispatch(
                            onChangeLocsDualInputs(
                              Number(e.target.value),
                              "lat"
                            )
                          );
                        }}
                        value={
                          dualLocForm.lat.value !== ""
                            ? dualLocForm.lat.value?.toFixed(2)
                            : dualLocForm.lat.value
                        }
                        style={
                          dualLocForm.lat.valid
                            ? {}
                            : { border: "1px solid red" }
                        }
                      />
                      {true ? null : (
                        <div style={{ color: "red", fontSize: 14 }}>
                          {dualLocForm.lat.validationError}
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
                            onChangeLocsDualInputs(
                              Number(e.target.value),
                              "long"
                            )
                          )
                        }
                        value={
                          dualLocForm.long.value !== ""
                            ? dualLocForm.long.value?.toFixed(2)
                            : dualLocForm.long.value
                        }
                        style={
                          dualLocForm.long.valid
                            ? {}
                            : { border: "1px solid red" }
                        }
                      />
                      {true ? null : (
                        <div style={{ color: "red", fontSize: 14 }}>
                          {dualLocForm.long.validationError}
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
                        dispatch(
                          onChangeLocsDualInputs(e.target.value, "radius")
                        );
                        setRadius(e.target.value);
                      }}
                      value={
                        dualLocForm.radius.value ? dualLocForm.radius.value : 10
                      }
                      // style={
                      //   dualLocForm.radius.valid
                      //     ? {}
                      //     : { border: "1px solid red" }
                      // }
                    />
                    <span style={{ marginLeft: 5 }}>Meter</span>
                  </div>
                  {/* {dualLocForm.radius.valid ? null : (
                    <div style={{ color: "red", fontSize: 14 }}>
                      {dualLocForm.radius.validationError}
                    </div>
                  )} */}

                  {/* {dualLocForm.status.valid ? null : (
                    <div style={{ color: "red", fontSize: 14 }}>
                      {dualLocForm.status.validationError}
                    </div>
                  )} */}

                  <div className="d-flex justify-content-center my-4">
                    <button
                      disabled={
                        disableBtn
                          ? disableBtn
                          : !(
                              (
                                dualLocForm.routeId.valid &&
                                dualLocForm.cableOrigin.valid &&
                                dualLocForm.filed1Origin.valid &&
                                dualLocForm.filed2Origin.valid &&
                                dualLocForm.filed3Origin.valid &&
                                dualLocForm.cableDestination.valid &&
                                dualLocForm.filed1Destination.valid &&
                                dualLocForm.filed2Destination.valid &&
                                dualLocForm.filed3Destination.valid &&
                                true &&
                                dualLocForm.long.valid
                              )
                              // && dualLocForm.radius.valid
                              // dualLocForm.status.valid
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
                      {loading ? (
                        <PropagateLoader
                          color={"#fff"}
                          css={override}
                          size={10}
                        />
                      ) : (
                        "Create"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CreateDualLocInfo;
