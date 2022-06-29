import { checkValidity, updateObject } from "../../util/utility";
import { toast } from "react-toastify";

const START_LOGIN_HANDLER = "KELTECH/STORE/LOGIN/START_LOGIN_HANDLER";
const ON_LOGIN_SUCCESS = "KELTECH/LOGIN/ON_LOGIN_SUCCESS";
const REDIRECT_TO_HOME = "KELTECH/STROE/LOGIN/REDIRECT_TO_HOME";
const ON_LOGOUT_HANDLER = "KELTECH/STORE/LOGIN/ON_LOGOUT_HANDLER";
const ON_FINISH_LOGOUT = "KELTECH/STORE/LOGIN/ON_FINISH_LOGOUT";
const LOGIN_FAILED = "KelTech/LOGIN/LOGIN_FAILED";

const CHANGE_LOGIN_INPUT_HANDLER =
  "KELTECH/STORE/LOGIN/CHANGE_LOGIN_INPUT_HANDLER";

const initialState = {
  token: null,
  userId: null,
  role: null,
  loginForm: {
    email: {
      value: "",
      valid: false,
      validation: {
        required: true,
        isEmail: true,
      },
      validationError: "Required. Must be a valid e-mail address",
      touched: false,
    },

    password: {
      value: "",
      valid: false,
      validation: {
        required: true,
        minLength: 5,
      },
      validationError: "Required. Password must be at least 5 characters",
      touched: false,
    },
  },
  loading: false,
  redirectToHome: false,
};

export const onChangeLoginInput = (text, inputIdentifier) => {
  return {
    type: CHANGE_LOGIN_INPUT_HANDLER,
    text: text,
    inputIdentifier,
  };
};

const changeLoginInput = (state, action) => {
  const updatedLoginForm = updateObject(state.loginForm, {
    [action.inputIdentifier]: updateObject(
      state.loginForm[action.inputIdentifier],
      {
        value: action.text,
        valid: checkValidity(
          action.text,
          state.loginForm[action.inputIdentifier] &&
            state.loginForm[action.inputIdentifier].validation
        ),
        touched: true,
      }
    ),
  });

  return updateObject(state, {
    ...state,
    loginForm: updatedLoginForm,
  });
};

export const redirectToHome = () => {
  return {
    type: REDIRECT_TO_HOME,
  };
};

const onRedirectToHome = (state, action) => {
  return updateObject(state, {
    redirectToHome: true,
  });
};

export const onStartLogin = () => {
  return {
    type: START_LOGIN_HANDLER,
  };
};

const startLogin = (state, action) => {
  return updateObject(state, { loading: true });
};

export const onLoginHandler = (e, email, pass, navigate) => {
  e && e.preventDefault();
  const authData = {
    email: email,
    password: pass,
  };
  return (dispatch) => {
    dispatch(onStartLogin());
    fetch("https://api.loc.store/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(authData),
    })
      .then((res) => {
        console.log("110", res);
        return res.json();
      })
      .then((resData) => {
        // login successfully!
        dispatch(onLoginFailed());
        if (resData.error) {
          toast.error(resData.error);
        }
        console.log(resData);

        if (resData.token !== undefined) {
          localStorage.setItem("token", resData.token);
          localStorage.setItem("userId", resData.user.user_id);
          localStorage.setItem("role", resData.user.role);
        }
        return resData;
      })
      .then((resData) => {
        console.log("128", resData);
        dispatch(
          resData &&
            resData.user &&
            onLoginSuccess(
              resData.token,
              resData.user.user_id,
              resData.user.role
            )
        );
        return resData;
      })
      .then((resData) => {
        if (resData.token) {
          navigate("/");
        }
      });
  };
};

export const onLoginFailed = () => {
  return { type: LOGIN_FAILED };
};

const loginFailed = (state, action) => {
  return updateObject(state, { loading: false });
};

export const onLoginSuccess = (token, userId, role) => {
  return { type: ON_LOGIN_SUCCESS, token, userId, role };
};

const loginHandlerSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    userId: action.userId,
    role: action.role,
    loading: false,
  });
};

export const authCheckState = (navigate) => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    console.log("105", token);
    console.log("105", userId);
    if (!token) {
      dispatch(onSubmitLogout());
    } else {
      dispatch(onLoginSuccess(token, userId, navigate));
    }
  };
};

export const onLogout = (navigate) => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("role");

  return {
    type: ON_LOGOUT_HANDLER,
    navigate,
  };
};

const logoutHandler = (state, action) => {
  if (action.navigate) {
    action.navigate("/login");
  }
  return updateObject(state, {
    token: null,
    userId: null,
    role: null,
    redirectToLogin: true,
  });
};

export const onFinishLogout = () => {
  return { type: ON_FINISH_LOGOUT };
};

const finishLogoutHandler = (state, action) => {
  return updateObject(state, { redirectToLogin: false });
};

// anonymous logout action
export const onSubmitLogout = () => {
  return (dispatch) => {
    dispatch(onLogout());
    setTimeout(() => {
      dispatch(onFinishLogout());
    }, 2000);
  };
};
export default function LoginReducer(state = initialState, action) {
  switch (action.type) {
    case START_LOGIN_HANDLER:
      return startLogin(state, action);
    case ON_LOGIN_SUCCESS:
      return loginHandlerSuccess(state, action);
    case REDIRECT_TO_HOME:
      return onRedirectToHome(state, action);
    case ON_LOGOUT_HANDLER:
      return logoutHandler(state, action);
    case ON_FINISH_LOGOUT:
      return finishLogoutHandler(state, action);
    case LOGIN_FAILED:
      return loginFailed(state, action);

    case CHANGE_LOGIN_INPUT_HANDLER:
      return changeLoginInput(state, action);
    default:
      return state;
  }
}
