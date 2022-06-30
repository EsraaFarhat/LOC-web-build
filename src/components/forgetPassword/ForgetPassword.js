import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useLocation } from "react-router-dom";

import logo from "../../assets/images/logo.png";

const styleIcon = {
  position: "absolute",
  top: "12px",
  left: "3%",
  color: "#363636CC",
};
export default function ForgetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [disableBtn, setDisableBtn] = useState(false);
  const search = useLocation().search;
  const token = new URLSearchParams(search).get("token");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`https://api.loc.store/api/users/update-password?token=${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
        confirmPassword: confirmPassword,
      }),
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
          toast.success(resData.message);
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
      });
  };

  return (
    <Fragment>
      <div className="container">
        <ToastContainer />
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
          </div>
        </div>
      </div>
    </Fragment>
  );
}
