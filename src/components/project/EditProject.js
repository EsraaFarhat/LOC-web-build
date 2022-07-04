import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  onChangeProjectInputs,
  onEditingProject,
  onSelectingProject,
} from "../../store/Projects/ProjectsReducer";
import { PropagateLoader } from "react-spinners";
import { css } from "@emotion/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { url } from "../../constants";
import EditProjectMap from "../Map/EditProjectMap";

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
const EditProject = () => {
  const navigate = useNavigate();
  const [disableBtn, setDisableBtn] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.login.token);
  const [globalIdentifier, setGlobalIdenetifier] = useState(null);
  const [radius, setRadius] = useState(2000);

  const { projects, selectedEditProject, projectForm, loadEditProject } =
    useSelector((state) => state.projects);

  useEffect(() => {
    dispatch(onSelectingProject(id));
    if (selectedEditProject && selectedEditProject.id) {
      dispatch(onChangeProjectInputs(selectedEditProject.name, "name"));
      dispatch(onChangeProjectInputs(selectedEditProject.latitude, "lat"));
      dispatch(onChangeProjectInputs(selectedEditProject.longitude, "long"));
      dispatch(onChangeProjectInputs(selectedEditProject.radius, "radius"));
    }
  }, [projects, selectedEditProject]);

  useEffect(() => {
    fetch(`${url}/api/projects/${id}/locations`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((resData) => {
        setGlobalIdenetifier(resData.globalIdentifier);
      });
  }, []);
  return (
    <Fragment>
      <div className="container">
        <ToastContainer />
        {globalIdentifier?.name ? (
          <Link
            to={"/globalidenetifiers/projects/" + globalIdentifier.gid}
            style={styleLinkBack}
          >
            {globalIdentifier.name}
          </Link>
        ) : null}
        {/* <Link to={"/gid"} style={styleLinkBack}>
          GID 1
        </Link>
        <span className="mx-2" style={{ color: "#28345C" }}>
          <i className="fas fa-chevron-right"></i>
          <i className="fas fa-chevron-right"></i>
        </span>
        <Link to={"/gid"} style={styleLinkBack}>
          EDIT Project 1
        </Link> */}
        <div className="row">
          <div className="col-10 col-md-6 m-auto">
            <h3 className="text-center my-3 text-uppercase">EDIT PROJECT</h3>
            <form
              onSubmit={(e) =>
                dispatch(
                  onEditingProject(
                    e,
                    id,
                    token,
                    projectForm.name.value,
                    projectForm.lat.value,
                    projectForm.long.value,
                    projectForm.radius.value,
                    navigate
                  )
                )
              }
            >
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                onChange={(e) =>
                  dispatch(onChangeProjectInputs(e.target.value, "name"))
                }
                value={
                  projectForm.name.value !== ""
                    ? projectForm.name.value
                    : selectedEditProject && selectedEditProject.name
                }
                style={
                  projectForm.name.valid ? {} : { border: "1px solid red" }
                }
              />
              {projectForm.name.valid ? null : (
                <div style={{ color: "red", fontSize: 14 }}>
                  {projectForm.name.validationError}
                </div>
              )}
              {/* <ProjectsMap radius={radius} /> */}

              <EditProjectMap
                radius={projectForm.radius.value}
                projectLat={projectForm.lat.value}
                projectLong={projectForm.long.value}
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
                        onChangeProjectInputs(Number(e.target.value), "lat")
                      )
                    }
                    value={
                      projectForm.lat.value !== ""
                        ? projectForm.lat.value.toFixed(2)
                        : selectedEditProject && selectedEditProject.latitude
                    }
                    style={true ? {} : { border: "1px solid red" }}
                  />
                  {true ? null : (
                    <div style={{ color: "red", fontSize: 14 }}>
                      {projectForm.lat.validationError}
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
                        onChangeProjectInputs(Number(e.target.value), "long")
                      )
                    }
                    value={
                      projectForm.long.value !== ""
                        ? projectForm.long.value.toFixed(2)
                        : selectedEditProject && selectedEditProject.longitude
                    }
                    style={true ? {} : { border: "1px solid red" }}
                  />
                  {true ? null : (
                    <div style={{ color: "red", fontSize: 14 }}>
                      {projectForm.long.validationError}
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
                    setRadius(e.target.value);
                    dispatch(onChangeProjectInputs(e.target.value, "radius"));
                  }}
                  value={
                    projectForm.radius.value !== ""
                      ? projectForm.radius.value
                      : selectedEditProject && selectedEditProject.radius
                  }
                  style={
                    projectForm.radius.valid ? {} : { border: "1px solid red" }
                  }
                />
                <span style={{ marginLeft: 5 }}>Meter</span>
              </div>
              {projectForm.radius.valid ? null : (
                <div style={{ color: "red", fontSize: 14 }}>
                  {projectForm.radius.validationError}
                </div>
              )}
              <div className="d-flex justify-content-center my-3">
                <button
                  disabled={
                    disableBtn
                      ? disableBtn
                      : !(
                          projectForm.name.valid &&
                          projectForm.lat.valid &&
                          projectForm.long.valid &&
                          projectForm.radius.valid
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
                  {loadEditProject ? (
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
export default EditProject;
