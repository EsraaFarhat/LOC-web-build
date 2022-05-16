import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  onChangeLocationInputs,
  onEditingLocation,
  onFetchingSpecificLocation,
} from "../../store/Locations/LocationsReducers";

import { PropagateLoader } from "react-spinners";
import { css } from "@emotion/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProjectsMap from "../Map/ProjectMap";
import EditLocationMap from "../Map/EditLocationMap";

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

const EditLocation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [disableBtn, setDisableBtn] = useState(false);
  const { id } = useParams();
  const token = useSelector((state) => state.login.token);
  const [globalIdentifier, setGlobalIdenetifier] = useState(null);
  const [project, setProject] = useState(null);
  const [radius, setRadius] = useState(2000);

  // const [location , setLocation] = useState(null)
  const [gid, setGid] = useState("");
  const { locationForm, specificLocation, loadEditLocation } = useSelector(
    (state) => state.locations
  );

  useEffect(() => {
    dispatch(onFetchingSpecificLocation(id, token));
  }, [dispatch]);

  useEffect(() => {
    if (specificLocation && specificLocation.id) {
      dispatch(onChangeLocationInputs(specificLocation.name, "name"));
      dispatch(onChangeLocationInputs(specificLocation.latitude, "lat"));
      dispatch(onChangeLocationInputs(specificLocation.longitude, "long"));
      dispatch(onChangeLocationInputs(specificLocation.radius, "radius"));
    }
  }, [specificLocation, dispatch]);

  useEffect(() => {
    fetch(`http://63.33.18.108:5000/api/locations/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((resData) => {
        console.log(resData);
        setGlobalIdenetifier(resData.globalIdentifier);
        setProject(resData.project);
        setGid(resData.globalIdentifier.gid);
      });
  }, []);
  return (
    <Fragment>
      <ToastContainer />
      <div className="container">
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
            <span className="mx-2" style={{ color: "#28345C" }}>
              <i className="fas fa-chevron-right"></i>
              <i className="fas fa-chevron-right"></i>
            </span>
            <Link
              to={"/editlocation/" + specificLocation.id}
              style={styleLinkBack}
            >
              {specificLocation.name}
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
          EDIT LOCATION 1
        </Link> */}
        <div className="row">
          <div className="col-10 col-md-6 m-auto">
            <h3 className="text-center my-3 text-uppercase">EDIT LOCATION</h3>
            <form
              onSubmit={(e) =>
                dispatch(
                  onEditingLocation(
                    e,
                    id,
                    token,
                    locationForm.name.value,
                    locationForm.lat.value,
                    locationForm.long.value,
                    locationForm.radius.value,
                    gid,
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
                  dispatch(onChangeLocationInputs(e.target.value, "name"))
                }
                value={locationForm.name.value}
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

              {/* <ProjectsMap radius={radius} />   */}
              <EditLocationMap
                radius={specificLocation.radius}
                locationLat={locationForm.lat.value}
                locationLong={locationForm.long.value}
              />
              <div className="row my-3">
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    name="Latitude"
                    placeholder="Latitude"
                    disabled={true}
                    value={
                      locationForm.lat.value !== ""
                        ? locationForm.lat.value.toFixed(2)
                        : locationForm.lat.value
                    }
                    onChange={(e) =>
                      dispatch(
                        onChangeLocationInputs(Number(e.target.value), "lat")
                      )
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
                    value={
                      locationForm.long.value !== ""
                        ? locationForm.long.value.toFixed(2)
                        : locationForm.long.value
                    }
                    onChange={(e) =>
                      dispatch(
                        onChangeLocationInputs(Number(e.target.value), "long")
                      )
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
                  type="text"
                  className="form-control"
                  name="Radius"
                  placeholder="Radius"
                  id="Radius"
                  value={locationForm.radius.value}
                  onChange={(e) =>
                    dispatch(onChangeLocationInputs(e.target.value, "radius"))
                  }
                  style={
                    locationForm.radius.valid ? {} : { border: "1px solid red" }
                  }
                />
                <span style={{ marginLeft: 5 }}>Radian</span>
              </div>
              {locationForm.radius.valid ? null : (
                <div style={{ color: "red", fontSize: 14 }}>
                  {locationForm.radius.validationError}
                </div>
              )}
              <div className="row my-3 m-auto">
                <div className="col d-flex justify-content-center">
                  <button
                    disabled={
                      disableBtn
                        ? disableBtn
                        : !(
                            locationForm.name.valid &&
                            locationForm.lat.valid &&
                            locationForm.long.valid &&
                            locationForm.radius.valid
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
                    {loadEditLocation ? (
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
                {/* <div className="col d-flex justify-content-center">
                  <button type="submit" className="btn btn-secondary w-50">
                    Cancel
                  </button>
                </div> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default EditLocation;
