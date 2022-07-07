import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import SuspendBtn from "../suspendBtn";
import UpgradeBtn from "../upgradeBtn";
import {
  onAddingNewUser,
  onChangeAddUserInput,
  onChangeSearchVal,
  onDeletingUser,
  onEditingUser,
  onFetchingUsers,
  onResetNewUserForm,
  onSearchingUser,
  onSelectEditUser,
} from "../../store/AddUsers/AddUsers";
import styles from "./users.module.css";
import { PropagateLoader } from "react-spinners";
import { css } from "@emotion/react";
import log from "../../assets/images/log.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { url } from "../../constants";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
export default function Users() {
  const [disableBtn, setDisableBtn] = useState(false);
  const dispatch = useDispatch();
  const { token, userId } = useSelector((state) => state.login);
  const {
    userForm,
    loading,
    users,
    selectedUser,
    loadFetching,
    loadEditing,
    searchResult,
    searchForm,
    renderedItem,
  } = useSelector((state) => state.newUser);

  const [addIsOpen, setAddIsOpen] = useState(false);
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [DeleteIsOpen, setDeleteIsOpen] = useState(false);
  const [upgradeModalIsOpen, setUpgradeModalIsOpen] = useState(false);
  const [userID, setUserID] = useState("");
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    dispatch(onFetchingUsers(token));
  }, [dispatch, token]);

  useEffect(() => {
    if (selectedUser && selectedUser.fullName) {
      dispatch(
        onChangeAddUserInput(
          selectedUser.fullName.indexOf(" ") > -1
            ? selectedUser.fullName.split(" ")[0]
            : selectedUser.fullName,
          "firstName"
        )
      );
      dispatch(
        onChangeAddUserInput(
          selectedUser.fullName.split(" ")[1]
            ? selectedUser.fullName.split(" ")[1]
            : "",
          "lastName"
        )
      );
      dispatch(onChangeAddUserInput(selectedUser.email, "email"));
      dispatch(onChangeAddUserInput(selectedUser.role, "role"));
    }
  }, [selectedUser]);

  const handleSuspend = (id) => {
    return new Promise((resolve, reject) => {
      fetch(`${url}/api/users/${id}/suspend`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((resData) => {
          if (resData.error) {
            toast(resData.error);
            resolve("error");
          }
          if (resData.error && resData.error[0]) {
            toast(resData.error[0].message);
          }
          if (resData.message) {
            toast.success(resData.message);
            resolve("success");
          }
        });
    });
  };

  const handleUpgrade = (id) => {
    setUpgradeModalIsOpen(true);
  };

  return (
    <Fragment>
      <div className="container">
        <ToastContainer />
        <div className="row">
          <div className="col-11 col-md-12 col-lg-11 m-auto">
            <h3 className="text-center mt-3">Users</h3>
            <div className="row m-auto">
              <div
                className="col-6 col-md-8 d-flex justify-content-end"
                style={{ paddingRight: "0px" }}
              >
                <div style={{ position: "relative", width: "80%" }}>
                  <i
                    className="far fa-search text-dark"
                    style={{ position: "absolute", top: "30%", left: "3%" }}
                  ></i>
                  <input
                    style={{ paddingLeft: 35 }}
                    type="text"
                    className="form-control "
                    name="search"
                    placeholder="Search"
                    onChange={(e) => {
                      dispatch(onChangeSearchVal(e.target.value, "textVal"));
                      dispatch(
                        onSearchingUser(
                          e.target.value,
                          token,
                          searchForm.searchType.value
                        )
                      );
                    }}
                  />
                </div>
              </div>
              <div className="col pl-0">
                {/* search */}
                <select
                  id="select"
                  className="form-select"
                  onChange={(e) => {
                    dispatch(onChangeSearchVal(e.target.value, "searchType"));
                  }}
                  style={{ width: "70%" }}
                >
                  <option value="">Filter By</option>
                  <option value="fullName">Name</option>
                  <option value="email">Email</option>
                </select>
              </div>
            </div>

            {renderedItem === "users" ? (
              loadFetching ? (
                <div style={{ textAlign: "center", padding: "20px 0" }}>
                  <div className="spinner-border" role="status">
                    {/* <span className="sr-only">Loading...</span> */}
                  </div>
                </div>
              ) : (
                <div
                  className="table-responsive mt-4"
                  style={{ maxHeight: window.innerHeight - 300 }}
                >
                  <table className="table table-borderless mt-3">
                    <thead>
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Available Tags</th>
                        <th scope="col" className="text-center">
                          Settings
                        </th>
                      </tr>
                    </thead>

                    {users && users.length > 0
                      ? users.map((user) => {
                          return user ? (
                            <tbody key={user.user_id}>
                              <tr>
                                <td
                                  scope="row"
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    textAlign: "left",
                                  }}
                                >
                                  {user.fullName}

                                  <div style={{ marginRight: "20%" }}>
                                    <Link
                                      to={"/userslogs/" + user.user_id}
                                      style={{ textDecoration: "none" }}
                                    >
                                      <img
                                        style={{
                                          width: "18px",
                                          height: "16px",
                                          paddingLeft: "5px",
                                        }}
                                        src={log}
                                      />
                                    </Link>
                                  </div>
                                </td>
                                <td>{user.email}</td>

                                <td>{user.role}</td>
                                <td>
                                  <div className="flex flex-row">
                                    <div className="w-6/12 ">
                                      {user.tags
                                        ? `(${user.available_tags} of ${user.tags})`
                                        : "Empty Wallet"}
                                    </div>
                                    <div className="w-6/12 ">
                                      <UpgradeBtn
                                        handleUpgrade={handleUpgrade}
                                        id={user.user_id}
                                      />
                                    </div>
                                  </div>
                                </td>
                                <td className="flex justify-around items-between">
                                  <div className="w-9/12">
                                    <button
                                      className="btn p-0 m-0 mx-2"
                                      type="button"
                                      onClick={() => {
                                        dispatch(
                                          onSelectEditUser(user.user_id)
                                        );
                                        setEditIsOpen(true);
                                      }}
                                    >
                                      <i className="fas fa-pencil-alt text-secondary "></i>
                                    </button>
                                    <button
                                      className="btn p-0 m-0"
                                      type="button"
                                      onClick={() => {
                                        setUserID(user.user_id);
                                        setDeleteIsOpen(true);
                                      }}
                                    >
                                      <i className="far fa-trash-alt text-danger"></i>
                                    </button>
                                    {/* suspend */}

                                    <SuspendBtn
                                      suspend={user.suspend}
                                      handleSuspend={handleSuspend}
                                      id={user.user_id}
                                    />
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          ) : (
                            // ) : null
                            <div style={{ textAlign: "center" }}>
                              No Users Added Yet.
                            </div>
                          );
                        })
                      : null}
                  </table>
                </div>
              )
            ) : (
              <div className="table-responsive mt-5">
                <table className="table table-borderless mt-3">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Role</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>

                  {searchResult && searchResult.length > 0 ? (
                    searchResult.map((user) => {
                      return user ? (
                        user.email !== "admi@gmail.com" ? (
                          <tbody key={user.user_id}>
                            <tr>
                              <td
                                scope="row"
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  textAlign: "left",
                                }}
                              >
                                {/* <a href="#">{user.fullName}</a> */}
                                {user.fullName}

                                <div style={{ marginRight: "20%" }}>
                                  <Link
                                    to={"/userslogs/" + user.user_id}
                                    style={{ textDecoration: "none" }}
                                  >
                                    <img
                                      style={{
                                        width: "18px",
                                        height: "16px",
                                        paddingLeft: "5px",
                                      }}
                                      src={log}
                                    />
                                  </Link>
                                </div>
                              </td>
                              <td>{user.email}</td>
                              <td>{user.role}</td>
                              <td>
                                <button
                                  className="btn p-0 m-0 mx-2"
                                  type="button"
                                  data-bs-toggle="modal"
                                  data-bs-target="#editUser"
                                  onClick={() => {
                                    dispatch(onSelectEditUser(user.user_id));
                                    setEditIsOpen(true);
                                  }}
                                >
                                  <i className="fas fa-pencil-alt text-secondary "></i>
                                </button>

                                <button
                                  className="btn p-0 m-0"
                                  type="button"
                                  onClick={() => {
                                    setUserID(user.user_id);
                                    setDeleteIsOpen(true);
                                  }}
                                >
                                  <i className="far fa-trash-alt text-danger"></i>
                                </button>

                                {user.suspend ? (
                                  <button
                                    className="btn btn-danger btn-sm px-1 py-0 mx-1"
                                    // type="button"
                                    onClick={() => {
                                      handleSuspend(user.user_id);
                                      setFlag(true);
                                    }}
                                  >
                                    unsuspend
                                  </button>
                                ) : (
                                  <button
                                    className="btn btn-primary btn-sm px-1 py-0 mx-1"
                                    // type="button"
                                    onClick={() => {
                                      handleSuspend(user.user_id);
                                      setFlag(true);
                                    }}
                                  >
                                    suspend
                                  </button>
                                )}
                              </td>
                            </tr>
                          </tbody>
                        ) : null
                      ) : null;
                    })
                  ) : (
                    <div>User Not Found.</div>
                  )}
                </table>
              </div>
            )}

            <div className="row my-4">
              <div className="col-12 col-md-4 w-50 m-auto d-flex justify-content-center">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    setAddIsOpen(true);
                    dispatch(onResetNewUserForm());
                  }}
                >
                  Add User
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Modal ADD User */}
        <Modal
          isOpen={addIsOpen}
          style={customStyles}
          onRequestClose={() => setAddIsOpen(false)}
          contentLabel="Example Modal"
          className={styles.Modal}
          overlayClassName={styles.Overlay}
          ariaHideApp={false}
        >
          <div className="container modal-body">
            <div className="row">
              <div className="col-10 m-auto">
                <h5 className="text-center my-3">ADD NEW USER</h5>
                <form
                  onSubmit={(e) => {
                    dispatch(
                      onAddingNewUser({
                        e,
                        token: token,
                        lastName: userForm.lastName.value,
                        firstName: userForm.firstName.value,
                        email: userForm.email.value,
                        password: userForm.password.value,
                        role: userForm.role.value,
                      })
                    );
                    setAddIsOpen(false);
                  }}
                >
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control p-2"
                      placeholder="First Name"
                      onChange={(e) =>
                        dispatch(
                          onChangeAddUserInput(e.target.value, "firstName")
                        )
                      }
                      value={userForm.firstName.value}
                      style={
                        userForm.firstName.valid
                          ? { borderColor: "#ccc" }
                          : { borderColor: "red" }
                      }
                    />
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Last Name"
                      onChange={(e) =>
                        dispatch(
                          onChangeAddUserInput(e.target.value, "lastName")
                        )
                      }
                      value={userForm.lastName.value}
                      style={
                        userForm.lastName.valid
                          ? { borderColor: "#ccc" }
                          : { borderColor: "red" }
                      }
                    />
                  </div>
                  {userForm.firstName.valid ? null : (
                    <div style={{ color: "red", fontSize: 14 }}>
                      {userForm.firstName.validationError}
                    </div>
                  )}
                  <input
                    type="email"
                    className="form-control mt-3 p-2"
                    placeholder="Email"
                    name="email"
                    onChange={(e) =>
                      dispatch(onChangeAddUserInput(e.target.value, "email"))
                    }
                    value={userForm.email.value}
                    style={
                      userForm.email.valid
                        ? { borderColor: "#ccc" }
                        : { borderColor: "red" }
                    }
                  />
                  {userForm.email.valid ? null : (
                    <div style={{ color: "red", fontSize: 14 }}>
                      {userForm.email.validationError}
                    </div>
                  )}
                  <input
                    type="password"
                    className="form-control mt-3 p-2"
                    placeholder="Password"
                    name="password"
                    onChange={(e) =>
                      dispatch(onChangeAddUserInput(e.target.value, "password"))
                    }
                    value={userForm.password.value}
                    style={
                      userForm.password.valid
                        ? { borderColor: "#ccc" }
                        : { borderColor: "red" }
                    }
                  />
                  {userForm.password.valid ? null : (
                    <div style={{ color: "red", fontSize: 14 }}>
                      {userForm.password.validationError}
                    </div>
                  )}
                  <select
                    id="select"
                    className="form-select mt-3 p-2"
                    onChange={(e) =>
                      dispatch(onChangeAddUserInput(e.target.value, "role"))
                    }
                    value={userForm.role.value}
                    style={
                      userForm.role.valid
                        ? { borderColor: "#ccc" }
                        : { borderColor: "red" }
                    }
                  >
                    <option value="">Role</option>
                    <option value="admin">ADMIN</option>
                    <option value="super user">SUPER USER</option>
                    <option value="user">USER</option>
                  </select>
                  {userForm.role.valid ? null : (
                    <div style={{ color: "red", fontSize: 14 }}>
                      {userForm.role.validationError}
                    </div>
                  )}
                  <div className="d-flex justify-content-center my-3">
                    <button
                      disabled={
                        disableBtn
                          ? disableBtn
                          : !(
                              userForm.lastName.valid &&
                              userForm.firstName.valid &&
                              userForm.email.valid &&
                              userForm.role.valid
                            )
                      }
                      type="submit"
                      className="btn btn-primary w-25"
                      style={{ width: "130px", height: "40px" }}
                      onClick={() => {
                        setTimeout(() => {
                          setDisableBtn(true);
                        }, 1);
                        setTimeout(() => {
                          setDisableBtn(false);
                        }, 2000);
                      }}
                    >
                      {/* ADD */}
                      {loading ? (
                        <PropagateLoader
                          color={"#fff"}
                          css={override}
                          size={10}
                        />
                      ) : (
                        "ADD"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Modal>
        {/* End Model */}

        {/* Edit User Modal */}
        <Modal
          isOpen={editIsOpen}
          style={customStyles}
          onRequestClose={() => setEditIsOpen(false)}
          contentLabel="Edit Modal"
          ariaHideApp={false}
          className={styles.Modal}
          overlayClassName={styles.Overlay}
        >
          <div className="container modal-body">
            <div className="row">
              <div className="col-10 m-auto">
                <h5 className="text-center my-3">EDIT NEW USER</h5>
                <form
                  onSubmit={(e) => {
                    dispatch(
                      onEditingUser({
                        e,
                        userId: selectedUser.user_id,
                        token: token,
                        lastName: userForm.lastName.value,
                        firstName: userForm.firstName.value,
                        email: userForm.email.value,
                        password: userForm.password.value,
                        confirmPassword: userForm.confirmPassword.value,
                        role: userForm.role.value,
                      })
                    );
                    setEditIsOpen(false);
                  }}
                >
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control p-2"
                      placeholder="First Name"
                      onChange={(e) =>
                        dispatch(
                          onChangeAddUserInput(e.target.value, "firstName")
                        )
                      }
                      value={userForm.firstName.value}
                      style={
                        userForm.firstName.valid
                          ? { borderColor: "#ccc" }
                          : { borderColor: "red" }
                      }
                    />
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Last Name"
                      onChange={(e) =>
                        dispatch(
                          onChangeAddUserInput(e.target.value, "lastName")
                        )
                      }
                      value={
                        selectedUser &&
                        userForm.lastName &&
                        userForm.lastName.value
                      }
                      style={
                        userForm.lastName.valid
                          ? { borderColor: "#ccc" }
                          : { borderColor: "red" }
                      }
                    />
                  </div>
                  {userForm.firstName.valid ? null : (
                    <div style={{ color: "red", fontSize: 14 }}>
                      {userForm.firstName.validationError}
                    </div>
                  )}

                  <input
                    type="email"
                    className="form-control mt-3 p-2"
                    placeholder="Email"
                    name="email"
                    onChange={(e) =>
                      dispatch(onChangeAddUserInput(e.target.value, "email"))
                    }
                    value={
                      selectedUser && userForm.email && userForm.email.value
                    }
                    style={
                      userForm.email.valid
                        ? { borderColor: "#ccc" }
                        : { borderColor: "red" }
                    }
                  />
                  {userForm.email.valid ? null : (
                    <div style={{ color: "red", fontSize: 14 }}>
                      {userForm.email.validationError}
                    </div>
                  )}

                  <input
                    type="password"
                    className="form-control mt-3 p-2"
                    placeholder="Password"
                    name="password"
                    onChange={(e) =>
                      dispatch(onChangeAddUserInput(e.target.value, "password"))
                    }
                    value={
                      selectedUser &&
                      userForm.password &&
                      userForm.password.value
                    }
                    style={
                      userForm.password.valid
                        ? { borderColor: "#ccc" }
                        : { borderColor: "red" }
                    }
                  />
                  {userForm.password.valid ? null : (
                    <div style={{ color: "red", fontSize: 14 }}>
                      {userForm.password.validationError}
                    </div>
                  )}

                  <input
                    type="password"
                    className="form-control mt-3 p-2"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    onChange={(e) =>
                      dispatch(
                        onChangeAddUserInput(e.target.value, "confirmPassword")
                      )
                    }
                    value={
                      selectedUser &&
                      userForm.confirmPassword &&
                      userForm.confirmPassword.value
                    }
                    style={
                      userForm.confirmPassword.valid
                        ? { borderColor: "#ccc" }
                        : { borderColor: "red" }
                    }
                  />
                  {userForm.confirmPassword.valid ? null : (
                    <div style={{ color: "red", fontSize: 14 }}>
                      {userForm.confirmPassword.validationError}
                    </div>
                  )}

                  <select
                    id="select1"
                    className="form-select mt-3 p-2"
                    onChange={(e) =>
                      dispatch(onChangeAddUserInput(e.target.value, "role"))
                    }
                    value={selectedUser && userForm.role && userForm.role.value}
                    style={
                      userForm.role.valid
                        ? { borderColor: "#ccc" }
                        : { borderColor: "red" }
                    }
                  >
                    <option value="">Role</option>
                    <option value="admin">ADMIN</option>
                    <option value="super user">SUPER USER</option>
                    <option value="user">USER</option>
                  </select>
                  {userForm.role.valid ? null : (
                    <div style={{ color: "red", fontSize: 14 }}>
                      {userForm.role.validationError}
                    </div>
                  )}

                  <div className="d-flex justify-content-center my-3">
                    <button
                      disabled={
                        disableBtn
                          ? disableBtn
                          : !(
                              userForm.lastName.valid &&
                              userForm.firstName.valid &&
                              userForm.email.valid &&
                              userForm.role.valid
                            )
                      }
                      type="submit"
                      className="btn btn-primary mx-2 w-25"
                      style={{ width: "130px", height: "40px" }}
                      onClick={() => {
                        setTimeout(() => {
                          setDisableBtn(true);
                        }, 1);
                        setTimeout(() => {
                          setDisableBtn(false);
                        }, 2000);
                      }}
                    >
                      {/* Edit */}
                      {loadEditing ? (
                        <PropagateLoader
                          color={"#fff"}
                          css={override}
                          size={10}
                        />
                      ) : (
                        "Save"
                      )}
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary mx-2"
                      onClick={() => setEditIsOpen(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Modal>
        {/* End Edit User Modal */}

        {/* Delete Modal */}
        <Modal
          isOpen={DeleteIsOpen}
          style={customStyles}
          onRequestClose={() => setDeleteIsOpen(false)}
          contentLabel="Edit Modal"
          ariaHideApp={false}
          className={styles.Modal}
          overlayClassName={styles.Overlay}
        >
          <div className="container modal-body">
            <div className="row">
              <div className="col-10 m-auto">
                <h5 className="text-center my-3">
                  Are you sure you want to delete this?
                </h5>

                <div className="d-flex justify-content-center my-3">
                  <button
                    type="button"
                    className="btn btn-danger mx-2"
                    onClick={(e) => {
                      dispatch(onDeletingUser(e, userID, token));
                      setDeleteIsOpen(false);
                    }}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary mx-2"
                    onClick={() => setDeleteIsOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
        {/* End Delete Modal */}
      </div>
    </Fragment>
  );
}
