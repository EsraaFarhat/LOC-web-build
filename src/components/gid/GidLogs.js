import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import {
  onFetchingIdentifierLogs,
  onFetchingSpecificIdentifier,
} from "../../store/LogsReducer/LogsReducer";
import formatAMPM from "../../util/DateFormat";

const GidLogs = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.login.token);
  const [flag, setFlag] = useState(false);
  const { id } = useParams();
  const {
    specificIdnetifier,
    loadSpecificUser,
    identifierLogs,
    loadingIdentifierLogs,
    error,
    errorMsg,
  } = useSelector((state) => state.logs);

  useEffect(() => {
    dispatch(onFetchingSpecificIdentifier(id, token));
    dispatch(onFetchingIdentifierLogs(id, token));
  }, [dispatch, token, flag]);

  const handleMarkAsSeen = (time) => {
    fetch(`https://api.loc.store/api/logs/${time}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        if (resData.error) {
          toast(resData.error);
        }
        if (resData.error && resData.error[0]) {
          toast(resData.error[0].message);
        }
        if (resData.message) {
          // toast.success(resData.message);
          setFlag(false);
        }
      });
  };

  const unSeenState = identifierLogs?.filter((log) => log.state === false);
  const seenState = identifierLogs?.filter((log) => log.state === true);
  const [renderItem, setRenderItem] = useState("all");

  return (
    <Fragment>
      <div className="container">
        <ToastContainer />
        <div className="row">
          {specificIdnetifier && specificIdnetifier.gid ? (
            <div className="m-auto">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                <h3 className="text-center my-3">
                  {specificIdnetifier.name} Logs
                </h3>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "20%",
                  }}
                >
                  {/* <label style={{ marginRight: 5, fontSize: 18 }}>State</label> */}
                  <select
                    id="select"
                    className="form-select"
                    onChange={(e) => {
                      setRenderItem(e.target.value);
                    }}
                    style={{ width: "100%" }}
                  >
                    <option value="all">Filter By</option>
                    <option value="notSeen">Not seen</option>
                    <option value="seen">Seen</option>
                  </select>
                </div>
              </div>
              <div
                className="table-responsive"
                style={{ maxHeight: window.innerHeight - 200 }}
              >
                <table className="table table-bordered mt-3">
                  <thead>
                    <tr style={{ color: "#0987B1" }}>
                      <th scope="col">DESCRIPTION</th>
                      <th scope="col">USER</th>
                      <th scope="col">UPDATED AT</th>
                      <th scope="col">STATE</th>
                    </tr>
                  </thead>
                  {identifierLogs &&
                  identifierLogs.length > 0 &&
                  renderItem === "all"
                    ? identifierLogs.map((identifier) => {
                        return (
                          <tbody key={identifier.time}>
                            <tr scope="row">
                              <td>
                                <div
                                  style={{
                                    width: "300px",
                                    wordWrap: "break-word",
                                  }}
                                >
                                  {identifier.description}
                                </div>
                              </td>
                              <td>{identifier.user_name}</td>
                              <td>{new Date(identifier.time).toUTCString()}</td>
                              {/* <td>{identifier.state}</td> */}
                              {/* <td>{identifier.status_code}</td> */}
                              <td>
                                {identifier.state ? (
                                  <button className="btn btn-primary" disabled>
                                    Seen
                                  </button>
                                ) : (
                                  <button
                                    className="btn btn-primary"
                                    onClick={() => {
                                      handleMarkAsSeen(identifier.time);
                                      setFlag(true);
                                    }}
                                  >
                                    Mark As Seen
                                  </button>
                                )}
                              </td>
                            </tr>
                          </tbody>
                        );
                      })
                    : null}

                  {identifierLogs &&
                  identifierLogs.length > 0 &&
                  renderItem === "notSeen"
                    ? unSeenState.map((identifier) => {
                        return (
                          <tbody key={identifier.time}>
                            <tr scope="row">
                              <td>
                                <div
                                  style={{
                                    width: "300px",
                                    wordWrap: "break-word",
                                  }}
                                >
                                  {identifier.description}
                                </div>
                              </td>
                              <td>{identifier.user_name}</td>
                              <td>{new Date(identifier.time).toUTCString()}</td>
                              {/* <td>{identifier.state}</td> */}
                              {/* <td>{identifier.status_code}</td> */}
                              <td>
                                {identifier.state ? (
                                  <button className="btn btn-primary" disabled>
                                    Seen
                                  </button>
                                ) : (
                                  <button
                                    className="btn btn-primary"
                                    onClick={() => {
                                      handleMarkAsSeen(identifier.time);
                                      setFlag(true);
                                    }}
                                  >
                                    Mark As Seen
                                  </button>
                                )}
                              </td>
                            </tr>
                          </tbody>
                        );
                      })
                    : null}

                  {identifierLogs &&
                  identifierLogs.length > 0 &&
                  renderItem === "seen"
                    ? seenState.map((identifier) => {
                        return (
                          <tbody key={identifier.time}>
                            <tr scope="row">
                              <td>
                                <div
                                  style={{
                                    width: "300px",
                                    wordWrap: "break-word",
                                  }}
                                >
                                  {identifier.description}
                                </div>
                              </td>
                              <td>{identifier.user_name}</td>
                              <td>{new Date(identifier.time).toUTCString()}</td>
                              {/* <td>{identifier.state}</td> */}
                              {/* <td>{identifier.status_code}</td> */}
                              <td>
                                {identifier.state ? (
                                  <button className="btn btn-primary" disabled>
                                    Seen
                                  </button>
                                ) : (
                                  <button
                                    className="btn btn-primary"
                                    onClick={() => {
                                      handleMarkAsSeen(identifier.time);
                                      setFlag(true);
                                    }}
                                  >
                                    Mark As Seen
                                  </button>
                                )}
                              </td>
                            </tr>
                          </tbody>
                        );
                      })
                    : null}
                </table>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <div className="spinner-border" role="status">
                {/* <span className="sr-only">Loading...</span> */}
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};
export default GidLogs;
