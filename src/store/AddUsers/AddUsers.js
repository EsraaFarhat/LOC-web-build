import { url } from "../../constants";
import { toast } from "react-toastify";
import { checkValidity, updateObject } from "../../util/utility";
import { userIS } from "./userIS";

const INPUT_CHANGE_HANDLER = "KELTECH/STORE/ADDUSERS/INPUT_CHANGE_HANDLER";

const START_ADDING_USER = "KELTECH/STORE/ADDUSERS/START_ADDING_USER";
const FINISH_ADDING_USER = "KELTECH/STORE/ADDUSERS/FINISH_ADDING_USER";

const START_FETCHING_USERS = "KELTECH/STORE/ADDUSERS/START_FETCHING_USERS";
const FINISH_FETCHING_USERS = "KELTECH/STORE/ADDUSERS/FINISH_FETCHING_USERS";

const SELECT_EDIT_USER = "KELTECH/ADDUSERS/SELECT_EDIT_USER";

const START_EDITING_USER = "KELTECH/ADDADDRESS/START_EDIT_USER";
const FINISH_EDITING_USER = "KELTECH/ADDADDRESS/FINISH_EDIT_USER";

const START_DELETING_USER = "KELTECH/ADDUSERS/START_DELETE_USER";
const FINISH_DELETING_USER = "KELTECH/ADDUSERS/FINISH_DELETE_USER";

const SEARCH_INPUT_CHANGE_HANDLER =
  "KELTECH/STORE/USERS/SEARCH_INPUT_CHANGE_HANDLER";

const START_SEARCHING_USER = "KELTECH/STORE/USERS/START_SEARCH_USER";
const FINISH_SEARCHING_USER = "KELTECH/STORE/USERS/FINISH_SEARCH_USER";

const CHANGE_RENDERED_ITEM = "KELTECH/STORE/USERS/CHANGE_RENDER_ITEM";

const RESET_NEW_USER_FORM = "KELTECH/STORE/USERS/RESET_NEW_USER_FORM";

// =============================================================
export const onChangeAddUserInput = (text, inputIdentifier) => {
  return {
    type: INPUT_CHANGE_HANDLER,
    text: text,
    inputIdentifier,
  };
};

const changeInputHandler = (state, action) => {
  const updatedUserForm = updateObject(state.userForm, {
    [action.inputIdentifier]: updateObject(
      state.userForm[action.inputIdentifier],
      {
        value: action.text,
        valid: checkValidity(
          action.text,
          state.userForm[action.inputIdentifier] &&
            state.userForm[action.inputIdentifier].validation
        ),
        touched: true,
      }
    ),
  });

  return updateObject(state, {
    ...state,
    userForm: updatedUserForm,
  });
};
// =============================================================

// =============================================================
export const onStartAddingUser = () => {
  return { type: START_ADDING_USER };
};

const startAddingUser = (state, action) => {
  return updateObject(state, { loading: true });
};

export const onAddingNewUser = ({
  e,
  token,
  firstName,
  lastName,
  email,
  password,
  role,
}) => {
  e && e.preventDefault();
  return (dispatch) => {
    dispatch(onStartAddingUser());
    fetch(`${url}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        fullName: firstName + " " + lastName,
        email: email,
        password: password,
        role: role,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        dispatch(onFinishAddingUser(resData.user));
        if (resData.error) {
          toast(resData.error);
        }
        if (resData.message) {
          toast.success(resData.message);
        }
      });
  };
};

export const onSendingMailForResetPassword = ({ e, email, navigate }) => {
  e && e.preventDefault();
  return (dispatch) => {
    dispatch(onStartAddingUser());
    fetch(`${url}/api/users/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        dispatch(onFinishAddingUser(resData.user));
        if (resData.error) {
          toast(resData.error);
        }
        if (resData.message) {
          toast.success(resData.message);
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
      });
  };
};

export const onSendingPasswordForResetPassword = ({
  e,
  password,
  confirmPassword,
  token,
  navigate,
}) => {
  e && e.preventDefault();
  return (dispatch) => {
    dispatch(onStartAddingUser());
    fetch(`${url}/api/users/update-password?token=${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
        confirmPassword: confirmPassword,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        if (resData.error) {
          toast(resData.error);
        }
        if (resData.error && resData.error[0]) {
          toast(resData.error[0].message);
        }
        if (resData.message) {
          toast.success(resData.message);
          setTimeout(() => {
            navigate("/login");
          }, 2000);
          // navigate("/login")
        }
      });
  };
};

export const onFinishAddingUser = (userInfo) => {
  return { type: FINISH_ADDING_USER, userInfo };
};

const finishAddingUser = (state, action) => {
  if (action.userInfo) {
    const users = [...state.users];
    users.push(action.userInfo);
    return updateObject(state, { loading: false, users });
  } else {
    return updateObject(state, { loading: false });
  }
};
// =============================================================

export const onStartFetchingUsers = () => {
  return { type: START_FETCHING_USERS };
};

const startFetchingUsers = (state, action) => {
  return updateObject(state, { loadFetching: true });
};

export const onFetchingUsers = (token) => {
  return (dispatch) => {
    dispatch(onStartFetchingUsers());
    fetch(`${url}/api/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        dispatch(onFinishFetchingUsers(resData.users));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const onFinishFetchingUsers = (users) => {
  return { type: FINISH_FETCHING_USERS, users };
};

const finishFetchingUsers = (state, action) => {
  return updateObject(state, { loadFetching: false, users: action.users });
};
// =============================================================

export const onSelectEditUser = (userId) => {
  return { type: SELECT_EDIT_USER, userId };
};

const selectEditUser = (state, action) => {
  const users = [...state.users];
  const selectedUser = users.find((user) => user.user_id === action.userId);
  return updateObject(state, { selectedUser: selectedUser });
};
// =============================================================

export const onStartEditingUser = () => {
  return { type: START_EDITING_USER };
};

const startEditingUser = (state, action) => {
  return updateObject(state, { loadEditing: true });
};

export const onEditingUser = ({
  e,
  userId,
  token,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  role,
}) => {
  e.preventDefault();
  return (dispatch) => {
    dispatch(onStartEditingUser());
    fetch(`${url}/api/users/` + userId, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: firstName + " " + lastName,
        email: email,
        password: password,
        confirmPassword,
        confirmPassword,
        role: role,
      }),
    })
      .then((res) => res.json())
      .then((resData) => {
        dispatch(onFinishEditingUser(resData.user, userId));

        if (resData.error) {
          if (Array.isArray(resData.error)) {
            return toast.error(resData.error[0].message);
          } else {
            return toast.error(resData.error);
          }
        }

        if (resData.message) {
          dispatch(onChangeRenderedItem("users"));
          toast.success(resData.message);
        }
      });
  };
};

export const onFinishEditingUser = (user, userId) => {
  return { type: FINISH_EDITING_USER, user, userId };
};

const finishEditingUser = (state, action) => {
  if (action.user) {
    const users = [...state.users];
    const updatedUserIndex = users.findIndex(
      (user) => user.user_id === action.userId
    );
    users[updatedUserIndex] = action.user;
    return updateObject(state, { loadEditing: false, users: users });
  } else {
    return updateObject(state, { loadEditing: false });
  }
};
// =============================================================

export const onStartDeletingUser = () => {
  return { type: START_DELETING_USER };
};

const startDeletingUser = (state, action) => {
  return updateObject(state, { loadingDeleteUser: true });
};

export const onDeletingUser = (e, userId, token) => {
  e.preventDefault();
  return (dispatch) => {
    dispatch(onStartDeletingUser());
    fetch(`${url}/api/users/` + userId, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (res.status === 204) {
          dispatch(onChangeRenderedItem("users"));
          dispatch(onFinishDeletingUser(userId));
          toast.success("Deleting Success.");
        } else {
          return toast.error(res.statusText);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const onFinishDeletingUser = (userId) => {
  return { type: FINISH_DELETING_USER, userId };
};

const finishDeletingUser = (state, action) => {
  const users = [...state.users];
  const updatedUsersList = users.filter(
    (user) => user.user_id !== action.userId
  );
  return updateObject(state, {
    loadingDeleteUser: false,
    users: updatedUsersList,
  });
};
// =============================================================

export const onChangeSearchVal = (text, inputIdentifier) => {
  return {
    type: SEARCH_INPUT_CHANGE_HANDLER,
    text: text,
    inputIdentifier,
  };
};

const searchInputChangeHandler = (state, action) => {
  const updatedSearchForm = updateObject(state.searchForm, {
    [action.inputIdentifier]: updateObject(
      state.searchForm[action.inputIdentifier],
      {
        value: action.text,
        valid: checkValidity(
          action.text,
          state.searchForm[action.inputIdentifier] &&
            state.searchForm[action.inputIdentifier].validation
        ),
        touched: true,
      }
    ),
  });

  return updateObject(state, {
    ...state,
    searchForm: updatedSearchForm,
  });
};
// =============================================================

export const onStartSearchingUser = () => {
  return { type: START_SEARCHING_USER };
};

const startSearchingUser = (state, action) => {
  return updateObject(state, { loadSearch: true });
};

export const onSearchingUser = (text, token, type) => {
  return (dispatch) => {
    dispatch(onStartSearchingUser());
    fetch(
      type === "email"
        ? `${url}/api/users?email=${text}`
        : `${url}/api/users?fullName=${text}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        dispatch(onFinishSearchingUser(resData.users));
        if (text === "") {
          dispatch(onChangeRenderedItem("users"));
        } else {
          dispatch(onChangeRenderedItem("searchResult"));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const onFinishSearchingUser = (users) => {
  return { type: FINISH_SEARCHING_USER, users };
};

const finishSearchingUser = (state, action) => {
  return updateObject(state, {
    loadSearch: false,
    searchResult: action.users,
  });
};
// =============================================================
export const onChangeRenderedItem = (item) => {
  return { type: CHANGE_RENDERED_ITEM, item };
};

const changeReneredItem = (state, action) => {
  return updateObject(state, { renderedItem: action.item });
};
// =============================================================

export const onResetNewUserForm = () => {
  return { type: RESET_NEW_USER_FORM };
};

const resetNewUserForm = (state, action) => {
  const updatedUserForm = updateObject(state.userForm, userIS.userForm);
  return updateObject(state, {
    ...state,
    userForm: updatedUserForm,
  });
};
// =============================================================

export default function AddUsersReducer(state = userIS, action) {
  switch (action.type) {
    case INPUT_CHANGE_HANDLER:
      return changeInputHandler(state, action);
    case START_ADDING_USER:
      return startAddingUser(state, action);
    case FINISH_ADDING_USER:
      return finishAddingUser(state, action);

    case START_FETCHING_USERS:
      return startFetchingUsers(state, action);
    case FINISH_FETCHING_USERS:
      return finishFetchingUsers(state, action);
    case SELECT_EDIT_USER:
      return selectEditUser(state, action);

    case START_EDITING_USER:
      return startEditingUser(state, action);
    case FINISH_EDITING_USER:
      return finishEditingUser(state, action);

    case START_DELETING_USER:
      return startDeletingUser(state, action);
    case FINISH_DELETING_USER:
      return finishDeletingUser(state, action);

    case SEARCH_INPUT_CHANGE_HANDLER:
      return searchInputChangeHandler(state, action);

    case START_SEARCHING_USER:
      return startSearchingUser(state, action);
    case FINISH_SEARCHING_USER:
      return finishSearchingUser(state, action);

    case CHANGE_RENDERED_ITEM:
      return changeReneredItem(state, action);
    case RESET_NEW_USER_FORM:
      return resetNewUserForm(state, action);

    default:
      return state;
  }
}
