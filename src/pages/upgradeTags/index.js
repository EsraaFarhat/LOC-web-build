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
import NotAuthPage from "../../pages/NotAuth/NotAuthPage";

import roles, { notSuperUser, notUser } from "../../util/roles";

const stripePromise = loadStripe(
  "pk_test_51LDV07AoFWV7oCgbIBNbkbVoLrprO4F3h55oPnSZwg9TYgjDLYhczTzDnyLkgyfWo4iBBtY5aFTD78to08mTjXAJ00u7PvEjhn"
);

function UpgradeTags() {
  const { token, userId, role } = useSelector((state) => state.login);
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

  if (!notUser.includes(role)) return <NotAuthPage />;
  if (!notSuperUser.includes(role)) return <NotAuthPage />;

  return (
    <>
      <NavBar />

      {currentUser?.role === roles.saas_admin &&
      userData?.role === roles.saas_admin ? (
        <UpgradeAdminTags />
      ) : null}
      {currentUser?.role === roles.saas_admin &&
      userData?.role === roles.admin ? (
        <UpgradeSuperUserTags userData={userData} currentUser={currentUser} />
      ) : null}
      {currentUser?.role === roles.saas_admin &&
      userData?.role === roles.super_user ? (
        <UpgradeSuperUserTags userData={userData} currentUser={currentUser} />
      ) : null}
      {currentUser?.role === roles.saas_admin &&
      userData?.role === roles.user ? (
        <UpgradeSuperUserTags userData={userData} currentUser={currentUser} />
      ) : null}
      {currentUser?.role === roles.admin ? <BuySuperUserTags /> : null}
    </>
  );
}

export default UpgradeTags;
