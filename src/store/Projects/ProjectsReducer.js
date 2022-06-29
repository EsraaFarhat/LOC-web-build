import { checkValidity, updateObject } from "../../util/utility";
import { toast } from "react-toastify";
import { projectIS } from "./IS";

const CHANGE_PROJECT_INPUTS = "KELTECH/STORE/PROJECTS/CHANGE_PROJECT_INPUTS";

const START_ADDING_PROJECT = "KELTECH/STORE/PROJECTS/START_ADDING_PROJECTS";
const FINISH_ADDING_PROJECT = "KELTECH/STORE/PROJECTS/FINISH_ADDING_PROJECTS";

const SELECT_IDENTIFIER_TO_ADD_PROJECT =
  "KELTECH/STORE/PROJECTS/SELECT_IDENTIFIER_TO_ADD_PROJECT";

const START_FETCHING_PROJECTS =
  "KELTTECH/STORE/PROJECTS/START_FETCHING_PROJECTS";
const FINISH_FETCHING_PROJECTS =
  "KELTTECH/STORE/PROJECTS/FINISH_FETCHING_PROJECTS";

const START_FETCHING_SPECIFIC_PROJECT =
  "KELTTECH/STORE/PROJECTS/START_FETCHING_SPECIFIC_PROJECT";
const FINISH_FETCHING_SPECIFIC_PROJECT =
  "KELTTECH/STORE/PROJECTS/FINISH_FETCHING_SPECIFIC_PROJECT";

const SELECT_EDIT_PROJECT = "KELTECH/STORE/PROJECTS/SELECT_EDIT_PROJECT";

const START_EDITING_PROJECT = "KELTECH/STORE/PROJECTS/START_EDITING_PROJECT";
const FINISH_EDITING_PROJECT = "KELTECH/STORE/PROJECTS/FINISH_EDITING_PROJECT";

const START_DELETE_PROJECT = "KELTECH/STORE/PROJECT/START_DELETE_PROJECT";
const FINISH_DELETE_PROJECT = "KELTECH/STORE/PROJECT/FINSIH_DELETE_PROJECT";

const SEARCH_INPUT_CHANGE_HANDLER =
  "KELTECH/STORE/PROJECTS/SEARCH_INPUT_CHANGE_HANDLER";

const START_SEARCHING_PROJECT =
  "KELTECH/LOACTION/PROJECT/START_SEARCH_PROJECTS";
const FINISH_SEARCHING_PROJECT =
  "KELTECH/STORE/PROJECTS/FINISH_SEARCH_PROJECTS";

const CHANGE_RENDERED_ITEM = "KELTECH/STORE/PROJECTS/CHANGE_RENDER_ITEM";

const RESET_PROJECT_FORM = "KELTECH/STORE/PROJECTS/RESET_PROJECT_FORM";

// =============================================================
export const onChangeProjectInputs = (text, inputIdentifier) => {
  return {
    type: CHANGE_PROJECT_INPUTS,
    text: text,
    inputIdentifier,
  };
};

const changeProjectInputs = (state, action) => {
  const updatedProjectForm = updateObject(state.projectForm, {
    [action.inputIdentifier]: updateObject(
      state.projectForm[action.inputIdentifier],
      {
        value: action.text,
        valid: checkValidity(
          action.text,
          state.projectForm[action.inputIdentifier] &&
            state.projectForm[action.inputIdentifier].validation
        ),
        touched: true,
      }
    ),
  });

  return updateObject(state, {
    ...state,
    projectForm: updatedProjectForm,
  });
};
// =============================================================

export const onStartAddingProject = () => {
  return { type: START_ADDING_PROJECT };
};

const startAddingProject = (state, action) => {
  return updateObject(state, { loadAdding: true });
};

export const onAddingProject = (
  e,
  token,
  name,
  latitude,
  longitude,
  radius,
  gid,
  navigate
) => {
  e.preventDefault();
  return (dispatch) => {
    dispatch(onStartAddingProject());
    fetch("https://api.loc.store/api/projects", {
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
        gid: gid,
      }),
    })
      .then((res) => res.json())
      .then((resData) => {
        dispatch(onFinishAddingProject());
        if (resData.error && resData.error[0].message) {
          toast(resData.error[0].message);
          dispatch(onFinishAddingProject());
        }
        if (resData.error) {
          toast.error(resData.error);
        }
        if (resData.message) {
          toast.success(resData.message);
          dispatch(onFinishAddingProject());
          // navigate(-1);
          setTimeout(() => {
            navigate(-1);
          }, 1500);
        }
      });
  };
};

export const onFinishAddingProject = () => {
  return { type: FINISH_ADDING_PROJECT };
};

const finishAddingProject = (state, action) => {
  return updateObject(state, { loadAdding: false });
};

export const onResetProjectForm = () => {
  return { type: RESET_PROJECT_FORM };
};

const resetingProjectForm = (state, action) => {
  return updateObject(state, { projectForm: projectIS.projectForm });
};
// =============================================================

export const onSelectingIdentifierId = (identifierId) => {
  return { type: SELECT_IDENTIFIER_TO_ADD_PROJECT, identifierId };
};

const selectIdentifierId = (state, action) => {
  return updateObject(state, { identifierId: action.identifierId });
};
// =============================================================

export const onStartFetchingSpecificProject = () => {
  return { type: START_FETCHING_SPECIFIC_PROJECT };
};

const startFetchingSpecificProject = (state, action) => {
  return updateObject(state, { loadSpecificPorject: true });
};

export const onFetchingSpecificProject = (projectId, token) => {
  return (dispatch) => {
    dispatch(onStartFetchingSpecificProject());
    fetch(`https://api.loc.store/api/projects/${projectId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((resData) => {
        dispatch(onFinishFetchingSpecificProject(resData.project));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const onFinishFetchingSpecificProject = (project) => {
  return { type: FINISH_FETCHING_SPECIFIC_PROJECT, project };
};

const finishFetchingSpecificProject = (state, action) => {
  return updateObject(state, {
    loadSpecificPorject: false,
    specificProject: action.project,
  });
};
// =============================================================

export const onStartFetchingProjects = () => {
  return { type: START_FETCHING_PROJECTS };
};

const startFetchingProjects = (state, action) => {
  return updateObject(state, { loadFetchingProjects: true });
};

export const onFetchingProjects = (identifierId, token) => {
  return (dispatch) => {
    dispatch(onStartFetchingProjects());
    fetch(
      `https://api.loc.store/api/globalIdentifiers/${identifierId}/projects`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((res) => res.json())
      .then((resData) => {
        dispatch(onFinishFetchingProjects(resData.projects));
      });
  };
};

export const onFinishFetchingProjects = (projects) => {
  return { type: FINISH_FETCHING_PROJECTS, projects };
};

const finishFetchingProjects = (state, action) => {
  return updateObject(state, {
    loadFetchingProjects: false,
    projects: action.projects,
  });
};
// =============================================================

export const onSelectingProject = (projectId) => {
  return { type: SELECT_EDIT_PROJECT, projectId };
};

const selectingProject = (state, action) => {
  if (state.projects) {
    const projects = [...state.projects];
    const selectedEditProject = projects.find(
      (project) => project.id.toString() === action.projectId.toString()
    );
    return updateObject(state, { selectedEditProject: selectedEditProject });
  } else {
    return "null";
  }
};

// =============================================================

export const onStartEditingProject = () => {
  return { type: START_EDITING_PROJECT };
};

const startEditingProject = (state, action) => {
  return updateObject(state, { loadEditProject: true });
};

export const onEditingProject = (
  e,
  projectId,
  token,
  name,
  latitude,
  longitude,
  radius,
  navigate
) => {
  e.preventDefault();
  return (dispatch) => {
    dispatch(onStartFetchingProjects());
    fetch(`https://api.loc.store/api/projects/${projectId}`, {
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
      }),
    })
      .then((res) => res.json())
      .then((resData) => {
        if (resData.message === "Project updated successfully..") {
          dispatch(onChangeRenderedItem("projects"));
          toast.success(resData.message);
          setTimeout(() => {
            navigate(-1);
          }, 1500);
        }
        if (resData.error) {
          toast.error(resData.error);
        }
      });
  };
};

export const onFinishEditingProject = () => {
  return { type: START_EDITING_PROJECT };
};

const finishEditingProject = (state, action) => {
  return updateObject(state, { loadEditProject: false });
};
// =============================================================
export const onStartDeletingProject = () => {
  return { type: START_DELETE_PROJECT };
};

const startDeletingProject = (state, action) => {
  return updateObject(state, { loadDelete: true });
};

export const onDeletingProject = (e, projectId, token) => {
  e.preventDefault();
  return (dispatch) => {
    dispatch(onStartDeletingProject());
    fetch(`https://api.loc.store/api/projects/${projectId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.status === 204) {
        dispatch(onChangeRenderedItem("projects"));
        dispatch(onFinishDeletingProject(projectId));
        toast.success("Deleting Success.");
      } else {
        return toast.error(res.statusText);
      }
    });
  };
};

export const onFinishDeletingProject = (projectId) => {
  return { type: FINISH_DELETE_PROJECT, projectId };
};

const finishDeleteProject = (state, action) => {
  const projects = [...state.projects];
  const updatedProjectsList = projects.filter(
    (project) => project.id !== action.projectId
  );
  return updateObject(state, { projects: updatedProjectsList });
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

export const onStartSearchingProject = () => {
  return { type: START_SEARCHING_PROJECT };
};

const startSearchingProject = (state, action) => {
  return updateObject(state, { loadSearch: true });
};

export const onSearchingProject = (text, token, id) => {
  return (dispatch) => {
    dispatch(onStartSearchingProject());
    fetch(
      `https://api.loc.store/api/globalIdentifiers/${id}/projects?name=${text}`,
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
        dispatch(onFinishSearchingProject(resData.projects));
        if (text === "") {
          dispatch(onChangeRenderedItem("projects"));
        } else {
          dispatch(onChangeRenderedItem("searchResult"));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const onFinishSearchingProject = (location) => {
  return { type: FINISH_SEARCHING_PROJECT, location };
};

const finishSearchingProject = (state, action) => {
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

export default function ProjectsReducer(state = projectIS, action) {
  switch (action.type) {
    case CHANGE_PROJECT_INPUTS:
      return changeProjectInputs(state, action);
    case START_ADDING_PROJECT:
      return startAddingProject(state, action);
    case FINISH_ADDING_PROJECT:
      return finishAddingProject(state, action);

    case SELECT_IDENTIFIER_TO_ADD_PROJECT:
      return selectIdentifierId(state, action);

    case START_FETCHING_PROJECTS:
      return startFetchingProjects(state, action);
    case FINISH_FETCHING_PROJECTS:
      return finishFetchingProjects(state, action);

    case START_EDITING_PROJECT:
      return startEditingProject(state, action);
    case FINISH_EDITING_PROJECT:
      return finishEditingProject(state, action);

    case SELECT_EDIT_PROJECT:
      return selectingProject(state, action);

    case START_DELETE_PROJECT:
      return startDeletingProject(state, action);
    case FINISH_DELETE_PROJECT:
      return finishDeleteProject(state, action);

    case SEARCH_INPUT_CHANGE_HANDLER:
      return searchInputChangeHandler(state, action);

    case START_SEARCHING_PROJECT:
      return startSearchingProject(state, action);
    case FINISH_SEARCHING_PROJECT:
      return finishSearchingProject(state, action);

    case CHANGE_RENDERED_ITEM:
      return changeReneredItem(state, action);

    case START_FETCHING_SPECIFIC_PROJECT:
      return startFetchingSpecificProject(state, action);
    case FINISH_FETCHING_SPECIFIC_PROJECT:
      return finishFetchingSpecificProject(state, action);

    case RESET_PROJECT_FORM:
      return resetingProjectForm(state, action);
    default:
      return state;
  }
}
