import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import log from "../../assets/images/log.png";
import Modal from "react-modal";
import fileDownload from "js-file-download";
import {
  onChangeAddGlobalIdentifierInput,
  onChangeSearchVal,
  onDeletingIdentifier,
  onEditingIdentifier,
  onFetchingGlobalIdentifiers,
  onResettingGlobalIdentifierForm,
  onSearchingIdentifier,
  onSelectingIdentifier,
} from "../../store/Globalidenetifiers/Globalidenetifiers";
import { onFetchingUsers } from "../../store/AddUsers/AddUsers";

import { onSelectingIdentifierId } from "../../store/Projects/ProjectsReducer";
import useAssignedUsers from "../../hooks/useAssignedUsers";

import { PropagateLoader } from "react-spinners";
import { css } from "@emotion/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./GlobalIdentifiers.module.css";
import { url } from "../../constants";

import { notUser } from "../../util/roles";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
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

export default function GlobalIdenetifiers() {
  const dispatch = useDispatch();
  const [disableBtn, setDisableBtn] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [DeleteIsOpen, setDeleteIsOpen] = useState(false);
  const [globalIdentifierGID, setGlobalIdentifierGID] = useState("");
  // const [downloadLink, setDownloadLink] = useState(null);
  const { token, userId, role } = useSelector((state) => state.login);

  const {
    globalIdentifierName,
    globalIdentifiers,
    selectedIdentifier,
    loadFetchingGlobalIdentifiers,
    loadingEdit,
    searchResult,
    loadSearch,
    renderedItem,
  } = useSelector((state) => state.globalIdentifier);

  const {
    assignedUsers,
    onAssignUser,
    usersLoading,
    users,
    loading: assignedUsersLoading,
  } = useAssignedUsers(selectedIdentifier?.gid, token);

  const handleDownload = (id, globalidenetifier) => {
    fetch(`${url}/api/globalIdentifiers/${id}/download-web`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.blob())
      .then((blob) => {
        fileDownload(blob, `${globalidenetifier.name}.xlsx`);
      });
  };

  useEffect(() => {
    dispatch(onFetchingGlobalIdentifiers(token));
    dispatch(onFetchingUsers(token));
  }, []);

  useEffect(() => {
    if (selectedIdentifier.name !== "") {
      dispatch(
        onChangeAddGlobalIdentifierInput(selectedIdentifier.name, "name")
      );
    }
    if (selectedIdentifier.privacy !== "") {
      dispatch(
        onChangeAddGlobalIdentifierInput(selectedIdentifier.privacy, "privacy")
      );
    }
  }, [selectedIdentifier]);

  return (
    <Fragment>
      <div className="container">
        <ToastContainer />

        <div className="row">
          <div className="col-12 col-md-6  m-auto">
            <h3
              className="text-center mt-2"
              style={{ textTransform: "uppercase" }}
            >
              Global Identifiers
            </h3>
            <div className="w-75 m-auto my-4" style={{ position: "relative" }}>
              <i
                className="far fa-search text-dark"
                style={{ position: "absolute", top: "12px", left: "3%" }}
              ></i>
              <input
                type="text"
                className="form-control"
                name="search"
                placeholder="Search"
                style={{ paddingLeft: "35px" }}
                onChange={(e) => {
                  dispatch(onChangeSearchVal(e.target.value, "textVal"));
                  dispatch(onSearchingIdentifier(e.target.value, token));
                }}
              />
            </div>
          </div>
        </div>
        {renderedItem === "identifier" ? (
          loadFetchingGlobalIdentifiers ? (
            <div style={{ textAlign: "center" }}>
              <div className="spinner-border" role="status">
                {/* <span className="sr-only">Loading...</span> */}
              </div>
            </div>
          ) : (
            <div className="row">
              {globalIdentifiers && globalIdentifiers.length > 0 ? (
                globalIdentifiers.map((globalIdentifier) => {
                  return (
                    <div
                      className="col-10 col-md-5 col-lg-5 m-auto my-2"
                      key={globalIdentifier.gid}
                    >
                      <div className="border py-1">
                        <div className="row">
                          <div className="col-8 col-md-7 d-flex justify-content-end">
                            <div>
                              <Link
                                to={
                                  "/globalidenetifiers/projects/" +
                                  globalIdentifier.gid
                                }
                                onClick={() => {
                                  dispatch(
                                    onSelectingIdentifierId(
                                      globalIdentifier.gid
                                    )
                                  );
                                  dispatch(
                                    onSelectingIdentifier(globalIdentifier.gid)
                                  );
                                }}
                                style={{ textDecoration: "none" }}
                              >
                                {globalIdentifier.name}
                              </Link>
                              {notUser.includes(role) && (
                                <Link
                                  to={"/gidlogs/" + globalIdentifier.gid}
                                  style={{ marginLeft: 15 }}
                                >
                                  <img
                                    className="mx-2 mt-1"
                                    style={{
                                      width: "18px",
                                      height: "16px",
                                    }}
                                    src={log}
                                    alt="log"
                                    s
                                  />
                                </Link>
                              )}
                            </div>
                          </div>

                          <div className="col-4 col-md-4 d-flex justify-content-end ">
                            {/* <a
                              id={globalIdentifier.gid}
                              href="#"
                              // download
                              onClick={() => handleDownload(globalIdentifier.gid)}
                            >
                              <i className="fa fa-download text-secondary mt-1"></i>
                            </a> */}

                            <i
                              className="fa fa-download text-secondary mt-1"
                              onClick={() => {
                                handleDownload(
                                  globalIdentifier.gid,
                                  globalIdentifier
                                );
                              }}
                            ></i>
                            {notUser.includes(role) && (
                              <>
                                <i
                                  className="fas fa-pencil-alt text-secondary mx-2 mt-1"
                                  type="button"
                                  data-bs-toggle="modal"
                                  data-bs-target="#editIdentifier"
                                  onClick={() => {
                                    dispatch(
                                      onSelectingIdentifier(
                                        globalIdentifier.gid
                                      )
                                    );
                                    setIsOpen(true);
                                  }}
                                ></i>
                                <i
                                  className="far fa-trash-alt text-danger mx-2 mt-1"
                                  onClick={() => {
                                    setGlobalIdentifierGID(
                                      globalIdentifier.gid
                                    );
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
                <div style={{ textAlign: "center" }}>
                  No Globals Identifiers Added Yet.
                </div>
              )}
            </div>
          )
        ) : null}

        {renderedItem === "searchResult" ? (
          loadSearch ? (
            <div style={{ textAlign: "center" }}>
              <div className="spinner-border" role="status">
                {/* <span className="sr-only">Loading...</span> */}
              </div>
            </div>
          ) : (
            <div className="row">
              {searchResult && searchResult.length > 0 ? (
                searchResult.map((globalIdentifier) => {
                  return (
                    <div
                      className="col-10 col-md-5 col-lg-5 m-auto my-2"
                      key={globalIdentifier.gid}
                    >
                      <div className="border py-1">
                        <div className="row">
                          <div className="col-6 d-flex justify-content-end">
                            <Link
                              style={{ textDecoration: "none" }}
                              to={
                                "/globalidenetifiers/projects/" +
                                globalIdentifier.gid
                              }
                              onClick={() =>
                                dispatch(
                                  onSelectingIdentifierId(globalIdentifier.gid)
                                )
                              }
                            >
                              {globalIdentifier.name}
                            </Link>
                            {notUser.includes(role) && (
                              <Link to={"/gidlogs/" + globalIdentifier.gid}>
                                <img
                                  className="mx-2 mt-1"
                                  style={{ width: "18px", height: "16px" }}
                                  src={log}
                                  alt="log"
                                />
                              </Link>
                            )}
                          </div>
                          <div className="col-6 d-flex justify-content-end ">
                            <i
                              className="fa fa-download text-secondary mt-1"
                              onClick={() => {
                                handleDownload(
                                  globalIdentifier.gid,
                                  globalIdentifier
                                );
                              }}
                            ></i>
                            {/* <a
                              id={globalIdentifier.gid}
                              href="#"
                              download
                              onClick={() =>
                                handleDownload(globalIdentifier.gid)
                              }
                            >
                              <i className="fa fa-download text-secondary mt-1"></i>
                            </a> */}
                            {notUser.includes(role) && (
                              <>
                                <i
                                  className="fas fa-pencil-alt text-secondary mx-2 mt-1"
                                  type="button"
                                  data-bs-toggle="modal"
                                  data-bs-target="#editIdentifier"
                                  onClick={() => {
                                    dispatch(
                                      onSelectingIdentifier(
                                        globalIdentifier.gid
                                      )
                                    );
                                    setIsOpen(true);
                                  }}
                                ></i>
                                <i
                                  className="far fa-trash-alt text-danger mx-2 mt-1"
                                  onClick={() => {
                                    setGlobalIdentifierGID(
                                      globalIdentifier.gid
                                    );
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
                <div className="text-center">
                  Global Identifier doesn't exists.
                </div>
              )}
            </div>
          )
        ) : null}

        {notUser.includes(role) && (
          <div className="row my-4">
            <div className="col-6 col-md-4 w-100 d-flex justify-content-center">
              {/* <button type="button" className="btn btn-primary">
              Add new Global Identifier
            </button> */}
              <Link
                onClick={() => dispatch(onResettingGlobalIdentifierForm())}
                className="btn btn-primary"
                to={"/addglobalidenetifiers"}
              >
                Add new Global Identifier
              </Link>
            </div>
          </div>
        )}
      </div>

      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        onRequestClose={() => setIsOpen(false)}
        contentLabel="Example Modal"
        className={styles.Modal}
        overlayClassName={styles.Overlay}
        ariaHideApp={false}
      >
        <div className="container modal-body">
          <div className="row">
            <div className="col-10 m-auto">
              <h5 className="text-center my-3">Edit Global Identifier</h5>
              <form
                onSubmit={(e) => {
                  dispatch(
                    onEditingIdentifier(
                      e,
                      token,
                      selectedIdentifier && selectedIdentifier.gid,
                      globalIdentifierName.name.value,
                      globalIdentifierName.privacy.value,
                      assignedUsers
                    )
                  );
                  setIsOpen(false);
                }}
              >
                <input
                  type="name"
                  className="form-control mt-3 p-2"
                  placeholder="Name"
                  name="name"
                  onChange={(e) =>
                    dispatch(
                      onChangeAddGlobalIdentifierInput(e.target.value, "name")
                    )
                  }
                  value={
                    globalIdentifierName.name.value !== ""
                      ? globalIdentifierName.name.value
                      : selectedIdentifier && selectedIdentifier.name
                  }
                  style={
                    globalIdentifierName.name.valid
                      ? { borderColor: "#ccc" }
                      : { borderColor: "red" }
                  }
                />
                {globalIdentifierName.name.valid ? null : (
                  <div style={{ color: "red", fontSize: 14 }}>
                    {globalIdentifierName.name.validationError}
                  </div>
                )}
                {selectedIdentifier && selectedIdentifier.user_id === userId && (
                  <div className="flex items-center mt-2">
                    <input
                      onChange={(e) => {
                        if (globalIdentifierName.privacy.value === "private") {
                          //value then name
                          dispatch(
                            onChangeAddGlobalIdentifierInput(
                              "public",
                              "privacy"
                            )
                          );
                        } else {
                          dispatch(
                            onChangeAddGlobalIdentifierInput(
                              "private",
                              "privacy"
                            )
                          );
                        }
                      }}
                      checked={globalIdentifierName.privacy.value === "private"}
                      id="checked-checkbox"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      for="checked-checkbox"
                      className="ml-2 text-sm font-medium"
                    >
                      Private
                    </label>
                  </div>
                )}

                {!usersLoading &&
                  !assignedUsersLoading &&
                  globalIdentifierName.privacy.value === "private" && (
                    <div className="mt-4">
                      <h6>Assigned Users</h6>
                      <div className="mt-2">
                        {users.map((user) => (
                          <div
                            key={user.user_id}
                            className="flex items-center my-2 mr-2"
                          >
                            <input
                              onChange={() => onAssignUser(user.user_id)}
                              checked={assignedUsers.includes(user.user_id)}
                              id="checked-checkbox"
                              type="checkbox"
                              className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label
                              htmlFor="checked-checkbox"
                              className="ml-2 text-sm font-medium"
                            >
                              {user.fullName}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                <div className="d-flex justify-content-center my-3">
                  <button
                    type="submit"
                    className="btn btn-primary w-25 mx-2 hamada"
                    style={{ height: "40px" }}
                  >
                    {loadingEdit ? (
                      <PropagateLoader
                        color={"#fff"}
                        css={override}
                        size={10}
                      />
                    ) : (
                      "Save"
                    )}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary mx-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>
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
                Are you sure you want to delete this Global Identifier ?
              </h5>

              <div className="d-flex justify-content-center my-3">
                <button
                  type="button"
                  className="btn btn-danger mx-2"
                  onClick={() => {
                    dispatch(onDeletingIdentifier(globalIdentifierGID, token));
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
