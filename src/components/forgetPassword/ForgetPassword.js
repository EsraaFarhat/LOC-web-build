import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import { css } from "@emotion/react";
import { useLocation } from "react-router-dom";

import logo from "../../assets/images/logo.png";
import {
  onSendingPasswordForResetPassword,
  onChangeAddUserInput,
} from "../../store/AddUsers/AddUsers";
import { useDispatch, useSelector } from "react-redux";
import { PropagateLoader } from "react-spinners";
const styleIcon = {
  position: "absolute",
  top: "12px",
  left: "3%",
  color: "#363636CC",
};
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
export default function ForgetPassword() {
  const { userForm, loading } = useSelector((state) => state.newUser);
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =useState("")
  const [disableBtn, setDisableBtn] = useState(false);
  const search = useLocation().search;
  const token = new URLSearchParams(search).get("token");
  const navigate = useNavigate();

  console.log(password);
  console.log(confirmPassword);

  const handleSubmit = (e) => {
    e.preventDefault();
   console.log(password,confirmPassword);

   fetch(`http://63.33.18.108:5000/api/users/update-password?token=${token}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: password,
      confirmPassword:confirmPassword,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((resData) => {
      console.log("34", resData);
      if (resData.error) {
        toast(resData.error);
      }
      if (resData.error && resData.error[0]) {
        toast(resData.error[0].message);
      }
      if (resData.message) {
        toast.success(resData.message);
        setTimeout(() => {
              navigate("/login")
            }, 2000);
        // navigate("/login")
      }
    });

  };

  return (
    <Fragment>
      <div className="container">
        <ToastContainer />
        {/* {token} */}
        <div className="row mt-5">
          <div className="col-10 col-md-6 col-lg-4 m-auto ">
            <div className="d-flex justify-content-center ms-3">
              <img style={{ width: "75px", height: "65px" }} src={logo} />
              <div className="col-4 pt-3">
                <span style={{ fontSize: "16px" }}>KelTech IoT</span>
                <span
                  className="d-block"
                  style={{ fontSize: "9px", color: "#2EA6AF" }}
                >
                  WE MAKE SMART SIMPLE
                </span>
              </div>
            </div>
            <p
              style={{
                fontSize: "12px",
                paddingLeft: "65px",
                paddingTop: "4px",
              }}
            >
              Smart solutions for smart infrastructure
            </p>

            <h4 className="text-center mt-3">Welcome Back!</h4>
            <p
              className="mt-2"
              style={{ fontSize: "15px", textAlign: "center" }}
            >
              Reset Your Password
            </p>
            <form onSubmit={handleSubmit}>

            <div className="mt-3" style={{ position: "relative" }}>
              <i className="fas fa-lock" style={styleIcon}></i>
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Password"
                style={{ paddingLeft: "35px" }}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="mt-3" style={{ position: "relative" }}>
                <i className="fas fa-lock" style={styleIcon}></i>
                <input
                  type="password"
                  className="form-control"
                  name="confirm-password"
                  placeholder="Confirm Password"
                  style={{ paddingLeft: "35px" }}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                />
              </div>
            <div className="d-flex justify-content-center my-4">
              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: "130px" }}
                onClick={() => {
                  setTimeout(() => {
                    setDisableBtn(true);
                  }, 1);
                  setTimeout(() => {
                    setDisableBtn(false);
                  }, 3000);
                }}
              >
                Submit
              </button>
            </div>
          </form>

{/* Redux */}
            {/* <form
              onSubmit={(e) =>
                dispatch(
                  onSendingPasswordForResetPassword({
                    e,
                    password: userForm.password.value,
                    confirmPassword: userForm.confirmPassword.value,
                    token,
                    navigate,
                  })
                )
              }
            >
              <div className="mt-3" style={{ position: "relative" }}>
                <i className="fas fa-user" style={styleIcon}></i>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  name="password"
                  onChange={(e) =>
                    dispatch(onChangeAddUserInput(e.target.value, "password"))
                  }
                  value={userForm.password.value}
                  style={
                    userForm.password.valid
                      ? { borderColor: "#ccc", paddingLeft: "35px" }
                      : { borderColor: "red", paddingLeft: "35px" }
                  }
                />
                {userForm.password.valid ? null : (
                  <div style={{ color: "red", fontSize: 14 }}>
                    {userForm.password.validationError}
                  </div>
                )}
              </div>

              <div className="mt-3" style={{ position: "relative" }}>
                <i className="fas fa-user" style={styleIcon}></i>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  onChange={(e) =>
                    dispatch(
                      onChangeAddUserInput(e.target.value, "confirmPassword")
                    )
                  }
                  value={
                    // selectedUser &&
                    // userForm.confirmPassword &&
                    userForm.confirmPassword.value
                  }
                  style={
                    userForm.confirmPassword.valid
                      ? { borderColor: "#ccc", paddingLeft: "35px" }
                      : { borderColor: "red", paddingLeft: "35px" }
                  }
                />
                {userForm.confirmPassword.valid ? null : (
                  <div style={{ color: "red", fontSize: 14 }}>
                    {userForm.confirmPassword.validationError}
                  </div>
                )}
              </div>
              <div className="d-flex justify-content-center my-3">
                <button
                  disabled={
                    disableBtn
                      ? disableBtn
                      : !userForm.password.valid &&
                        !userForm.confirmPassword.valid
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
                    <PropagateLoader color={"#fff"} css={override} size={10} />
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </form> */}

          </div>
        </div>
      </div>
    </Fragment>
  );
}
