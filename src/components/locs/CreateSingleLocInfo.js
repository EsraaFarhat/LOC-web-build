import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  onAddingSingleLoc,
  onChangeLocsInputs,
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

const CreateSingleLocInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [disableBtn, setDisableBtn] = useState(false);
  const { id } = useParams();
  const { singleLocForm, loading } = useSelector((state) => state.locs);
  const token = useSelector((state) => state.login.token);
  const { selectedIdentifier } = useSelector((state) => state.globalIdentifier);
  const { selectedEditProject } = useSelector((state) => state.projects);
  const { selectedEditLocation } = useSelector((state) => state.locations);

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
          <div className="col-12 col-md-6 m-auto">
            <h3 className="text-center mt-3">Create single LOC</h3>
            <form
              className="form-horizontal mt-3"
              role="form"
              onSubmit={(e) =>
                dispatch(
                  onAddingSingleLoc(
                    e,
                    token,
                    singleLocForm.routeId.value,
                    singleLocForm.origin.value,
                    singleLocForm.filed1.value,
                    singleLocForm.filed2.value,
                    singleLocForm.filed3.value,
                    "sm2",
                    "single",
                    id,
                    singleLocForm.origin_status.value,
                    gid,
                    navigate
                  )
                )
              }
            >
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
                  id="RouteID"
                  placeholder="RouteID"
                  onChange={(e) =>
                    dispatch(onChangeLocsInputs(e.target.value, "routeId"))
                  }
                  value={singleLocForm.routeId.value}
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
                  htmlFor="RouteID"
                  className="form-label"
                  style={{ color: "#0987B1" }}
                >
                  Origin
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="origin"
                  id="origin"
                  placeholder="Origin"
                  onChange={(e) =>
                    dispatch(onChangeLocsInputs(e.target.value, "origin"))
                  }
                  value={singleLocForm.origin.value}
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
              {/* <div className="mb-3 m-auto col-8 col-md-8">
                <label
                  htmlFor="MISC"
                  className="form-label"
                  style={{ color: "#0987B1" }}
                >
                  MISC
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="MISC"
                  id="MISC"
                  placeholder="MISC"
                  onChange={(e) =>
                    dispatch(onChangeLocsInputs(e.target.value, "MISC"))
                  }
                  value={singleLocForm.MISC.value}
                />
              </div> */}
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
                  id="Field1"
                  placeholder="Field 1"
                  onChange={(e) =>
                    dispatch(onChangeLocsInputs(e.target.value, "filed1"))
                  }
                  value={singleLocForm.filed1.value}
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
                  id="Field2"
                  placeholder="Field 2"
                  onChange={(e) =>
                    dispatch(onChangeLocsInputs(e.target.value, "filed2"))
                  }
                  value={singleLocForm.filed2.value}
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
                  id="Field3"
                  placeholder="Field 3"
                  onChange={(e) =>
                    dispatch(onChangeLocsInputs(e.target.value, "filed3"))
                  }
                  value={singleLocForm.filed3.value}
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
              {/* <div className="mb-3 m-auto col-8 col-md-8">
                <label
                  htmlFor="Field2"
                  className="form-label"
                  style={{ color: "#0987B1" }}
                >
                  Status
                </label>
                <select
                  id="select"
                  className="form-select mt-1 p-2"
                  onChange={(e) =>
                    dispatch(onChangeLocsInputs(e.target.value, "status"))
                  }
                  value={singleLocForm.origin_status.value}
                >

                  <option value="unassigned" selected="selected">Unassigned</option>
                  <option value="assigned">Assigned</option>
                </select>
              </div> */}

              <div className="d-flex justify-content-center mb-4">
                <button
                  disabled={
                    disableBtn
                      ? disableBtn
                      : !(
                          (
                            singleLocForm.routeId.valid &&
                            singleLocForm.origin.valid &&
                            singleLocForm.filed1.valid &&
                            singleLocForm.filed2.valid &&
                            singleLocForm.filed3.valid
                          )
                          // singleLocForm.status.valid
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

export default CreateSingleLocInfo;
