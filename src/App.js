import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./App.css";

import UsersPage from "./pages/users/UsersPage";
import LoginPage from "./pages/login/LoginPage";
import SignupPage from "./pages/signup/SignupPage";
import HomePage from "./pages/home/HomePage";
import GidPage from "./pages/gid/GidPage";
import UserLogsPage from "./pages/users/UsersLogsPage";
import GidLogsPage from "./pages/gid/GidLogsPage";
import GlobalIdenetifiersPage from "./pages/global idenetifiers/GlobalIdenetifiersPage";
import AddNewGlobalIdenetifiersPage from "./pages/global idenetifiers/AddNewGlobalIdenetifiersPage";
import EditGlobalIdenetifiersPage from "./pages/global idenetifiers/EditGlobalIdenetifiersPage";
import ProjectPage from "./pages/project/ProjectPage";
import AddNewProjectPage from "./pages/project/AddNewProjectPage";
import EditProjectPage from "./pages/project/EditProjectPage";
import AddNewLocationPage from "./pages/project/AddNewLocationPage";
import EditLocationPage from "./pages/project/EditLocationPage";
import ProjectsPage from "./pages/project/ProjectsPage";
import ViewLocsPage from "./pages/locs/ViewLocsPage";
import AssignedLocsPage from "./pages/locs/AssignedLocsPage";
import UnAssignedLocsPage from "./pages/locs/UnAssignedLocsPage";
import CreateDualLocInfoPage from "./pages/locs/CreateDualLocInfoPage";
import CreateSingleLocInfoPage from "./pages/locs/CreateSingleLocInfoPage";
import UpdateDualLocInfoPage from "./pages/locs/UpdateDualLocInfoPage";
import UpdateSingleLocInfoPage from "./pages/locs/UpdateSingleLocInfoPage";
import NotFound404Page from "./pages/NotFound404/NotFound404Page";
import ForgetPasswordPage from "./pages/forgetPassword/ForgetPasswordPage";
import MailForResetPasswordPage from "./pages/forgetPassword/MailForResetPasswordPage";

import { authCheckState } from "./store/Login/Login";

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.login.token);

  useEffect(() => {
    document.title = "Label on Cable";
  }, []);

  useEffect(() => {
    dispatch(authCheckState());
  }, [dispatch, token]);

  if (!token) {
    return (
      <Routes>
        <Route path="*" element={<HomePage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/resetpassword" element={<ForgetPasswordPage />} />
        <Route path="/forgetpassword" element={<MailForResetPasswordPage />} />
      </Routes>
    );
  }

  return (
    <div>
      <Routes>
        <Route path="*" element={<NotFound404Page />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/userslogs/:id" element={<UserLogsPage />} />
        <Route path="/gid" element={<GidPage />} />
        <Route path="/gidlogs/:id" element={<GidLogsPage />} />
        <Route
          path="/globalidenetifiers"
          element={<GlobalIdenetifiersPage />}
        />
        <Route
          path="/addglobalidenetifiers"
          element={<AddNewGlobalIdenetifiersPage />}
        />
        <Route
          path="/editglobalidenetifiers/:id"
          element={<EditGlobalIdenetifiersPage />}
        />
        <Route
          path="/globalidenetifiers/projects/:id"
          element={<ProjectsPage />}
        />
        <Route path="/locations/:id" element={<ProjectPage />} />
        <Route path="/addnewproject/:id" element={<AddNewProjectPage />} />
        <Route path="/editproject/:id" element={<EditProjectPage />} />
        <Route path="/addnewlocation/:id" element={<AddNewLocationPage />} />
        <Route path="/editlocation/:id" element={<EditLocationPage />} />

        <Route path="/viewlocs/:id" element={<ViewLocsPage />} />
        <Route path="/assignedlocs/:id" element={<AssignedLocsPage />} />
        <Route path="/unassignedlocs/:id" element={<UnAssignedLocsPage />} />
        <Route
          path="/CreateDualLocInfo/:id"
          element={<CreateDualLocInfoPage />}
        />
        <Route
          path="/CreateSingleLocInfo/:id"
          element={<CreateSingleLocInfoPage />}
        />
        <Route
          path="/UpdateDualLocInfo/:id"
          element={<UpdateDualLocInfoPage />}
        />
        <Route
          path="/UpdateSingleLocInfo/:id"
          element={<UpdateSingleLocInfoPage />}
        />
      </Routes>
    </div>
  );
}

export default App;
