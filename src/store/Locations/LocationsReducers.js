import { checkValidity, updateObject } from "../../util/utility";
import { toast } from "react-toastify";
import { locationIs } from "./IS";

const CHANGE_LOCATION_INPUT_HANDLER =
  "KELTECH/STORE/LOCATIONS/CHANGE_LOCATION_INPUT_HANDLER";

const START_FETCHING_LOCATIONS =
  "KELTECH/STORE/LOCATION/START_FETCHING_LOCATIONS";
const FINISH_FETCHING_LOCATIONS =
  "KELTECH/STORE/LOCATION/FINISH_FETCHING_LOCATIONS";

const START_ADDING_LOCATIONS = "KELTECH/STORE/LOCATIONS/START_ADDING_LOCATIONS";
const FINISH_ADDING_LOCATIONS =
  "KELTECH/STORE/LOCATIONS/FINISH_ADDING_LOCATIONS";

const SELECT_EDIT_LOCATION = "KELTECH/STORE/LOCATIONS/SELECT_EDIT_LOCATION";

const START_EDITING_LOCATION = "KELTECH/STORE/LOCATIONS/START_EDITING_LOCATION";
const FINISH_EDITING_LOCATION =
  "KELTECH/STORE/LOCATIONS/FINISH_EDITING_LOCATION";

const START_DELETE_LOCATION = "KELTECH/STORE/LOCATION/START_DELETE_LOCATION";
const FINISH_DELETE_LOCATION = "KELTECH/STORE/LOCATION/FINSIH_DELETE_LOCATION";

const SEARCH_INPUT_CHANGE_HANDLER =
  "KELTECH/STORE/LOCATION/SEARCH_INPUT_CHANGE_HANDLER";

const START_SEARCHING_LOCATION =
  "KELTECH/LOACTION/LOCATION/START_SEARCH_LOCATION";
const FINISH_SEARCHING_LOCATION =
  "KELTECH/STORE/LOCATION/FINISH_SEARCH_LOCATION";

const CHANGE_RENDERED_ITEM = "KELTECH/STORE/LOCATIONS/CHANGE_RENDER_ITEM";

const START_SPECIFIC_LOCATION =
  "KELTECH/STORE/LOCATIONS/START_SPECIFIC_LOCATION";
const FINISH_SPECIFIC_LOCATION =
  "KELTECH/STORE/LOCATIONS/FINISH_SPECIFIC_LOCATION";

const RESET_LOCATION_FORM = "KELTECH/STORE/PROJECTS/RESET_LOCATION_FORM";

export const onChangeLocationInputs = (text, inputIdentifier) => {
  return { type: CHANGE_LOCATION_INPUT_HANDLER, text, inputIdentifier };
};

const changeLocationInputs = (state, action) => {
  const updatedLocationForm = updateObject(state.locationForm, {
    [action.inputIdentifier]: updateObject(
      state.locationForm[action.inputIdentifier],
      {
        value: action.text,
        valid: checkValidity(
          action.text,
          state.locationForm[action.inputIdentifier] &&
            state.locationForm[action.inputIdentifier].validation
        ),
        touched: true,
      }
    ),
  });

  return updateObject(state, {
    ...state,
    locationForm: updatedLocationForm,
  });
};

// =============================================================
export const onStartFetchingLocations = () => {
  return { type: START_FETCHING_LOCATIONS };
};

const startFetchingLocations = (state, action) => {
  return updateObject(state, { loadLocations: true });
};

export const onFetchingLocations = (id, token) => {
  return (dispatch) => {
    dispatch(onStartFetchingLocations());
    fetch(`https://api.loc.store/api/projects/${id}/locations`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((resData) => {
        console.log(resData);
        dispatch(onFinishFetchingLocations(resData.locations));
      });
  };
};

export const onFinishFetchingLocations = (locations) => {
  return { type: FINISH_FETCHING_LOCATIONS, locations };
};

const finishFetchingLocations = (state, action) => {
  return updateObject(state, {
    loadLocations: false,
    locations: action.locations,
  });
};
// =============================================================
export const onStartAddingLocation = () => {
  return { type: START_ADDING_LOCATIONS };
};

const startAddingLocation = (state, action) => {
  return updateObject(state, { loadAdding: true });
};

export const onAddingLocation = (
  e,
  token,
  name,
  latitude,
  longitude,
  radius,
  project_id,
  globalIdentifierGID,
  navigate
) => {
  e.preventDefault();
  return (dispatch) => {
    dispatch(onStartAddingLocation());
    fetch("https://api.loc.store/api/locations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
        longitude: longitude,
        latitude: latitude,
        radius: radius ? radius : 10,
        project_id: project_id,
        gid: globalIdentifierGID,
      }),
    })
      .then((res) => res.json())
      .then((resData) => {
        dispatch(onFinishAddingLocation());
        if (resData.error && resData.error[0].message) {
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

export const onFinishAddingLocation = () => {
  return { type: FINISH_ADDING_LOCATIONS };
};

const finishAddingLocation = (state, action) => {
  return updateObject(state, { loadAdding: false });
};
// =============================================================

export const onSelectingLocation = (locationId) => {
  return { type: SELECT_EDIT_LOCATION, locationId };
};

const selectingLocation = (state, action) => {
  if (state.locations) {
    const locations = [...state.locations];
    const selectedEditLocation = locations.find(
      (location) => location.id.toString() === action.locationId.toString()
    );
    return updateObject(state, { selectedEditLocation: selectedEditLocation });
  } else {
    return "null";
  }
};
// =============================================================

export const onStartEditingLocation = () => {
  return { type: START_EDITING_LOCATION };
};

const startEditingLocation = (state, action) => {
  return updateObject(state, { loadEditLocation: true });
};

export const onEditingLocation = (
  e,
  locationId,
  token,
  name,
  latitude,
  longitude,
  radius,
  globalIdentifierGID,
  navigate
) => {
  e.preventDefault();
  return (dispatch) => {
    dispatch(onStartEditingLocation());
    fetch(`https://api.loc.store/api/locations/${locationId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
        longitude: longitude,
        latitude: latitude,
        radius: radius,
        gid: globalIdentifierGID,
      }),
    })
      .then((res) => res.json())
      .then((resData) => {
        console.log(resData);
        dispatch(onFinishEditingLocation());
        if (resData.error && resData.error[0]) {
          return toast(resData.error[0].message);
        }
        if (resData.error) {
          return toast.error(resData.error);
        }
        if (resData.message) {
          dispatch(onChangeRenderedItem("locations"));
          toast.success(resData.message);
          setTimeout(() => {
            navigate(-1);
          }, 1500);
        }
      });
  };
};

export const onFinishEditingLocation = () => {
  return { type: FINISH_EDITING_LOCATION };
};

const finishEditingLocation = (state, action) => {
  return updateObject(state, { loadEditLocation: false });
};
// =============================================================
export const onStartDeletingLocation = () => {
  return { type: START_DELETE_LOCATION };
};

const startDeletingLocation = (state, action) => {
  return updateObject(state, { loadDelete: true });
};

export const onDeletingLocation = (
  e,
  locationId,
  token,
  globalIdentifierGID
) => {
  e.preventDefault();
  return (dispatch) => {
    dispatch(onStartDeletingLocation());
    fetch(`https://api.loc.store/api/locations/${locationId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        gid: globalIdentifierGID,
      }),
    }).then((res) => {
      if (res.status === 204) {
        dispatch(onChangeRenderedItem("locations"));
        dispatch(onFinishDeletingLocation(locationId));
        toast.success("Deleting Success.");
      } else {
        return toast.error(res.statusText);
      }
    });
  };
};

export const onFinishDeletingLocation = (locationId) => {
  return { type: FINISH_DELETE_LOCATION, locationId };
};

const finishDeleteLocation = (state, action) => {
  const locations = [...state.locations];
  const updatedLocationsList = locations.filter(
    (location) => location.id !== action.locationId
  );
  return updateObject(state, { locations: updatedLocationsList });
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

export const onStartSearchingLocation = () => {
  return { type: START_SEARCHING_LOCATION };
};

const startSearchingLocation = (state, action) => {
  return updateObject(state, { loadSearch: true });
};

export const onSearchingLocation = (text, token, id) => {
  return (dispatch) => {
    dispatch(onStartSearchingLocation());
    fetch(`https://api.loc.store/api/projects/${id}/locations?name=${text}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        console.log("api searching location", resData);
        dispatch(onFinishSearchingLocation(resData.locations));
        console.log("396", text);
        if (text === "") {
          dispatch(onChangeRenderedItem("locations"));
        } else {
          dispatch(onChangeRenderedItem("searchResult"));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const onFinishSearchingLocation = (location) => {
  return { type: FINISH_SEARCHING_LOCATION, location };
};

const finishSearchingLocation = (state, action) => {
  return updateObject(state, {
    loadSearch: false,
    searchResult: action.location,
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

export const onStartFetchingSpecificLocation = () => {
  return { type: START_SPECIFIC_LOCATION };
};

const startFetchingSpecificLocation = (state, action) => {
  return updateObject(state, { loadSpacificLocation: true });
};

export const onFetchingSpecificLocation = (id, token) => {
  return (dispatch) => {
    dispatch(onStartFetchingSpecificLocation());
    fetch(`https://api.loc.store/api/locations/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((resData) => {
        // console.log("lllllllllllllllllllll", resData);
        dispatch(onFinishFetchingSpecificLocation(resData.location));
      });
  };
};

export const onFinishFetchingSpecificLocation = (loaction) => {
  return { type: FINISH_SPECIFIC_LOCATION, loaction };
};

const finishFetchingSpecificLocation = (state, action) => {
  return updateObject(state, {
    loadSpacificLocation: false,
    specificLocation: action.loaction,
  });
};
//=================================================================

export const onResetingLocationForm = () => {
  return { type: RESET_LOCATION_FORM };
};

const resetingLocationForm = (state, action) => {
  return updateObject(state, { locationForm: locationIs.locationForm });
};
//=================================================================
export default function LocationReducer(state = locationIs, action) {
  switch (action.type) {
    case CHANGE_LOCATION_INPUT_HANDLER:
      return changeLocationInputs(state, action);

    case START_FETCHING_LOCATIONS:
      return startFetchingLocations(state, action);
    case FINISH_FETCHING_LOCATIONS:
      return finishFetchingLocations(state, action);
    case START_ADDING_LOCATIONS:
      return startAddingLocation(state, action);
    case FINISH_ADDING_LOCATIONS:
      return finishAddingLocation(state, action);

    case SELECT_EDIT_LOCATION:
      return selectingLocation(state, action);

    case START_EDITING_LOCATION:
      return startEditingLocation(state, action);
    case FINISH_EDITING_LOCATION:
      return finishEditingLocation(state, action);

    case START_DELETE_LOCATION:
      return startDeletingLocation(state, action);
    case FINISH_DELETE_LOCATION:
      return finishDeleteLocation(state, action);

    case SEARCH_INPUT_CHANGE_HANDLER:
      return searchInputChangeHandler(state, action);

    case START_SEARCHING_LOCATION:
      return startSearchingLocation(state, action);
    case FINISH_SEARCHING_LOCATION:
      return finishSearchingLocation(state, action);

    case CHANGE_RENDERED_ITEM:
      return changeReneredItem(state, action);

    case START_SPECIFIC_LOCATION:
      return startFetchingSpecificLocation(state, action);

    case FINISH_SPECIFIC_LOCATION:
      return finishFetchingSpecificLocation(state, action);

    case RESET_LOCATION_FORM:
      return resetingLocationForm(state, action);
    default:
      return state;
  }
}
