import React, { Fragment } from "react";
import NavBar from "../../components/navbar/NavBar";
import Users from "../../components/users/Users";
import { notUser } from "../../util/roles";
import { useSelector } from "react-redux";
import NotAuthPage from "../../pages/NotAuth/NotAuthPage";

const UsersPage = () => {
  const { role } = useSelector((state) => state.login);

  if (!notUser.includes(role)) return <NotAuthPage />;

  return (
    <Fragment>
      <NavBar />
      <Users />
    </Fragment>
  );
};
export default UsersPage;
