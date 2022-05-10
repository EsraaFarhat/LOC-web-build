import React, { Fragment, useEffect , useState } from "react";
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
  const [flag , setFlag] = useState(false);
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
  }, [dispatch, token ,flag]);

  const handleMarkAsSeen = (time) => {
    console.log(token);
    fetch(`http://63.33.18.108:5000/api/logs/${time}`, {
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
        if (resData.message) {
          // toast.success(resData.message);
          setFlag(false)
        }
      });
  };

  return (
    <Fragment>
      <div className="container">
      <ToastContainer />
        <div className="row">
          {specificIdnetifier && specificIdnetifier.gid ? (
            <div className="m-auto">
              <h3 className="text-center my-3">
                {specificIdnetifier.name} Logs
              </h3>
              <div className="table-responsive">
                <table className="table table-bordered mt-3">
                  <thead>
                    <tr style={{ color: "#0987B1" }}>
                      <th scope="col">DESCRIPTION</th>
                      <th scope="col">USER</th>
                      <th scope="col">UPDATED AT</th>
                      <th scope="col">STATE</th>
                    </tr>
                  </thead>
                  {identifierLogs && identifierLogs.length > 0 ? (
                    identifierLogs.map((identifier) => {
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
                            <td>{formatAMPM(new Date(identifier.time))}</td>
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
                                    setFlag(true)
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
                  ) : (
                    <div style={{ textAlign: "center", padding: "20px 0" }}>
                      There is no Logs till now.
                    </div>
                  )}
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
