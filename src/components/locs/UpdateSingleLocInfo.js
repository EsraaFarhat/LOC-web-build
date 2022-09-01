import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  onChangeLocsInputs,
  onEditingSingleLoc,
  onFetchingSpecificLoc,
} from "../../store/Locs/LocsReducer";

import { PropagateLoader } from "react-spinners";
import { css } from "@emotion/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { url } from "../../constants";
import { notUser } from "../../util/roles";

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

const UpdateSingleLocInfo = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [disableBtn, setDisableBtn] = useState(false);
  const { token, role } = useSelector((state) => state.login);

  const { selectedIdentifier } = useSelector((state) => state.globalIdentifier);
  const { selectedEditProject } = useSelector((state) => state.projects);
  const { selectedEditLocation } = useSelector((state) => state.locations);

  const [globalIdentifier, setGlobalIdenetifier] = useState(null);
  const [project, setProject] = useState(null);
  const [location, setLocation] = useState(null);
  const [gid, setGid] = useState("");

  const { specificLoc, singleLocForm, loadEdit } = useSelector(
    (state) => state.locs
  );
  useEffect(() => {
    dispatch(onFetchingSpecificLoc(id, token));
  }, [dispatch, id, token]);

  useEffect(() => {
    if (specificLoc.loc_id) {
      dispatch(onChangeLocsInputs(specificLoc.route_id, "routeId"));
      dispatch(onChangeLocsInputs(specificLoc.origin, "origin"));
      dispatch(onChangeLocsInputs(specificLoc.field_1, "filed1"));
      dispatch(onChangeLocsInputs(specificLoc.field_2, "filed2"));
      dispatch(onChangeLocsInputs(specificLoc.field_3, "filed3"));
      // dispatch(onChangeLocsInputs("sm2", "routeId"));

      dispatch(onChangeLocsInputs(specificLoc.cable_status, "origin_status"));
    }
  }, [specificLoc]);

  useEffect(() => {
    fetch(`${url}/api/LOCs/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((resData) => {
        setGlobalIdenetifier(resData.globalIdentifier);
        setProject(resData.project);
        setLocation(resData.location);
        setGid(resData.globalIdentifier.gid);
      });
  }, []);

  return (
    <Fragment>
      <ToastContainer />
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
        <div className="row">
          <div className="col-12 col-md-6 m-auto">
            <h3 className="text-center mt-3">UPDATE SINGLE LOC INFO</h3>
            <form
              className="form-horizontal mt-3"
              role="form"
              onSubmit={(e) => {
                e.preventDefault();
                dispatch(
                  onEditingSingleLoc(
                    e,
                    token,
                    specificLoc.loc_id,
                    singleLocForm.routeId.value,
                    singleLocForm.origin.value,
                    singleLocForm.filed1.value,
                    singleLocForm.filed2.value,
                    singleLocForm.filed3.value,
                    "sm2",
                    id,
                    singleLocForm.origin_status.value,
                    gid,
                    navigate
                  )
                );
              }}
            >
              {notUser.includes(role) && (
                <>
                  <div className="mb-3 m-auto col-8 col-md-8">
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
                      value={singleLocForm.routeId.value}
                      onChange={(e) =>
                        dispatch(onChangeLocsInputs(e.target.value, "routeId"))
                      }
                      style={
                        singleLocForm.routeId.valid
                          ? {}
                          : { border: "1px solid red" }
                      }
                    />
                    {singleLocForm.routeId.valid ? null : (
                      <div style={{ color: "red", fontSize: 14 }}>
                        {singleLocForm.routeId.validationError}
                      </div>
                    )}
                  </div>
                  <div className="mb-3 m-auto col-8 col-md-8">
                    <label
                      htmlFor="Origin"
                      className="form-label"
                      style={{ color: "#0987B1" }}
                    >
                      Origin
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="Origin"
                      defaultValue="CO1"
                      id="Origin"
                      value={singleLocForm.origin.value}
                      onChange={(e) =>
                        dispatch(onChangeLocsInputs(e.target.value, "origin"))
                      }
                      style={
                        singleLocForm.origin.valid
                          ? {}
                          : { border: "1px solid red" }
                      }
                    />
                    {singleLocForm.origin.valid ? null : (
                      <div style={{ color: "red", fontSize: 14 }}>
                        {singleLocForm.origin.validationError}
                      </div>
                    )}
                  </div>
                  <div className="mb-3 m-auto col-8 col-md-8">
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
                      value={singleLocForm.filed1.value}
                      onChange={(e) =>
                        dispatch(onChangeLocsInputs(e.target.value, "filed1"))
                      }
                      style={
                        singleLocForm.filed1.valid
                          ? {}
                          : { border: "1px solid red" }
                      }
                    />
                    {singleLocForm.filed1.valid ? null : (
                      <div style={{ color: "red", fontSize: 14 }}>
                        {singleLocForm.filed1.validationError}
                      </div>
                    )}
                  </div>
                  <div className="mb-3 m-auto col-8 col-md-8">
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
                      defaultValue="OF12"
                      id="Field2"
                      value={singleLocForm.filed2.value}
                      onChange={(e) =>
                        dispatch(onChangeLocsInputs(e.target.value, "filed2"))
                      }
                      style={
                        singleLocForm.filed2.valid
                          ? {}
                          : { border: "1px solid red" }
                      }
                    />
                    {singleLocForm.filed2.valid ? null : (
                      <div style={{ color: "red", fontSize: 14 }}>
                        {singleLocForm.filed2.validationError}
                      </div>
                    )}
                  </div>
                  <div className="mb-3 m-auto col-8 col-md-8">
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
                      defaultValue="OF12"
                      id="Field3"
                      value={singleLocForm.filed3.value}
                      onChange={(e) =>
                        dispatch(onChangeLocsInputs(e.target.value, "filed3"))
                      }
                      style={
                        singleLocForm.filed3.valid
                          ? {}
                          : { border: "1px solid red" }
                      }
                    />
                    {singleLocForm.filed3.valid ? null : (
                      <div style={{ color: "red", fontSize: 14 }}>
                        {singleLocForm.filed3.validationError}
                      </div>
                    )}
                  </div>
                </>
              )}
              <div className="mb-3 m-auto col-8 col-md-8">
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
                      onChangeLocsInputs(e.target.value, "origin_status")
                    )
                  }
                  value={singleLocForm.origin_status.value}
                  style={
                    singleLocForm.origin_status.valid
                      ? {}
                      : { border: "1px solid red" }
                  }
                >
                  <option value="unassigned">Unassigned</option>
                  <option value="assigned">Assigned</option>
                  {/* <option value="user">USER</option> */}
                </select>
                {singleLocForm.origin_status.valid ? null : (
                  <div style={{ color: "red", fontSize: 14 }}>
                    {singleLocForm.origin_status.validationError}
                  </div>
                )}
              </div>
              <div className="d-flex justify-content-center my-4">
                <button
                  disabled={
                    disableBtn
                      ? disableBtn
                      : !(
                          singleLocForm.routeId.valid &&
                          singleLocForm.origin.valid &&
                          singleLocForm.filed1.valid &&
                          singleLocForm.filed2.valid &&
                          singleLocForm.filed3.valid
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
                    <PropagateLoader color={"#fff"} css={override} size={10} />
                  ) : (
                    "Save"
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

export default UpdateSingleLocInfo;
