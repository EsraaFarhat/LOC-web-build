import React, { Fragment, useEffect, useState } from "react";
import { renderIntoDocument } from "react-dom/test-utils";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import {
  onFetchingLogs,
  onFetchingSpecificUser,
  onFetchingUserLogs,
} from "../../store/LogsReducer/LogsReducer";
import { onChangeSearchVal } from "../../store/Projects/ProjectsReducer";
import formatAMPM from "../../util/DateFormat";

const UserLogs = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.login.token);
  const { id } = useParams();
  const [flag, setFlag] = useState(false);
  const {
    specificUser,
    loadSpecificUser,
    userLogs,
    loadingUserLogs,
    error,
    errorMsg,
  } = useSelector((state) => state.logs);

  useEffect(() => {
    dispatch(onFetchingSpecificUser(id, token));
    dispatch(onFetchingUserLogs(id, token));
  }, [dispatch, token, flag]);

  const handleMarkAsSeen = (time) => {
    console.log(time);
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
        console.log("seen", resData);
        if (resData.error) {
          toast(resData.error);
        }
        if (resData.error && resData.error[0]) {
          toast(resData.error[0].message);
        }
        // window.location.reload(false);
        if (resData.message) {
          setFlag(false);
          // toast.success(resData.message);
        }
      });
  };

  const unSeenState = userLogs?.filter((log) => log.state === false);
  const seenState = userLogs?.filter((log) => log.state === true);
  const [renderItem, setRenderItem] = useState("all");

  return (
    <Fragment>
      <div className="container">
        <ToastContainer />
        <div className="row">
          {specificUser && specificUser.user_id ? (
            <div className="m-auto">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                <h3 className="text-center my-3">
                  {specificUser.fullName} Logs
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
                      {/* <th scope="col">METHOD</th> */}
                      {/* <th scope="col">STATUS CODE</th> */}
                      <th scope="col">STATE</th>
                    </tr>
                  </thead>

                  {error ? (
                    <div>{errorMsg}</div>
                  ) : userLogs &&
                    userLogs.length > 0 &&
                    renderItem === "all" ? (
                    userLogs.map((log) => {
                      return (
                        <tbody key={log.time}>
                          <tr scope="row">
                            <td>
                              <div
                                style={{
                                  width: "300px",
                                  wordWrap: "break-word",
                                }}
                              >
                                {log.description}
                              </div>
                            </td>
                            <td>{log.user_name}</td>
                            <td>{new Date(log.time).toUTCString()}</td>
                            {/* <td>{log.method}</td> */}
                            {/* <td>{log.status_code}</td> */}
                            <td>
                              {log.state ? (
                                <button className="btn btn-primary" disabled>
                                  Seen
                                </button>
                              ) : (
                                <button
                                  className="btn btn-primary"
                                  onClick={() => {
                                    handleMarkAsSeen(log.time);
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
                  ) : null}

                  {error ? (
                    <div>{errorMsg}</div>
                  ) : userLogs &&
                    userLogs.length > 0 &&
                    renderItem === "notSeen" ? (
                    unSeenState.map((log) => {
                      return (
                        <tbody key={log.time}>
                          <tr scope="row">
                            <td>
                              <div
                                style={{
                                  width: "300px",
                                  wordWrap: "break-word",
                                }}
                              >
                                {log.description}
                              </div>
                            </td>
                            <td>{log.user_name}</td>
                            <td>{new Date(log.time).toUTCString()}</td>
                            {/* <td>{log.method}</td> */}
                            {/* <td>{log.status_code}</td> */}
                            <td>
                              {log.state ? (
                                <button className="btn btn-primary" disabled>
                                  Seen
                                </button>
                              ) : (
                                <button
                                  className="btn btn-primary"
                                  onClick={() => {
                                    handleMarkAsSeen(log.time);
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
                  ) : null}

                  {error ? (
                    <div>{errorMsg}</div>
                  ) : userLogs &&
                    userLogs.length > 0 &&
                    renderItem === "seen" ? (
                    seenState.map((log) => {
                      return (
                        <tbody key={log.time}>
                          <tr scope="row">
                            <td>
                              <div
                                style={{
                                  width: "300px",
                                  wordWrap: "break-word",
                                }}
                              >
                                {log.description}
                              </div>
                            </td>
                            <td>{log.user_name}</td>
                            <td>{new Date(log.time).toUTCString()}</td>
                            {/* <td>{log.method}</td> */}
                            {/* <td>{log.status_code}</td> */}
                            <td>
                              <button className="btn btn-primary" disabled>
                                Seen
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      );
                    })
                  ) : null}
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

export default UserLogs;
