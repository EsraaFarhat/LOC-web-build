import { checkValidity, updateObject } from "../../util/utility";
import { toast } from "react-toastify";
import { url } from "../../constants";

const CHNAGE_GLOBAL_IDENTIFIER_INPUT =
  "KELTECH/STORE/GLOBALIDENTIFIER/CHANG_GLOBAL_IDENTIFIER_INPUT";

const START_ADDING_GLOBAL_IDENTIFIER =
  "KELTECH/STORE/GLOBALIDENTIFIER/START_ADDING_GLOBAL_IDENTIFIER";
const FINISH_ADDING_GLOBAL_IDENTIFIER =
  "KELTECH/STORE/GLOBALIDENTIFIER/FINISH_ADDING_GLOBAL_IDENTIFIER";

const START_FETCHIHNG_GLOBAL_IDENTIFIER =
  "KELTECH/STORE/GLOBALIDENTIFIER/START_FETCHIHNG_GLOBAL_IDENTIFIER";
const FINISH_FETCHIHNG_GLOBAL_IDENTIFIER =
  "KELTECH/STORE/GLOBALIDENTIFIER/FINISH_FETCHIHNG_GLOBAL_IDENTIFIER";

const SELECT_IDENTIFIER = "KELTECH/STORE/GLOBALIDENTIFIER/SELECT_IDENTIFIER";

const START_EDITING_IDENTIFIER =
  "KELTECH/STORE/IDENTIFIER/START_EDITING_IDENTIFIER";
const FINISH_EDITING_IDENTIFIER =
  "KELTECH/STORE/IDENTIFIER/FINISH_EDITING_IDENTIFIER";

const START_DELETING_IDENTIFIER =
  "KELTECH/STORE/INDENTEFIER/START_DELETING_IDENTIFIER";
const FINISH_DELETING_IDENTIFIER =
  "KELTECH/STORE/INDENTEFIER/FINISH_DELETING_IDENTIFIER";

const SEARCH_INPUT_CHANGE_HANDLER =
  "KELTECH/STORE/IDENTIFIER/SEARCH_INPUT_CHANGE_HANDLER";

const START_SEARCHING_IDENTIFIER =
  "KELTECH/STORE/USERS/START_SEARCH_IDENTIFIER";
const FINISH_SEARCHING_IDENTIFIER =
  "KELTECH/STORE/USERS/FINISH_SEARCH_IDENTIFIER";

const CHANGE_RENDERED_ITEM = "KELTECH/STORE/IDENTIFIER/CHANGE_RENDER_ITEM";

const RESET_GOLOBALE_IDENTIFIER_FORM =
  "KELTECH/IDENTIFIER/RESET_GLOBAL_IDENTIFIER";

const initialState = {
  globalIdentifierName: {
    name: {
      value: "",
      valid: false,
      validation: {
        required: true,
      },
      validationError: "Required",
      touched: false,
    },
  },
  loading: false,

  selectedIdentifier: {},

  globalIdentifiers: [],
  loadFetchingGlobalIdentifiers: false,

  loadingEdit: false,

  searchForm: {
    textVal: {
      value: "",
      valid: false,
      validation: {
        // required: true,
        // isEmail: true,
      },
      validationError: "Required",
      touched: false,
    },
  },

  searchResult: [],
  loadSearch: false,

  renderedItem: "identifier",
};

// =============================================================

export const onChangeAddGlobalIdentifierInput = (text, inputIdentifier) => {
  return {
    type: CHNAGE_GLOBAL_IDENTIFIER_INPUT,
    text: text,
    inputIdentifier,
  };
};

const changeGlobalIdentifierInputHandler = (state, action) => {
  const updatedGlobalIdentifierName = updateObject(state.globalIdentifierName, {
    [action.inputIdentifier]: updateObject(
      state.globalIdentifierName[action.inputIdentifier],
      {
        value: action.text,
        valid: checkValidity(
          action.text,
          state.globalIdentifierName[action.inputIdentifier] &&
            state.globalIdentifierName[action.inputIdentifier].validation
        ),
        touched: true,
      }
    ),
  });

  return updateObject(state, {
    ...state,
    globalIdentifierName: updatedGlobalIdentifierName,
  });
};
// =============================================================
export const onResettingGlobalIdentifierForm = () => {
  return { type: RESET_GOLOBALE_IDENTIFIER_FORM };
};

const resetGlobalIdentifierForm = (state, action) => {
  const updatedGlobalIdentifierName = updateObject(state.globalIdentifierName, {
    ["name"]: updateObject(state.globalIdentifierName["name"], {
      value: "",
      valid: false,
      validation: {
        required: true,
      },
      validationError: "Required",
      touched: false,
    }),
  });

  return updateObject(state, {
    ...state,
    globalIdentifierName: updatedGlobalIdentifierName,
  });
};

// =============================================================
// Adding Global Identifier
export const onStartAddingGlobalIdentifier = () => {
  return { type: START_ADDING_GLOBAL_IDENTIFIER };
};

const startAddingGlobalIdentifier = (state, action) => {
  return updateObject(state, { loading: true });
};

export const onAddingGlobalIdentifier = (e, token, name, navigate) => {
  e.preventDefault();
  return (dispatch) => {
    dispatch(onStartAddingGlobalIdentifier());
    fetch(`${url}/api/globalIdentifiers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name }),
    })
      .then((res) => res.json())
      .then((resData) => {
        dispatch(onFinishAddingGlobalIdentifier());
        if (resData.error && resData.error[0] && resData.error[0].message) {
          toast(resData.error[0].message);
        }
        if (resData.error) {
          toast.error(resData.error);
        }
        if (resData.message) {
          toast.success(resData.message);
          // navigate(-1);
          setTimeout(() => {
            navigate(-1);
          }, 1500);
        }
      });
  };
};

export const onFinishAddingGlobalIdentifier = () => {
  return { type: FINISH_ADDING_GLOBAL_IDENTIFIER };
};

const finishAddingGlobalIdentifier = (state, action) => {
  return updateObject(state, { loading: false });
};
// =============================================================
// Fetching Global Identifier
export const onStartFetchingGlobalIdentifiers = () => {
  return { type: START_FETCHIHNG_GLOBAL_IDENTIFIER };
};

const startFetchingGlobalIdentifiers = (state, action) => {
  return updateObject(state, { loadFetchingGlobalIdentifiers: true });
};

export const onFetchingGlobalIdentifiers = (token) => {
  return (dispatch) => {
    dispatch(onStartFetchingGlobalIdentifiers());
    fetch(`${url}/api/globalIdentifiers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((resData) => {
        dispatch(onFinishFetchingGlobalIdentifiers(resData.globalIdentifiers));
      });
  };
};

export const onFinishFetchingGlobalIdentifiers = (globalIdentifiers) => {
  return { type: FINISH_FETCHIHNG_GLOBAL_IDENTIFIER, globalIdentifiers };
};

const finishFetchingGlobalIdentifiers = (state, action) => {
  return updateObject(state, {
    loadFetchingGlobalIdentifiers: false,
    globalIdentifiers: action.globalIdentifiers,
  });
};
// =============================================================
// select an Identifier

export const onSelectingIdentifier = (selectedIdentifierId) => {
  return { type: SELECT_IDENTIFIER, selectedIdentifierId };
};

const selectIdentifier = (state, action) => {
  const selectedIdentifier = [...state.globalIdentifiers].find(
    (identifier) => identifier.gid === action.selectedIdentifierId
  );
  return updateObject(state, { selectedIdentifier: selectedIdentifier });
};
// =============================================================
// Edit an Identifier

export const onStartEditingIdentifier = () => {
  return { type: START_EDITING_IDENTIFIER };
};

const startEditingIdenifier = (state, action) => {
  return updateObject(state, { loadingEdit: true });
};

export const onEditingIdentifier = (e, token, identifierId, name) => {
  e.preventDefault();
  return (dispatch) => {
    dispatch(onStartEditingIdentifier());
    fetch(`${url}/api/globalIdentifiers/` + identifierId, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    })
      .then((res) => res.json())
      .then((resData) => {
        if (resData.error) {
          toast.error(resData.error);
        }
        if (resData.message) {
          dispatch(onChangeRenderedItem("identifier"));
          toast.success(resData.message);
          dispatch(
            onFinishEditingIdentifier(identifierId, resData.globalIdentifier)
          );
        }
      });
  };
};

export const onFinishEditingIdentifier = (identifierId, updatedIdentifier) => {
  return { type: FINISH_EDITING_IDENTIFIER, identifierId, updatedIdentifier };
};

const finishEditIdentifier = (state, action) => {
  const identifiers = [...state.globalIdentifiers];
  const selectUpdatedIdentifierIndex = identifiers.findIndex(
    (identifier) => identifier.gid === action.identifierId
  );
  identifiers[selectUpdatedIdentifierIndex] = action.updatedIdentifier;

  let searchIdentifiers;
  if (state.searchResult && state.searchResult > 0) {
    searchIdentifiers = [...state.searchResult];
    const selectUpdatedIdentifierIndex = searchIdentifiers.findIndex(
      (identifier) => identifier.gid === action.identifierId
    );
    searchIdentifiers[selectUpdatedIdentifierIndex] = action.updatedIdentifier;
  }

  if (state.searchResult && state.searchResult > 0) {
    return updateObject(state, {
      loadingEdit: false,
      globalIdentifiers: searchIdentifiers,
    });
  } else {
    return updateObject(state, {
      loadingEdit: false,
      globalIdentifiers: identifiers,
    });
  }
};
// =============================================================
const onStartDeletingIdentifier = () => {
  return { type: START_DELETING_IDENTIFIER };
};

const startDeletingIdentifier = (state, action) => {
  return updateObject(state, { loadingDelete: true });
};

export const onDeletingIdentifier = (identifierId, token) => {
  return (dispatch) => {
    dispatch(onStartDeletingIdentifier());
    fetch(`${url}/api/globalIdentifiers/` + identifierId, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      if (res.status === 204) {
        dispatch(onChangeRenderedItem("identifier"));
        dispatch(onFinishDeletingIdentifier(identifierId));
        toast.success("Deleting Global Identifier Success.");
      } else {
        return toast.error(res.statusText);
      }
    });
  };
};

export const onFinishDeletingIdentifier = (identifierId) => {
  return { type: FINISH_DELETING_IDENTIFIER, identifierId };
};

const finishDeletingIdentifier = (state, action) => {
  const identifiers = [...state.globalIdentifiers];
  const updatedIdentifierList = identifiers.filter(
    (identifier) => identifier.gid !== action.identifierId
  );
  return updateObject(state, {
    loadingDelete: false,
    globalIdentifiers: updatedIdentifierList,
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

export const onStartSearchingIdentifier = () => {
  return { type: START_SEARCHING_IDENTIFIER };
};

const startSearchingIdentifier = (state, action) => {
  return updateObject(state, { loadSearch: true });
};

export const onSearchingIdentifier = (text, token, id) => {
  return (dispatch) => {
    dispatch(onStartSearchingIdentifier());
    fetch(`${url}/api/globalIdentifiers?name=${text}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        dispatch(onFinishSearchingIdentifier(resData.globalIdentifiers));
        if (text === "") {
          dispatch(onChangeRenderedItem("identifier"));
        } else {
          dispatch(onChangeRenderedItem("searchResult"));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const onFinishSearchingIdentifier = (GID) => {
  return { type: FINISH_SEARCHING_IDENTIFIER, GID };
};

const finishSearchingIdentifier = (state, action) => {
  return updateObject(state, {
    loadSearch: false,
    searchResult: action.GID,
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

export default function GlobalIdenetifierReducer(state = initialState, action) {
  switch (action.type) {
    case CHNAGE_GLOBAL_IDENTIFIER_INPUT:
      return changeGlobalIdentifierInputHandler(state, action);

    case START_ADDING_GLOBAL_IDENTIFIER:
      return startAddingGlobalIdentifier(state, action);
    case FINISH_ADDING_GLOBAL_IDENTIFIER:
      return finishAddingGlobalIdentifier(state, action);

    case START_FETCHIHNG_GLOBAL_IDENTIFIER:
      return startFetchingGlobalIdentifiers(state, action);
    case FINISH_FETCHIHNG_GLOBAL_IDENTIFIER:
      return finishFetchingGlobalIdentifiers(state, action);

    case SELECT_IDENTIFIER:
      return selectIdentifier(state, action);

    case START_EDITING_IDENTIFIER:
      return startEditingIdenifier(state, action);
    case FINISH_EDITING_IDENTIFIER:
      return finishEditIdentifier(state, action);

    case START_DELETING_IDENTIFIER:
      return startDeletingIdentifier(state, action);
    case FINISH_DELETING_IDENTIFIER:
      return finishDeletingIdentifier(state, action);

    case SEARCH_INPUT_CHANGE_HANDLER:
      return searchInputChangeHandler(state, action);

    case START_SEARCHING_IDENTIFIER:
      return startSearchingIdentifier(state, action);
    case FINISH_SEARCHING_IDENTIFIER:
      return finishSearchingIdentifier(state, action);

    case CHANGE_RENDERED_ITEM:
      return changeReneredItem(state, action);

    case RESET_GOLOBALE_IDENTIFIER_FORM:
      return resetGlobalIdentifierForm(state, action);
    default:
      return state;
  }
}
