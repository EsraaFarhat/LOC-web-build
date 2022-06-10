import { updateObject } from "../../util/utility";

const START_FETCHING_USERS_LOGS =
  "KELTECH/STORE/LOGS/START_FETCHING_USERS_LOGS";
const FINISH_FETCHING_USERS_LOGS =
  "KELTECH/STORE/LOGS/FINISH_FETCHING_USERS_LOGS";

const START_FETCHING_SPECIFIC_USER =
  "KELTECH/STORE/LOGS/START_FETCHING_SPECIFIC_USER";
const FINISH_FETCHING_SPECIFIC_USER =
  "KELTECH/STORE/LOGS/FINISH_FETCHING_SPECIFIC_USER";

const START_FETCHING_GLOBAL_IDENTIFIER_LOGS =
  "KELTECH/STORE/LOGS/START_FETCHING_GLOBAL_IDENTIFIER_LOGS";
const FINISH_FETCHING_GLOBAL_IDENTIFIER_LOGS =
  "KELTECH/STORE/LOGS/FINISH_FETCHING_GLOBAL_IDENTIFIER_LOGS";

const START_FETCHING_SPECIFIC_IDENTIFIER =
  "KELTECH/STORE/LOGS/START_FETCHING_SPECIFIC_IDENTIFIER";
const FINISH_FETCHING_SPECIFIC_IDENTIFIER =
  "KELTECH/STORE/LOGS/FINISH_FETCHING_SPECIFIC_IDENTIFIER";

const initialState = {
  specificUser: {},
  loadSpecificUser: false,

  userLogs: [],
  loadingUserLogs: false,

  specificIdnetifier: {},
  loadSpecificIdnetifier: false,

  identifierLogs: [],
  loadingIdentifierLogs: false,

  error: false,
  errorMsg: "",
};
// =============================================================

export const onStartFetchingSpecificUser = () => {
  return { type: START_FETCHING_SPECIFIC_USER };
};

const startFetchingSpecificUser = (state, action) => {
  return updateObject(state, { loadSpecificUser: true });
};

export const onFetchingSpecificUser = (id, token) => {
  return (dispatch) => {
    dispatch(onStartFetchingSpecificUser());
    fetch("https://api.loc.store/api/users/" + id, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((resData) => {
        console.log(resData);
        dispatch(onFinishFetchingSpecificUser(resData.user));
      });
  };
};

export const onFinishFetchingSpecificUser = (user) => {
  return { type: FINISH_FETCHING_SPECIFIC_USER, user };
};

const finishFetchingSpecificUser = (state, action) => {
  return updateObject(state, {
    loadSpecificUser: false,
    specificUser: action.user,
  });
};
// =============================================================
export const onStartFetchingUserLogs = () => {
  return { type: START_FETCHING_USERS_LOGS };
};

const startFetchingUserLogs = (state, action) => {
  return updateObject(state, { loadingUserLogs: true });
};

export const onFetchingUserLogs = (id, token) => {
  return (disptach) => {
    disptach(onStartFetchingUserLogs());
    fetch(`https://api.loc.store/api/users/${id}/logs`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((resData) => {
        console.log("fetching logs 28", resData);
        disptach(onFinishFetchingUserLogs(resData && resData.logs));
      })
      .catch((err) => {        
        disptach(onFinishFetchingUserLogs([], "Network request failed."));
      });
  };
};

export const onFinishFetchingUserLogs = (logs, err) => {
  return { type: FINISH_FETCHING_USERS_LOGS, logs, err };
};

const finishFetchingUserLogs = (state, action) => {
  if (action.err) {
    return updateObject(state, {
      loadingUserLogs: false,
      error: true,
      errorMsg: action.err,
    });
  } else {
    return updateObject(state, {
      loadingUserLogs: false,
      userLogs: action.logs,
      error: false,
    });
  }
};
// =============================================================
export const onStartFetchingSpecificIdentifier = () => {
  return { type: START_FETCHING_SPECIFIC_IDENTIFIER };
};

const startFetchingSpecificIdentifier = (state, action) => {
  return updateObject(state, { loadSpecificIdnetifier: true });
};

export const onFetchingSpecificIdentifier = (id, token) => {
  return (dispatch) => {
    dispatch(onStartFetchingSpecificIdentifier());
    fetch("https://api.loc.store/api/globalIdentifiers/" + id, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((resData) => {
        console.log(resData);
        dispatch(onFinishFetchingSpecificIdnetifier(resData.globalIdentifier));
      });
  };
};

export const onFinishFetchingSpecificIdnetifier = (identifier) => {
  return { type: FINISH_FETCHING_SPECIFIC_IDENTIFIER, identifier };
};

const finishFetchingSpecificIdnetifier = (state, action) => {
  return updateObject(state, {
    loadSpecificIdnetifier: false,
    specificIdnetifier: action.identifier,
  });
};

// =============================================================
export const onStartFetchingIdentifierLogs = () => {
  return { type: START_FETCHING_GLOBAL_IDENTIFIER_LOGS };
};

const startFetchingIdentifierLogs = (state, action) => {
  return updateObject(state, { loadingIdentifierLogs: true });
};

export const onFetchingIdentifierLogs = (id, token) => {
  return (disptach) => {
    disptach(onStartFetchingIdentifierLogs());
    fetch(
      `https://api.loc.store/api/globalidentifiers/${id}/logs`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((resData) => {
        console.log("117", resData);
        disptach(onFinishFetchingIdentifierLogs(resData.logs));
      });
  };
};

export const onFinishFetchingIdentifierLogs = (logs) => {
  return { type: FINISH_FETCHING_GLOBAL_IDENTIFIER_LOGS, logs };
};

const finishFetchingIdentifierLogs = (state, action) => {
  return updateObject(state, {
    loadingIdentifierLogs: false,
    identifierLogs: action.logs,
  });
};
// =============================================================

export default function LogsReducer(state = initialState, action) {
  switch (action.type) {
    case START_FETCHING_SPECIFIC_USER:
      return startFetchingSpecificUser(state, action);
    case FINISH_FETCHING_SPECIFIC_USER:
      return finishFetchingSpecificUser(state, action);

    case START_FETCHING_USERS_LOGS:
      return startFetchingUserLogs(state, action);
    case FINISH_FETCHING_USERS_LOGS:
      return finishFetchingUserLogs(state, action);

    case START_FETCHING_GLOBAL_IDENTIFIER_LOGS:
      return startFetchingIdentifierLogs(state, action);
    case FINISH_FETCHING_GLOBAL_IDENTIFIER_LOGS:
      return finishFetchingIdentifierLogs(state, action);

    case START_FETCHING_SPECIFIC_IDENTIFIER:
      return startFetchingSpecificIdentifier(state, action);
    case FINISH_FETCHING_SPECIFIC_IDENTIFIER:
      return finishFetchingSpecificIdnetifier(state, action);

    default:
      return state;
  }
}
