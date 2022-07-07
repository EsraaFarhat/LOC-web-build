import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { url } from "../../constants";

function UpgradeSuperUserTags(params) {
  const userData = params.userData;
  const currentUser = params.currentUser;
  const { token, userId } = useSelector((state) => state.login);
  const [numOfAddedTags, setNumOfAddedTags] = useState(0);
  const navigate = useNavigate();
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const handleAddedTags = async (id, qty) => {
    axios
      .patch(
        `${url}/api/users/add-tags/user`,
        {
          amount: qty,
          user_id: id,
        },
        {
          headers: headers,
        }
      )
      .then((response) => {
        navigate("/users");
        toast.success(response.data, {
          duration: 1000,
          onClose: () => {
            navigate("/users");
          },
        });
      })
      .catch((err) => {
        toast(err.message);
      });
  };
  return (
    <div className="container flex justify-center">
      <ToastContainer />
      <div className="w-6/12 ">
        <h5
          className="modal-title text-center m-3"
          id="exampleModalLabel"
        >{`Upgrade Tags for user ${userData?.fullName}`}</h5>

        <div className="form-group row">
          <label htmlFor="inputTag" className="w-9/12 col-form-label">
            Enter The Tag amount
          </label>
          <div className="w-3/12">
            <input
              type="number"
              step={10}
              min={0}
              className="form-control"
              id="numOfAddedTags"
              placeholder="Tags"
              value={numOfAddedTags}
              onChange={(e) => setNumOfAddedTags(e.target.value)}
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputTagPrice" className="w-9/12 col-form-label">
            {`The Available tags for ${currentUser?.fullName}`}
          </label>
          <div className="w-3/12">
            <input
              type="text"
              readOnly
              className="form-control-plaintext"
              id="staticEmail"
              value={`${currentUser?.tags} `}
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="btn btn-success"
            onClick={() => {
              handleAddedTags(userData.user_id, numOfAddedTags);
            }}
          >
            Add Tags
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpgradeSuperUserTags;
