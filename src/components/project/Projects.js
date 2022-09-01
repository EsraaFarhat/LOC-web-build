import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { url } from "../../constants";
import Modal from "react-modal";
import styles from "./Project.module.css";
import fileDownload from "js-file-download";

import {
  onChangeSearchVal,
  onDeletingProject,
  onFetchingProjects,
  onResetProjectForm,
  onSearchingProject,
  onSelectingProject,
} from "../../store/Projects/ProjectsReducer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notUser } from "../../util/roles";

const styleLinkBack = {
  textDecoration: "none",
  color: "#717993",
  fontSize: "22px",
};
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
export default function Projects() {
  const [DeleteIsOpen, setDeleteIsOpen] = useState(false);
  const [projectID, setProjectID] = useState("");
  const dispatch = useDispatch();
  const { id } = useParams();
  const { token, role } = useSelector((state) => state.login);

  const {
    projects,
    loadFetchingProjects,
    searchResult,
    renderedItem,
    loadSearch,
  } = useSelector((state) => state.projects);

  const [globalIdentifier, setGlobalIdenetifier] = useState(null);

  const handleDownload = (id, project) => {
    fetch(`${url}/api/projects/${id}/download-web`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.blob())
      .then((blob) => {
        fileDownload(blob, `${project.name}.xlsx`);
      });
  };

  useEffect(() => {
    dispatch(onFetchingProjects(id, token));
    fetch(`${url}/api/globalIdentifiers/${id}/projects`, {
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
        <div className="row">
          <div className="col-12 col-md-6  m-auto">
            <h3 className="text-center mt-2">Projects</h3>
            <div className="w-75 m-auto my-3" style={{ position: "relative" }}>
              <i
                className="far fa-search text-dark"
                style={{ position: "absolute", top: "30%", left: "3%" }}
              ></i>
              <input
                style={{ paddingLeft: 35 }}
                type="text"
                className="form-control"
                name="search"
                placeholder="Search"
                onChange={(e) => {
                  dispatch(onChangeSearchVal(e.target.value, "textVal"));
                  dispatch(onSearchingProject(e.target.value, token, id));
                }}
              />
            </div>
          </div>
        </div>

        {renderedItem === "projects" ? (
          loadFetchingProjects ? (
            <div style={{ textAlign: "center" }}>
              <div className="spinner-border" role="status">
                {/* <span className="sr-only">Loading...</span> */}
              </div>
            </div>
          ) : projects && projects.length > 0 ? (
            <div className="row mt-3">
              {projects.map((project) => {
                return (
                  <div className="col-10 col-md-5 m-auto my-2" key={project.id}>
                    <div className="border py-1">
                      <div className="row">
                        <div className="col-8 col-md-7 d-flex justify-content-end">
                          <Link
                            style={{ textDecoration: "none" }}
                            to={"/locations/" + project.id}
                            onClick={(e) => {
                              dispatch(onSelectingProject(project.id));
                            }}
                          >
                            {project.name}
                          </Link>
                        </div>

                        <div className="col-4 col-md-5 d-flex justify-content-end ">
                          <i
                            className="fa fa-download text-secondary mt-1"
                            onClick={() => handleDownload(project.id, project)}
                          ></i>
                          {notUser.includes(role) && (
                            <>
                              <Link to={"/editproject/" + project.id}>
                                <i className="fas fa-pencil-alt text-secondary mx-2 mt-1"></i>
                              </Link>
                              <i
                                className="far fa-trash-alt text-danger mx-2 mt-1"
                                onClick={(e) => {
                                  setProjectID(project.id);
                                  setDeleteIsOpen(true);
                                }}
                              ></i>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{ textAlign: "center" }}>No Projects Added Yet.</div>
          )
        ) : null}

        {renderedItem === "searchResult" ? (
          loadSearch ? (
            <div style={{ textAlign: "center" }}>
              <div className="spinner-border" role="status">
                {/* <span className="sr-only">Loading...</span> */}
              </div>
            </div>
          ) : searchResult && searchResult.length > 0 ? (
            <div className="row mt-3">
              {searchResult.map((project) => {
                return (
                  <div className="col-10 col-md-5 m-auto my-2" key={project.id}>
                    <div className="border py-1">
                      <div className="row">
                        <div className="col-8 col-md-7 d-flex justify-content-end">
                          <Link
                            to={"/locations/" + project.id}
                            style={{ textDecoration: "none" }}
                          >
                            {project.name}
                          </Link>
                        </div>
                        <div className="col-4 col-md-5 d-flex justify-content-end">
                          <i
                            className="fa fa-download text-secondary mt-1"
                            onClick={() => {
                              handleDownload(project.id, project);
                            }}
                          ></i>
                          {notUser.includes(role) && (
                            <>
                              <Link to={"/editproject/" + project.id}>
                                <i className="fas fa-pencil-alt text-secondary mx-2 mt-1"></i>
                              </Link>
                              <i
                                className="far fa-trash-alt text-danger mx-2 mt-1"
                                onClick={(e) => {
                                  setProjectID(project.id);
                                  setDeleteIsOpen(true);
                                }}
                              ></i>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{ textAlign: "center" }}>Projects deosn't exists.</div>
          )
        ) : null}
        {notUser.includes(role) && (
          <div className="row my-4">
            <div className="col-6 col-md-5 w-100 d-flex justify-content-center">
              <Link
                onClick={() => dispatch(onResetProjectForm())}
                className="btn btn-primary"
                to={"/addnewproject/" + id}
              >
                Add new project
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Delete Modal */}
      <Modal
        isOpen={DeleteIsOpen}
        style={customStyles}
        onRequestClose={() => setDeleteIsOpen(false)}
        contentLabel="Delete Modal"
        className={styles.Modal}
        overlayClassName={styles.Overlay}
        ariaHideApp={false}
      >
        <div className="container modal-body">
          <div className="row">
            <div className="col-10 m-auto">
              <h5 className="text-center my-3">
                Are you sure you want to delete this?
              </h5>

              <div className="d-flex justify-content-center my-3">
                <button
                  type="button"
                  className="btn btn-danger mx-2"
                  onClick={(e) => {
                    dispatch(onDeletingProject(e, projectID, token));
                    setDeleteIsOpen(false);
                  }}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="btn btn-secondary mx-2"
                  onClick={() => setDeleteIsOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      {/* End Delete Modal */}
    </Fragment>
  );
}
