import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { css } from "@emotion/react";
import logo from "../../assets/images/logo.png";
import { onChangeLoginInput, onLoginHandler } from "../../store/Login/Login";
import { PropagateLoader } from "react-spinners";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { onAddingNewUser } from "../../store/AddUsers/AddUsers";

const clientId =
  "438107565814-1qnje9u0lfd3ephmf06rvngmu48eq0h8.apps.googleusercontent.com";
const styleIcon = {
  position: "absolute",
  top: "12px",
  left: "3%",
  color: "#363636CC",
};

const LogIn = (props) => {
  // const onSignoutSuccess = () => {
  //     alert("You have been logged out successfully");
  //     console.clear();
  //     setShowloginButton(true);
  //     setShowlogoutButton(false);
  // };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loginForm, loading } = useSelector((state) => state.login);
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  const [showloginButton, setShowloginButton] = useState(true);
  const [showlogoutButton, setShowlogoutButton] = useState(false);
  const token = useSelector((state) => state.login.token);
  const onLoginSuccess = (res) => {
    console.log("Login Success:", res.profileObj);
    console.log("26", res.profileObj);
    dispatch(
      onAddingNewUser({
        e: null,
        token,
        firstName: res.profileObj.givenName,
        lastName: res.profileObj.familyName,
        email: res.profileObj.email,
        role: "user",
      })
    );
    setShowloginButton(false);
    setShowlogoutButton(true);
  };

  const onLoginFailure = (res) => {
    console.log("Login Failed:", res);
  };

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

            <h4 className="text-center mt-4">Welcome Back!</h4>
            <p
              className="mt-1"
              style={{ fontSize: "13px", textAlign: "center" }}
            >
              Log In To Your Account
            </p>
            <form>
              <div style={{ position: "relative" }}>
                <i className="fas fa-user" style={styleIcon}></i>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  placeholder="Email"
                  onChange={(e) =>
                    dispatch(onChangeLoginInput(e.target.value, "email"))
                  }
                  value={loginForm.email.value}
                  style={
                    loginForm.email.valid
                      ? { borderColor: "#ccc", paddingLeft: "35px" }
                      : { borderColor: "red", paddingLeft: "35px" }
                  }
                />
                {loginForm.email.valid ? null : (
                  <div style={{ color: "red", fontSize: 14 }}>
                    {loginForm.email.validationError}
                  </div>
                )}
              </div>
              <div className="mt-3" style={{ position: "relative" }}>
                <i className="fas fa-lock" style={styleIcon}></i>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  onChange={(e) =>
                    dispatch(onChangeLoginInput(e.target.value, "password"))
                  }
                  value={loginForm.password.value}
                  style={
                    loginForm.password.valid
                      ? { borderColor: "#ccc", paddingLeft: "35px" }
                      : { borderColor: "red", paddingLeft: "35px" }
                  }
                />
                {loginForm.password.valid ? null : (
                  <div style={{ color: "red", fontSize: 14 }}>
                    {loginForm.password.validationError}
                  </div>
                )}
              </div>
              <p
                className="mt-2"
                style={{ fontSize: "12px", textAlign: "end" }}
              >
                <Link
                  to={"/forgetpassword"}
                  style={{ textDecoration: "none", color: "#9A9A9A" }}
                >
                  Forgot Password
                </Link>
              </p>
              <div className="d-flex justify-content-center my-4">
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ width: "130px", height: "50px" }}
                  disabled={!loginForm.password.valid || !loginForm.email.valid}
                  onClick={(e) =>
                    dispatch(
                      onLoginHandler(
                        e,
                        loginForm.email.value,
                        loginForm.password.value,
                        navigate
                      )
                    )
                  }
                >
                  {loading ? (
                    <PropagateLoader
                      color={"#fff"}
                      // loading={loading}
                      css={override}
                      size={10}
                    />
                  ) : (
                    "Log In"
                  )}
                </button>
              </div>
            </form>
            {/* <p
              style={{
                fontSize: "12px",
                textAlign: "center",
                color: "#2EA6AF",
                marginBottom: "4px",
              }}
            >
              OR CONNECT USING
            </p> */}
            {/* <div className="d-flex justify-content-center mb-4">
              <button
                type="button"
                className="btn btn-danger btn-sm"
                style={{ backgroundColor: "#dd4b39" }}
              >
                <i className="fab fa-google me-2"></i> 
                
              </button>
              <GoogleLogin
                clientId={clientId}
                buttonText="Google"
                onSuccess={onLoginSuccess}
                onFailure={onLoginFailure}
                cookiePolicy={"single_host_origin"}
                isSignedIn={true}
              />
            </div> */}

            {/* <p
              className="mt-2"
              style={{
                fontSize: "12px",
                textAlign: "center",
                color: "#494949",
              }}
            >
              Don't Have Account?{" "}
              <Link
                style={{ color: "#2EA6AF", textDecoration: "none" }}
                to={"/signup"}
              >
                Sign Up
              </Link>
            </p> */}
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default LogIn;
