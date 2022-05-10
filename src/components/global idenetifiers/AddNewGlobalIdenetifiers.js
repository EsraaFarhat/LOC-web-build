import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  onAddingGlobalIdentifier,
  onChangeAddGlobalIdentifierInput,
  onFetchingGlobalIdentifiers,
} from "../../store/Globalidenetifiers/Globalidenetifiers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PropagateLoader } from "react-spinners";
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const AddNewGlobalIdenetifiers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [disableBtn, setDisableBtn] = useState(false);
  const { token } = useSelector((state) => state.login);
  const { globalIdentifierName, loading } = useSelector(
    (state) => state.globalIdentifier
  );

  useEffect(() => {
    dispatch(onFetchingGlobalIdentifiers(token));
  }, []);
  return (
    <Fragment>
      <div className="container">
        <ToastContainer />
        <div className="row">
          <div className="col-12 col-md-10 m-auto">
            <h3 className="text-center mt-5">Add new Global Identifiers</h3>
            <form
              className="form-horizontal mt-4"
              role="form"
              onSubmit={(e) => {
                dispatch(
                  onAddingGlobalIdentifier(
                    e,
                    token,
                    globalIdentifierName.name.value,
                    navigate
                  )
                );
              }}
            >
              <div className="mb-3 m-auto col-9 col-md-6 col-lg-5">
                <input
                  type="text"
                  className="form-control"
                  name="Name"
                  placeholder="Enter Global Identifier here…"
                  onChange={(e) =>
                    dispatch(
                      onChangeAddGlobalIdentifierInput(e.target.value, "name")
                    )
                  }
                  value={globalIdentifierName.name.value}
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
              </div>

              <div className="row mt-4">
                <div className="col-9 col-md-6 m-auto">
                  <div className="d-flex justify-content-center ">
                    <button
                      disabled={
                        disableBtn
                          ? disableBtn
                          : !globalIdentifierName.name.valid
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
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default AddNewGlobalIdenetifiers;
