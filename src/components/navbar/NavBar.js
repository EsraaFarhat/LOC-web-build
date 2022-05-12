import React, { useState } from "react";
import "./navbar.css";
import logo from "../../assets/images/logo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { onLogout } from "../../store/Login/Login";
import { useDispatch, useSelector } from "react-redux";

export default function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.login.token);

  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <div className="row d-flex justify-content-center">
      <div className="col-12 col-md-8">
        <div className="d-flex justify-content-center w-75 m-auto">
          <nav className="navbar navbar-expand-lg navbar-light  w-100 m-auto text-center py-0 rounded">
            <div className="container-fluid" style={{paddingLeft:"0px" , paddingRight:"0px"}}>
              <a href="" className="navbar-brand">
                <div className="d-flex justify-content-start">
                  <div>
                    <img className="logo" src={logo} />
                  </div>
                  <div style={{ lineHeight: "5px", marginTop: "15px" }}>
                    <span className="d-block" style={{ fontSize: "10px" }}>
                      KelTech IoT
                    </span>

                    <span style={{ fontSize: "5px", color: "#2EA6AF" }}>
                      WE MAKE SMART SIMPLE
                    </span>
                  </div>
                </div>

                <div>
                  <p style={{ fontSize: "7px", marginBottom: "0px" }}>
                    Smart solutions for smart infrastructure
                  </p>
                </div>
              </a>
              <button
                className="custom-toggler navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarToggle"
                aria-controls="navbarsExample09"
                aria-expanded={!isNavCollapsed ? true : false}
                aria-label="Toggle navigation"
                onClick={handleNavCollapse}
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div
                className={`${
                  isNavCollapsed ? "collapse" : ""
                } navbar-collapse`}
                id="navbarToggle"
              >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <NavLink
                      className="nav-link active"
                      to={"/globalidenetifiers"}
                    >
                      HOME
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to={"/users"}>
                      ADMIN
                    </NavLink>
                  </li>
                </ul>
                <ul className="navbar-nav">
                  {/* <li className="nav-item">
                  <NavLink className="nav-link" to={"/login"}>LOGIN</NavLink>
                </li>
                <li>
                  <NavLink className="nav-link" style={{color:"#0987B1"}} to={"/signup"}>SIGN UP</NavLink>
                </li> */}
                  {token ? (
                    <li onClick={() => dispatch(onLogout(navigate))}>
                      <NavLink
                        className="nav-link"
                        style={{ color: "#0987B1" }}
                        to={"/home"}
                      >
                        LOG OUT
                      </NavLink>
                    </li>
                  ) : (
                    <li onClick={() => dispatch(onLogout(navigate))}>
                      <NavLink
                        className="nav-link"
                        style={{ color: "#0987B1" }}
                        to={"/login"}
                      >
                        Login
                      </NavLink>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
      <hr />
    </div>
  );
}
