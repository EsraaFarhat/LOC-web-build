import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import { css } from "@emotion/react";
import logo from "../../assets/images/logo.png";
import {
  onSendingMailForResetPassword,
  onChangeAddUserInput,
} from "../../store/AddUsers/AddUsers";

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

export default function MailForResetPassword() {
  const { userForm, loading } = useSelector((state) => state.newUser);
  // const [email, setEmail] = useState("");
  const [disableBtn, setDisableBtn] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //  console.log(email);

  //  fetch("https://api.loc.store/api/users/reset-password", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     // Authorization: `Bearer ${token}`,
  //   },
  //   body: JSON.stringify({
  //     email: email,
  //   }),
  // })
  //   .then((res) => {
  //     return res.json();
  //   })
  //   .then((resData) => {
  //     console.log("34", resData);
  //     if (resData.error) {
  //       toast(resData.error);
  //     }
  //     if (resData.error && resData.error[0]) {
  //       toast(resData.error[0].message);
  //     }
  //     if (resData.message) {
  //       toast.success(resData.message);
  //       setTimeout(() => {
  //         navigate("/login")
  //       }, 2000);
  //       // navigate("/login")
  //     }
  //   });

  // };

  return (
    <Fragment>
      <div className="container">
        <ToastContainer />
        <div className="row mt-5">
          <div className="col-10 col-md-6 col-lg-4 m-auto ">
            <div className="d-flex justify-content-center">
              <img style={{ width: "75px", height: "65px" }} src={logo} />
              <div className="col-6 pt-3">
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
                textAlign: "center",
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
              Enter your email to reset your password
            </p>
            {/* <form onSubmit={handleSubmit}>

          <div className="mt-3" style={{ position: "relative" }}>
              <i className="fas fa-user" style={styleIcon}></i>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Email"
                  style={{ paddingLeft: "35px" }}
                  onChange={(e) => {
                    setEmail(e.target.value);
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
          </form> */}

            <form
              onSubmit={(e) =>
                dispatch(
                  onSendingMailForResetPassword({
                    e,
                    email: userForm.email.value,
                    navigate,
                  })
                )
              }
            >
              <div className="mt-3" style={{ position: "relative" }}>
                <i className="fas fa-user" style={styleIcon}></i>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  name="email"
                  onChange={(e) =>
                    dispatch(onChangeAddUserInput(e.target.value, "email"))
                  }
                  value={userForm.email.value}
                  style={
                    userForm.email.valid
                      ? { borderColor: "#ccc", paddingLeft: "35px" }
                      : { borderColor: "red", paddingLeft: "35px" }
                  }
                />
                {userForm.email.valid ? null : (
                  <div style={{ color: "red", fontSize: 14 }}>
                    {userForm.email.validationError}
                  </div>
                )}
              </div>
              <div className="d-flex justify-content-center my-3">
                <button
                  disabled={disableBtn ? disableBtn : !userForm.email.valid}
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
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
