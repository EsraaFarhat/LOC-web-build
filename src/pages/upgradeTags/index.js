import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useParams } from "react-router-dom";
import NavBar from "../../components/navbar/NavBar";
import CheckoutForm from "../../components/checkoutForm";
import { url } from "../../constants";
import UpgradeAdminTags from "./UpgradeAdminTags";
import UpgradeSuperUserTags from "./UpgradeSuperUserTags";
import BuySuperUserTags from "./BuySuperUserTags";

const stripePromise = loadStripe(
  "pk_test_51LDV07AoFWV7oCgbIBNbkbVoLrprO4F3h55oPnSZwg9TYgjDLYhczTzDnyLkgyfWo4iBBtY5aFTD78to08mTjXAJ00u7PvEjhn"
);

function UpgradeTags() {
  const { token, userId } = useSelector((state) => state.login);
  const [userData, setUserData] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const { id } = useParams();
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  useEffect(() => {
    axios
      .get(
        `${url}/api/users/me`,

        {
          headers: headers,
        }
      )
      .then((response) => {
        setCurrentUser(response.data.user);
      })
      .catch((err) => {
        toast(err.message);
      });
    axios
      .get(
        `${url}/api/users/${id}`,

        {
          headers: headers,
        }
      )
      .then((response) => {
        setUserData(response.data.user);
      })
      .catch((err) => {
        toast(err.message);
      });
  }, []);

  return (
    <>
      <NavBar />

      {currentUser?.role === "admin" && userData?.role === "admin" ? (
        <UpgradeAdminTags />
      ) : null}
      {currentUser?.role === "admin" && userData?.role === "super user" ? (
        <UpgradeSuperUserTags userData={userData} currentUser={currentUser} />
      ) : null}
      {currentUser?.role === "admin" && userData?.role === "user" ? (
        <UpgradeSuperUserTags userData={userData} currentUser={currentUser} />
      ) : null}
      {currentUser?.role === "super user" ? <BuySuperUserTags /> : null}
    </>
  );
}

export default UpgradeTags;
