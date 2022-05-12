import React, { Fragment, useDebugValue, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  onDeletingLoc,
  onFetchingLocs,
  onSearchingLoc,
} from "../../store/Locs/LocsReducer";
import formatAMPM from "../../util/DateFormat";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { OutTable, ExcelRenderer } from "react-excel-renderer";
import Modal from "react-modal";
import styles from "./../project/Project.module.css";
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
const AssignedLocs = () => {
  const [DeleteSingleIsOpen, setDeleteSingleIsOpen] = useState(false);
  const [singleLocID, setSingleLocID] = useState("");
  const [DeleteDualIsOpen, setDeleteDualIsOpen] = useState(false);
  const [dualLocID, setDualLocID] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.login.token);
  const [globalIdentifier, setGlobalIdenetifier] = useState(null);
  const [gid, setGid] = useState("");
  const [project, setProject] = useState(null);
  const [location, setLocation] = useState(null);
  const { selectedIdentifier } = useSelector((state) => state.globalIdentifier);
  const { selectedEditProject } = useSelector((state) => state.projects);
  const { selectedEditLocation } = useSelector((state) => state.locations);
  const {
    singleLocs,
    dualLocs,
    loadingLocs,
    renderedItem,
    searchSingleLocs,
    searchDualLocs,
    loadSearch,
  } = useSelector((state) => state.locs);
  useEffect(() => {
    dispatch(onFetchingLocs(id, token, "assigned"));
  }, [dispatch]);

  const [state, setState] = useState({
    cols: null,
    rows: null,
  });

  const [file, setFile] = useState({});
  const fileHandler = (event) => {
    let fileObj = event.target.files[0];

    console.log("44", fileObj);
    setFile(fileObj);
    //just pass the fileObj as parameter
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        setState({
          cols: resp.cols,
          rows: resp.rows,
        });

        console.log("57", state);
      }
    });
  };

  const onUploadFile = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("LocFile", file);

    console.log("65", file);
    fetch("http://63.33.18.108:5000/api/LOCs/upload", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    })
      .then((res) => res.json())
      .then((resData) => {
        console.log(resData);
      });
  };

  useEffect(() => {
    fetch(`http://63.33.18.108:5000/api/locations/${id}`, {
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
            <span className="mx-2" style={{ color: "#28345C" }}>
              <i className="fas fa-chevron-right"></i>
              <i className="fas fa-chevron-right"></i>
            </span>
            <Link to={"/assignedlocs/" + id} style={styleLinkBack}>
              Assigned
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
            <span className="mx-2" style={{ color: "#28345C" }}>
              <i className="fas fa-chevron-right"></i>
              <i className="fas fa-chevron-right"></i>
            </span>
            <Link to={"/assignedlocs/" + id} style={styleLinkBack}>
              ASSIGNED
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
        {/* <span className="mx-2" style={{ color: "#28345C" }}>
          <i className="fas fa-chevron-right"></i>
          <i className="fas fa-chevron-right"></i>
        </span>
        <Link to={"/gid"} style={styleLinkBack}>
          ASSIGNED
        </Link> */}
        <div className="row w-75 m-auto mb-3 ">
          {/* <div className="col d-flex justify-content-end">
            <Link
              to={"/CreateDualLocInfo/" + id}
              type="button"
              className="btn btn-primary btn-sm"
            >
              Create New Dual LOC Info
            </Link>
          </div> */}
          {/* <div className="col d-flex justify-content-center">
            <Link
              to={"/CreateSingleLocInfo/" + id}
              className="btn btn-primary btn-sm"
            >
              Create New Single LOC Info
            </Link>
          </div> */}
          {/* <div className="col d-flex justify-content-right">
            <button
              type="button"
              className="btn btn-success btn-sm"
              data-bs-toggle="modal"
              data-bs-target="#ImportModal"
            >
              Import New LOC Via.Xisx
            </button>
          </div> */}
          {/* Model */}
          <form onSubmit={(e) => onUploadFile(e)}>
            <div
              className="modal fade"
              id="ImportModal"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
              style={{ borderBlockColor: "#0987B1" }}
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-body">
                    <div className="row">
                      <div className="col">
                        <h3 className="text-center mt-5 text-primary">
                          IMPORT LOC INFO
                        </h3>
                        <div className="d-flex justify-content-center">
                          <label className="btn btn-outline-primary btn-sm my-3">
                            <input
                              type="file"
                              style={{ display: "none" }}
                              onChange={(e) => fileHandler(e)}
                            />
                            Choose File
                          </label>
                        </div>
                        <p className="text-center">
                          Only .xlsx files can be uploaded
                        </p>
                        <div className="d-flex justify-content-center mb-5">
                          <button
                            type="submit"
                            className="btn btn-primary btn-sm w-25"
                          >
                            Upload
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
          {/* End Model */}
        </div>
        <div className="row">
          <div className="col-7 col-md-4 m-auto">
            <h3 className="text-center my-3">Assigned LOC’s</h3>
            <div className="w-75 m-auto my-4" style={{ position: "relative" }}>
              <i
                className="far fa-search text-dark"
                style={{ position: "absolute", top: "30%", left: "3%" }}
              ></i>
              <input
                style={{ paddingLeft: 30 }}
                type="text"
                className="form-control"
                name="search"
                placeholder="Search"
                onChange={(e) =>
                  dispatch(
                    onSearchingLoc(id, e.target.value, token, "assigned")
                  )
                }
              />
            </div>
          </div>
          {loadingLocs ? (
            <div style={{ textAlign: "center" }}>
              <div className="spinner-border" role="status">
                {/* <span className="sr-only">Loading...</span> */}
              </div>
            </div>
          ) : singleLocs && singleLocs.length > 0 ? (
            <div className="row">
              <h6 className="mt-4">Single LOC’s</h6>
              <div
                className="table-responsive col-12 col-md-10 text-center"
                style={{ maxHeight: 400, overflowY: "auto" }}
              >
                <table
                  className="table table-bordered table-sm"
                  style={{ fontSize: "12px" }}
                >
                  <thead>
                    <tr style={{ color: "#0987B1" }}>
                      <th scope="col">Route ID</th>
                      <th scope="col">ORIGIN</th>
                      <th scope="col">FIELD 1</th>
                      <th scope="col">FIELD 2</th>
                      <th scope="col">FIELD 3</th>
                      {/* <th scope="col">MISC</th> */}
                      <th scope="col" colspan="2">
                        LOCATION
                      </th>
                      {/* <th scope="col">LATITUDE</th>
                      <th scope="col">LONGITUDE</th>
                      <th scope="col">RADIUS</th> */}
                      <th scope="col">LAST UPDATE</th>
                      <th scope="col">CREATED BY</th>
                      {/* <th scope="col">USERS INITIALS</th> */}
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {renderedItem === "locs" ? (
                      singleLocs.map((loc) => {
                        return (
                          <tr key={loc.route_id}>
                            <td scope="row">{loc.route_id}</td>
                            <td>{loc.origin}</td>
                            <td>{loc.field_1}</td>
                            <td>{loc.field_2}</td>
                            <td>{loc.field_3}</td>
                            {/* <td>{loc.MISC}</td> */}
                            {/* <td className="d-flex justify-content-center">
                              <button
                                type="button"
                                className="btn btn-primary btn-sm w-75"
                              >
                                view
                              </button>
                            </td> */}
                            <td>
                              <span style={{ fontSize: "9px" }}>
                                LATITUDE :{" "}
                                {(
                                  Math.round(loc.Location.latitude * 100) / 100
                                ).toFixed(4)}{" "}
                              </span>
                            </td>
                            <td>
                              <span style={{ fontSize: "9px" }}>
                                LONGITUDE :{" "}
                                {(
                                  Math.round(loc.Location.longitude * 100) / 100
                                ).toFixed(4)}{" "}
                              </span>
                            </td>

                            <td>{new Date(loc.updatedAt).toUTCString()}</td>
                            <td>{loc.User.email}</td>
                            <td>
                              <Link
                                to={"/UpdateSingleLocInfo/" + loc.loc_id}
                                className="btn p-0 m-o mx-2"
                                type="button"
                              >
                                <i className="fas fa-pencil-alt text-secondary"></i>
                              </Link>

                              <button
                                className="btn p-0 m-o"
                                type="button"
                                // onClick={(e) =>
                                //   dispatch(
                                //     onDeletingLoc(
                                //       e,
                                //       loc.loc_id,
                                //       token,
                                //       "single"
                                //     )
                                //   )
                                // }
                                onClick={(e) => {
                                  setSingleLocID(loc.loc_id);
                                  setDeleteSingleIsOpen(true);
                                }}
                              >
                                <i className="far fa-trash-alt text-danger"></i>
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : loadSearch ? (
                      <div style={{ textAlign: "center", padding: "20px 0" }}>
                        <div className="spinner-border" role="status">
                          {/* <span className="sr-only">Loading...</span> */}
                        </div>
                      </div>
                    ) : searchSingleLocs && searchSingleLocs.length > 0 ? (
                      searchSingleLocs.map((loc) => {
                        return (
                          <tr key={loc.route_id}>
                            <td scope="row">{loc.route_id}</td>
                            <td>{loc.origin}</td>
                            <td>{loc.field_1}</td>
                            <td>{loc.field_2}</td>
                            <td>{loc.field_3}</td>
                            {/* <td>{loc.MISC}</td> */}
                            {/* <td className="d-flex justify-content-center">
                              <button
                                type="button"
                                className="btn btn-primary btn-sm w-75"
                              >
                                view
                              </button>
                            </td> */}
                            <td>
                              <span style={{ fontSize: "9px" }}>
                                LATITUDE :{" "}
                                {(
                                  Math.round(loc.Location.latitude * 100) / 100
                                ).toFixed(4)}{" "}
                              </span>
                            </td>
                            <td>
                              <span style={{ fontSize: "9px" }}>
                                LONGITUDE :{" "}
                                {(
                                  Math.round(loc.Location.longitude * 100) / 100
                                ).toFixed(4)}{" "}
                              </span>
                            </td>

                            <td>{new Date(loc.updatedAt).toUTCString()}</td>
                            <td>{loc.User.email}</td>
                            <td>
                              <Link
                                to={"/UpdateSingleLocInfo/" + loc.loc_id}
                                className="btn p-0 m-o mx-2"
                                type="button"
                              >
                                <i className="fas fa-pencil-alt text-secondary"></i>
                              </Link>

                              <button
                                className="btn p-0 m-o"
                                type="button"
                                // onClick={(e) =>
                                //   dispatch(
                                //     onDeletingLoc(
                                //       e,
                                //       loc.loc_id,
                                //       token,
                                //       "single"
                                //     )
                                //   )
                                // }
                                onClick={(e) => {
                                  setSingleLocID(loc.loc_id);
                                  setDeleteSingleIsOpen(true);
                                }}
                              >
                                <i className="far fa-trash-alt text-danger"></i>
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <div style={{ textAlign: "center" }}>
                        Locs don't found.
                      </div>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <h1 style={{ textAlign: "center", margin: "20px 0" }}>
              No Single LOC’s added yet
            </h1>
          )}

          {loadingLocs ? (
            <div style={{ textAlign: "center" }}>
              <div className="spinner-border" role="status">
                {/* <span className="sr-only">Loading...</span> */}
              </div>
            </div>
          ) : dualLocs && dualLocs.length > 0 ? (
            <div className="row">
              <h6 className="mt-4">Dual LOC’s</h6>
              <div
                className="table-responsive"
                style={{ maxHeight: 600, overflowY: "scroll" }}
                style={{ maxHeight: 600, overflowY: "scroll" }}
                style={{ maxHeight: 400, overflowY: "auto" }}
              >
                <table
                  className="table table-bordered table-sm text-center"
                  style={{ fontSize: "12px" }}
                >
                  <thead>
                    <tr style={{ color: "#0987B1" }}>
                      <th scope="col">Route ID</th>
                      <th scope="col">ORIGIN</th>
                      <th scope="col">FIELD 1</th>
                      <th scope="col">FIELD 2</th>
                      <th scope="col">FIELD 3</th>
                      <th scope="col" colspan="2">
                        LOCATION
                      </th>
                      {/* <th scope="col">LATITUDE</th>
                      <th scope="col">LONGITUDE</th>
                      <th scope="col">RADIUS</th> */}
                      <th scope="col">CABLE DESTINATION</th>
                      <th scope="col">FIELD 1</th>
                      <th scope="col">FIELD 2</th>
                      <th scope="col">FIELD 3</th>
                      <th scope="col" colspan="2">
                        DESTINATION
                      </th>
                      {/* <th scope="col">LATITUDE</th>
                      <th scope="col">LONGITUDE</th>
                      <th scope="col">RADIUS</th> */}
                      {/* <th scope="col">MISC</th> */}
                      {/* <th scope="col">FIELD 1</th>
                      <th scope="col">FIELD 2</th> */}
                      {/* <th scope="col">LOCATION</th> */}
                      <th scope="col">LAST UPDATE</th>
                      <th scope="col">CREATED BY</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {renderedItem === "locs" ? (
                      dualLocs.map((loc) => {
                        console.log("411", loc);
                        return (
                          <tr key={loc.route_id}>
                            <td scope="row">{loc.route_id}</td>
                            <td>{loc.origin}</td>
                            <td>{loc.field_1}</td>
                            <td>{loc.field_2}</td>
                            <td>{loc.field_3}</td>
                            <td>
                              <span style={{ fontSize: "9px" }}>
                                LATITUDE :{" "}
                                {(
                                  Math.round(loc.Location.latitude * 100) / 100
                                ).toFixed(4)}{" "}
                              </span>
                            </td>
                            <td>
                              <span style={{ fontSize: "9px" }}>
                                LONGITUDE :{" "}
                                {(
                                  Math.round(loc.Location.longitude * 100) / 100
                                ).toFixed(4)}{" "}
                              </span>
                            </td>

                            <td>{loc.LOCDestination?.destination}</td>
                            <td>{loc.LOCDestination?.destination_field_1}</td>
                            <td>{loc.LOCDestination?.destination_field_2}</td>
                            <td>{loc.LOCDestination?.destination_field_3}</td>
                            {/* <td>{loc.MISC}</td> */}
                            {/* <td>DF11</td>
                          <td>DF11</td> */}
                            {/* <td className="d-flex justify-content-center">
                              <button
                                type="button"
                                className="btn btn-primary btn-sm w-75"
                              >
                                view
                              </button>
                            </td> */}
                            {/* <td>{loc.LOCDestination?.latitude}</td>
                            <td>{loc.LOCDestination?.longitude}</td>
                            <td>{loc.LOCDestination?.radius}</td> */}
                            <td>
                              <span style={{ fontSize: "9px" }}>
                                LATITUDE :{" "}
                                {(
                                  Math.round(
                                    loc.LOCDestination?.latitude * 100
                                  ) / 100
                                ).toFixed(4)}{" "}
                              </span>
                            </td>
                            <td>
                              <span style={{ fontSize: "9px" }}>
                                LONGITUDE :{" "}
                                {(
                                  Math.round(
                                    loc.LOCDestination?.longitude * 100
                                  ) / 100
                                ).toFixed(4)}{" "}
                              </span>
                            </td>

                            <td>{new Date(loc.updatedAt).toUTCString()}</td>
                            <td>{loc.User.email}</td>
                            <td>
                              <Link
                                to={"/UpdateDualLocInfo/" + loc.loc_id}
                                className="btn p-0 m-o mx-2"
                                type="button"
                              >
                                <i className="fas fa-pencil-alt text-secondary"></i>
                              </Link>

                              <button
                                className="btn p-0 m-o"
                                type="button"
                                // onClick={(e) =>
                                //   dispatch(
                                //     onDeletingLoc(e, loc.loc_id, token, "dual")
                                //   )
                                // }
                                onClick={(e) => {
                                  setDualLocID(loc.loc_id);
                                  setDeleteDualIsOpen(true);
                                }}
                              >
                                <i className="far fa-trash-alt text-danger"></i>
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : loadSearch ? (
                      <div style={{ textAlign: "center", padding: "20px 0" }}>
                        <div className="spinner-border" role="status">
                          {/* <span className="sr-only">Loading...</span> */}
                        </div>
                      </div>
                    ) : searchDualLocs && searchDualLocs.length > 0 ? (
                      searchDualLocs.map((loc) => {
                        return (
                          <tr key={loc.route_id}>
                            <td scope="row">{loc.route_id}</td>
                            <td>{loc.origin}</td>
                            <td>{loc.field_1}</td>
                            <td>{loc.field_2}</td>
                            <td>{loc.field_3}</td>
                            <td>
                              <span style={{ fontSize: "9px" }}>
                                LATITUDE :{" "}
                                {(
                                  Math.round(loc.Location.latitude * 100) / 100
                                ).toFixed(4)}{" "}
                              </span>
                            </td>
                            <td>
                              <span style={{ fontSize: "9px" }}>
                                LONGITUDE :{" "}
                                {(
                                  Math.round(loc.Location.longitude * 100) / 100
                                ).toFixed(4)}{" "}
                              </span>
                            </td>

                            <td>{loc.LOCDestination?.destination}</td>
                            <td>{loc.LOCDestination?.destination_field_1}</td>
                            <td>{loc.LOCDestination?.destination_field_2}</td>
                            <td>{loc.LOCDestination?.destination_field_3}</td>
                            {/* <td>{loc.MISC}</td> */}
                            {/* <td>DF11</td>
                    <td>DF11</td> */}
                            {/* <td className="d-flex justify-content-center">
                              <button
                                type="button"
                                className="btn btn-primary btn-sm w-75"
                              >
                                view
                              </button>
                            </td> */}
                            {/* <td>{loc.LOCDestination?.latitude}</td>
                            <td>{loc.LOCDestination?.longitude}</td>
                            <td>{loc.LOCDestination?.radius}</td> */}
                            <td>
                              <span style={{ fontSize: "9px" }}>
                                LATITUDE :{" "}
                                {(
                                  Math.round(
                                    loc.LOCDestination?.latitude * 100
                                  ) / 100
                                ).toFixed(4)}{" "}
                              </span>
                            </td>
                            <td>
                              <span style={{ fontSize: "9px" }}>
                                LONGITUDE :{" "}
                                {(
                                  Math.round(
                                    loc.LOCDestination?.longitude * 100
                                  ) / 100
                                ).toFixed(4)}{" "}
                              </span>
                            </td>

                            <td>{new Date(loc.updatedAt).toUTCString()}</td>
                            <td>{loc.User.email}</td>
                            <td>
                              <Link
                                to={"/UpdateDualLocInfo/" + loc.loc_id}
                                className="btn p-0 m-o mx-2"
                                type="button"
                              >
                                <i className="fas fa-pencil-alt text-secondary"></i>
                              </Link>

                              <button
                                className="btn p-0 m-o"
                                type="button"
                                // onClick={(e) =>
                                //   dispatch(
                                //     onDeletingLoc(e, loc.loc_id, token, "dual")
                                //   )
                                // }
                                onClick={(e) => {
                                  setDualLocID(loc.loc_id);
                                  setDeleteDualIsOpen(true);
                                }}
                              >
                                <i className="far fa-trash-alt text-danger"></i>
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : null}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <h1 style={{ textAlign: "center", margin: "20px 0" }}>
              No dual LOC’s added yet
            </h1>
          )}
        </div>
      </div>

      {/* Delete Modal Single*/}
      <Modal
        isOpen={DeleteSingleIsOpen}
        style={customStyles}
        onRequestClose={() => setDeleteSingleIsOpen(false)}
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
                    dispatch(
                      onDeletingLoc(e, singleLocID, token, "single", gid)
                    );
                    setDeleteSingleIsOpen(false);
                  }}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="btn btn-secondary mx-2"
                  onClick={() => setDeleteSingleIsOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      {/* End Delete Modal Single */}

      {/* Delete Modal Dual*/}
      <Modal
        isOpen={DeleteDualIsOpen}
        style={customStyles}
        onRequestClose={() => setDeleteDualIsOpen(false)}
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
                    dispatch(onDeletingLoc(e, dualLocID, token, "dual", gid));
                    setDeleteDualIsOpen(false);
                  }}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="btn btn-secondary mx-2"
                  onClick={() => setDeleteDualIsOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      {/* End Delete Modal Dual */}
    </Fragment>
  );
};
export default AssignedLocs;
