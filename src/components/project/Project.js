import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import fileDownload from "js-file-download";
import {
  onChangeSearchVal,
  onDeletingLocation,
  onFetchingLocations,
  onResetingLocationForm,
  onSearchingLocation,
  onSelectingLocation,
} from "../../store/Locations/LocationsReducers";
import { url } from "../../constants";
import "react-dropdown/style.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import styles from "./Project.module.css";
import { notUser } from "../../util/roles";

const options = ["one", "two", "three"];

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
export default function Project() {
  const [DeleteIsOpen, setDeleteIsOpen] = useState(false);
  const [locationID, setLocationID] = useState("");
  const dispatch = useDispatch();
  const { id } = useParams();
  const { token, role } = useSelector((state) => state.login);

  const {
    locations,
    loadLocations,
    searchResult,
    searchForm,
    loadSearch,
    renderedItem,
  } = useSelector((state) => state.locations);

  const [globalIdentifier, setGlobalIdenetifier] = useState(null);
  const [project, setProject] = useState(null);
  const [gid, setGid] = useState("");

  const handleDownload = (id, location) => {
    fetch(`${url}/api/locations/${id}/download-web`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.blob())
      .then((blob) => {
        fileDownload(blob, `${location.name}.xlsx`);
      });
  };

  useEffect(() => {
    dispatch(onFetchingLocations(id, token));

    fetch(`${url}/api/projects/${id}/locations`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((resData) => {
        setGlobalIdenetifier(resData.globalIdentifier);
        setProject(resData.project);
        setGid(resData.globalIdentifier.gid);
      });
  }, [dispatch, searchForm.textVal.value]);
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
        <div className="row">
          <div className="col-12 col-md-6  m-auto">
            <h3 className="text-center mt-2">Locations</h3>
            <div className="w-75 m-auto my-4" style={{ position: "relative" }}>
              <i
                className="far fa-search text-dark"
                style={{ position: "absolute", top: "30%", left: "3%" }}
              ></i>
              <input
                style={{ paddingLeft: 35 }}
                type="text"
                className="form-control"
                name="search"
                id="loations search"
                placeholder="Search"
                onChange={(e) => {
                  dispatch(onChangeSearchVal(e.target.value, "textVal"));
                  dispatch(onSearchingLocation(e.target.value, token, id));
                }}
              />
            </div>
          </div>
        </div>

        <div className="row mt-2">
          {renderedItem === "locations" ? (
            loadLocations ? (
              <div style={{ textAlign: "center" }}>
                <div className="spinner-border" role="status"></div>
              </div>
            ) : locations && locations.length > 0 ? (
              locations.map((location) => {
                return (
                  <div
                    className="col-10 col-md-5 m-auto my-2"
                    key={location.id}
                  >
                    <div className="border py-1">
                      <div className="row">
                        <div className="col-8 col-md-7 d-flex justify-content-end">
                          <Link
                            to={"/viewlocs/" + location.id}
                            style={{ textDecoration: "none" }}
                            onClick={() =>
                              dispatch(onSelectingLocation(location.id))
                            }
                          >
                            {location.name}
                          </Link>
                        </div>
                        <div className="col-4 col-md-5 d-flex justify-content-end ">
                          <i
                            className="fa fa-download text-secondary mt-1"
                            onClick={() =>
                              handleDownload(location.id, location)
                            }
                          ></i>
                          {notUser.includes(role) && (
                            <>
                              <Link
                                to={"/editlocation/" + location.id}
                                onClick={() =>
                                  dispatch(onSelectingLocation(location.id))
                                }
                              >
                                <i className="fas fa-pencil-alt text-secondary mx-2 mt-1"></i>
                              </Link>
                              <i
                                className="far fa-trash-alt text-danger mx-2 mt-1"
                                onClick={() => {
                                  setLocationID(location.id);
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
              })
            ) : (
              <div style={{ textAlign: "center" }}>No locations Added Yet.</div>
            )
          ) : null}

          {renderedItem === "searchResult" ? (
            loadSearch ? (
              <div style={{ textAlign: "center" }}>
                <div className="spinner-border" role="status"></div>
              </div>
            ) : searchResult && searchResult.length > 0 ? (
              searchResult.map((result) => {
                return (
                  <div className="col-10 col-md-5 m-auto my-2" key={result.id}>
                    <div className="border py-1">
                      <div className="row">
                        <div className="col-8 col-md-7 d-flex justify-content-end">
                          <Link
                            to={"/viewlocs/" + result.id}
                            style={{ textDecoration: "none" }}
                          >
                            {result.name}
                          </Link>
                        </div>
                        <div className="col-4 col-md-5 d-flex justify-content-end">
                          <i
                            className="fa fa-download text-secondary mt-1"
                            onClick={() => handleDownload(result.id, result)}
                          ></i>
                          {notUser.includes(role) && (
                            <>
                              <Link
                                to={"/editlocation/" + result.id}
                                onClick={() =>
                                  dispatch(onSelectingLocation(result.id))
                                }
                              >
                                <i className="fas fa-pencil-alt text-secondary mx-2 mt-1"></i>
                              </Link>
                              <i
                                className="far fa-trash-alt text-danger mx-2 mt-1"
                                onClick={(e) => {
                                  setLocationID(result.id);
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
              })
            ) : (
              <div>loaction doesn't exsists</div>
            )
          ) : null}
        </div>
        {notUser.includes(role) && (
          <div className="row my-4">
            <div className="col-6 col-md-5 w-100 d-flex justify-content-center">
              <Link
                onClick={() => dispatch(onResetingLocationForm())}
                className="btn btn-primary"
                to={"/addnewlocation/" + id}
              >
                Add New Location
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
                    dispatch(onDeletingLocation(e, locationID, token, gid));
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
