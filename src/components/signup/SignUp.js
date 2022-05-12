import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/images/logo.png";

const styleIcon = {
  position: "absolute",
  top: "12px",
  left: "3%",
  color: "#363636CC",
};

const SignUp = () => {
  return (
    <Fragment>
      <div className="container">
        <div className="row mt-5">
          <div className="col-10 col-md-6 col-lg-4 m-auto ">
            <div className="d-flex justify-content-center ms-3">
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
                paddingLeft: "65px",
                paddingTop: "4px",
              }}
            >
              Smart solutions for smart infrastructure
            </p>

            <h4 className="text-center mt-3">Welcome Back!</h4>
            <p
              className="mt-2"
              style={{ fontSize: "13px", textAlign: "center" }}
            >
              Create A New Account
            </p>
            <form>
              <div style={{ position: "relative" }}>
                <i className="fas fa-user" style={styleIcon}></i>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  placeholder="Username"
                  style={{ paddingLeft: "35px" }}
                />
              </div>
              <div className="mt-3" style={{ position: "relative" }}>
                <i className="fas fa-user" style={styleIcon}></i>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  placeholder="Email"
                  style={{ paddingLeft: "35px" }}
                />
              </div>
              <div className="mt-3" style={{ position: "relative" }}>
                <i className="fas fa-lock" style={styleIcon}></i>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  style={{ paddingLeft: "35px" }}
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
                />
              </div>
              <div className="d-flex justify-content-center my-4">
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ width: "130px" }}
                >
                  Sign Up
                </button>
              </div>
            </form>
            <p
              style={{
                fontSize: "12px",
                textAlign: "center",
                color: "#2EA6AF",
                marginBottom: "4px",
              }}
            >
              OR CONNECT USING
            </p>
            <div className="d-flex justify-content-center mb-4">
              <button
                type="button"
                className="btn btn-danger btn-sm"
                style={{ backgroundColor: "#dd4b39" }}
              >
                <i className="fab fa-google me-2"></i> Google
              </button>
            </div>
            <p
              className="mt-2"
              style={{
                fontSize: "12px",
                textAlign: "center",
                color: "#494949",
              }}
            >
              Already Have Account?{" "}
              <Link
                style={{ color: "#2EA6AF", textDecoration: "none" }}
                to={"/login"}
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default SignUp;
