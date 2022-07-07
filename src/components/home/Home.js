import React, { Fragment, useEffect } from "react";
import logo from "../../assets/images/LOC.gif";
import LOClogo from "../../assets/images/loc-logo.png";

const Home = () => {
  return (
    <Fragment>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-12 col-lg-5 m-auto">
            <div
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                style={{
                  width: "120px",
                  height: "100px",
                  display: "block",
                  margin: "auto",
                }}
                src={LOClogo}
              />
            </div>
            <h5 className="text-center mt-5">WELCOME TO LABEL ON CABLE</h5>
            <p className="text-center">
              An Asset Identification Software Platform for efficient,
              cost-effective and reliable tracking of assets
            </p>
            <div className="text-center">
              <a
                target="_blank"
                href="https://www.keltechnetworkinnovations.com/products/label-on-cable-loc/"
              >
                <button type="button" className="btn btn-primary btn-sm">
                  See Pricing Options
                </button>
              </a>
            </div>
          </div>
          <div className="col-12 col-md-12 col-lg-6 mb-5">
            <div className="d-flex justify-content-center">
              <img
                src={logo}
                style={{
                  width: "500px",
                  height: "380px",
                  border: "1px solid #0987B1",
                  marginTop: "55px",
                  boxShadow: " 0px 0px 6px #0987B1",
                  opacity: "1",
                  borderRadius: "7px",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
