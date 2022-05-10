import React, { Fragment } from "react";

const EditGlobalIdenetifiers = () => {
  return (
    <Fragment>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-10 m-auto">
            <h3 className="text-center mt-5">Edit Global Identifier</h3>
            <form className="form-horizontal mt-4" role="form">
              <div className="mb-3 m-auto col-9 col-md-6 col-lg-5">
                <input
                  type="text"
                  className="form-control"
                  name="Name"
                  placeholder="Name"
                />
              </div>

              <div className="row mt-4">
                <div className="col-9 col-md-6 m-auto">
                  <div className="d-flex justify-content-center ">
                    <button type="button" className="btn btn-primary w-25">
                      Save
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

export default EditGlobalIdenetifiers;
