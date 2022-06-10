import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  onChangeLocsDualInputs,
  onEditingDualLoc,
  onFetchingSpecificLoc,
} from "../../store/Locs/LocsReducer";

import { PropagateLoader } from "react-spinners";
import { css } from "@emotion/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

const UpdateDualLocInfo = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [disableBtn, setDisableBtn] = useState(false);
  const token = useSelector((state) => state.login.token);
  const { selectedIdentifier } = useSelector((state) => state.globalIdentifier);
  const { selectedEditProject } = useSelector((state) => state.projects);
  const { selectedEditLocation } = useSelector((state) => state.locations);

  const [globalIdentifier, setGlobalIdenetifier] = useState(null);
  const [project, setProject] = useState(null);
  const [location, setLocation] = useState(null);
  const [gid, setGid] = useState("");

  const { specificLoc, dualLocForm, loadEdit } = useSelector(
    (state) => state.locs
  );
  useEffect(() => {
    dispatch(onFetchingSpecificLoc(id, token));
  }, [dispatch, id, token]);

  useEffect(() => {
    if (specificLoc.loc_id) {
      dispatch(onChangeLocsDualInputs(specificLoc.route_id, "routeId"));
      dispatch(onChangeLocsDualInputs(specificLoc.origin, "cableOrigin"));
      dispatch(onChangeLocsDualInputs(specificLoc.field_1, "filed1Origin"));
      dispatch(onChangeLocsDualInputs(specificLoc.field_2, "filed2Origin"));
      dispatch(onChangeLocsDualInputs(specificLoc.field_3, "filed3Origin"));
      // dispatch(onChangeLocsDualInputs("sm2", "routeId"));
      dispatch(
        onChangeLocsDualInputs(
          specificLoc.LOCDestination && specificLoc.LOCDestination.destination,
          "cableDestination"
        )
      );
      dispatch(
        onChangeLocsDualInputs(
          specificLoc.LOCDestination &&
            specificLoc.LOCDestination.destination_field_1,
          "filed1Destination"
        )
      );
      dispatch(
        onChangeLocsDualInputs(
          specificLoc.LOCDestination &&
            specificLoc.LOCDestination.destination_field_2,
          "filed2Destination"
        )
      );
      dispatch(
        onChangeLocsDualInputs(
          specificLoc.LOCDestination &&
            specificLoc.LOCDestination.destination_field_3,
          "filed3Destination"
        )
      );
      dispatch(
        onChangeLocsDualInputs(
          specificLoc.LOCDestination && specificLoc.origin_status,
          "origin_status"
        )
      );
      dispatch(
        onChangeLocsDualInputs(
          specificLoc.LOCDestination &&
            specificLoc.LOCDestination.destination_status,
          "destination_status"
        )
      );
    }
  }, [specificLoc]);

  useEffect(() => {
    fetch(`https://api.loc.store/api/LOCs/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((resData) => {
        console.log(resData);
        setGlobalIdenetifier(resData.globalIdentifier);
        setProject(resData.project);
        setLocation(resData.location);
        setGid(resData.globalIdentifier.gid)
      });
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
        <div className="row">
          <div className="col-12 col-md-10 m-auto">
            <h3 className="text-center mt-3">UPDATE Dual LOC’s INFO</h3>
            <form
              className="form-horizontal mt-3"
              role="form"
              onSubmit={(e) => {
                e.preventDefault();
                specificLoc &&
                  dispatch(
                    onEditingDualLoc(
                      e,
                      token,
                      id,
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
                  defaultValue="r1"
                  id="RouteID"
                  value={dualLocForm.routeId.value}
                  onChange={(e) =>
                    dispatch(onChangeLocsDualInputs(e.target.value, "routeId"))
                  }
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
                      defaultValue="CO1"
                      id="RouteID"
                      value={dualLocForm.cableOrigin.value}
                      onChange={(e) =>
                        dispatch(
                          onChangeLocsDualInputs(e.target.value, "cableOrigin")
                        )
                      }
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
                      defaultValue="OF11"
                      id="Field1"
                      value={dualLocForm.filed1Origin.value}
                      onChange={(e) =>
                        dispatch(
                          onChangeLocsDualInputs(e.target.value, "filed1Origin")
                        )
                      }
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
                      defaultValue="OF11"
                      id="Field2"
                      value={dualLocForm.filed2Origin.value}
                      onChange={(e) =>
                        dispatch(
                          onChangeLocsDualInputs(e.target.value, "filed2Origin")
                        )
                      }
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
                      defaultValue="OF11"
                      id="Field3"
                      value={dualLocForm.filed3Origin.value}
                      onChange={(e) =>
                        dispatch(
                          onChangeLocsDualInputs(e.target.value, "filed3Origin")
                        )
                      }
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

                  <div className="mb-3 m-auto col-10 col-md-8">
                    <label
                      htmlFor="Field3"
                      className="form-label"
                      style={{ color: "#0987B1" }}
                    >
                      Origin Status
                    </label>
                    <select
                      id="select"
                      className="form-select mt-3 p-2"
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
                        dualLocForm.origin_status.valid
                          ? {}
                          : { border: "1px solid red" }
                      }
                    >
                      {/* <option value="">status</option> */}
                      <option value="unassigned">Unassigned</option>
                      <option value="assigned">Assigned</option>
                      {/* <option value="user">USER</option> */}
                    </select>
                    {dualLocForm.origin_status.valid ? null : (
                      <div style={{ color: "red", fontSize: 14 }}>
                        {dualLocForm.origin_status.validationError}
                      </div>
                    )}
                  </div>
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
                      defaultValue="CO1"
                      id="RouteID"
                      value={dualLocForm.cableDestination.value}
                      onChange={(e) =>
                        dispatch(
                          onChangeLocsDualInputs(
                            e.target.value,
                            "cableDestination"
                          )
                        )
                      }
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
                      defaultValue="OF11"
                      id="Field1"
                      value={dualLocForm.filed1Destination.value}
                      onChange={(e) =>
                        dispatch(
                          onChangeLocsDualInputs(
                            e.target.value,
                            "filed1Destination"
                          )
                        )
                      }
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
                      defaultValue="OF11"
                      id="Field2"
                      value={dualLocForm.filed2Destination.value}
                      onChange={(e) =>
                        dispatch(
                          onChangeLocsDualInputs(
                            e.target.value,
                            "filed2Destination"
                          )
                        )
                      }
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
                      defaultValue="OF11"
                      id="Field3"
                      value={dualLocForm.filed3Destination.value}
                      onChange={(e) =>
                        dispatch(
                          onChangeLocsDualInputs(
                            e.target.value,
                            "filed3Destination"
                          )
                        )
                      }
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

                  <div className="mb-3 m-auto col-10 col-md-8">
                    <label
                      htmlFor="Field3"
                      className="form-label"
                      style={{ color: "#0987B1" }}
                    >
                      Destination Status
                    </label>
                    <select
                      id="select"
                      className="form-select mt-3 p-2"
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
                        dualLocForm.destination_status.valid
                          ? {}
                          : { border: "1px solid red" }
                      }
                    >
                      {/* <option value="">status</option> */}
                      <option value="unassigned">Unassigned</option>
                      <option value="assigned">Assigned</option>
                      {/* <option value="user">USER</option> */}
                    </select>
                    {dualLocForm.destination_status.valid ? null : (
                      <div style={{ color: "red", fontSize: 14 }}>
                        {dualLocForm.destination_status.validationError}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-10 col-md-8 col-lg-7 m-auto">
                  {/* <h5 className="text-center my-3">LOC Location</h5>
                  <div className="bg-light mt-3">Map</div>
                  <div className="row my-3">
                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
                        name="Latitude"
                        placeholder="Latitude"
disabled={true}
                      />
                    </div>
                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
                        name="Longitude"
                        placeholder="Longitude"
disabled={true}
                      />
                    </div>
                  </div>

                  <input
                    type="text"
                    className="form-control"
                    name="Radius"
                    placeholder="Radius"
                    id="Radius"
                  /> */}
                  <div className="d-flex justify-content-center my-4">
                    <button
                      disabled={
                        disableBtn
                          ? disableBtn
                          : !(
                              dualLocForm.routeId.valid &&
                              dualLocForm.cableOrigin.valid &&
                              dualLocForm.filed1Origin.valid &&
                              dualLocForm.filed2Origin.valid &&
                              dualLocForm.filed3Origin.valid &&
                              dualLocForm.cableDestination.valid &&
                              dualLocForm.filed1Destination.valid &&
                              dualLocForm.filed2Destination.valid &&
                              dualLocForm.filed3Destination.valid
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
                      {loadEdit ? (
                        <PropagateLoader
                          color={"#fff"}
                          css={override}
                          size={10}
                        />
                      ) : (
                        "Save"
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

export default UpdateDualLocInfo;
