import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "../pages/HomePage";
import TestPage from "../pages/TestPage";
import RequiresAuthRoute from "./RequiresAuthRoute";
import LogInPage from "../pages/LogInPage";
import DashBoardPage from "../pages/DashBoardPage";
import AdminPage from "../pages/AdminPage";
import ViewAccountPage from "../pages/ViewAccountPage";
import NotFoundPage from "../pages/NotFoundPage";
import Header from "../components/Header";
import LogOutPage from "../pages/LogOutPage";
import {Roles} from "../types/Enums";
import ProfileSettingsPage from "../pages/ProfileSettingsPage";
import RequiresNonAuthRoute from "./RequiresNonAuthRoute";
import CreateUserPage from "../pages/CreateUserPage";

const AuthRoutingManager = () => {
    return (
          <div>
          <Header/>
              <div className={"px-52 pt-4"}>
                  <Routes>
                      <Route path={"/"} element={<HomePage/>}/>
                      <Route path={"/test"} element={<TestPage />}/>

                      {/*ONLY OPEN ROUTES*/}
                      <Route path={"/login"} element={
                          <RequiresNonAuthRoute renderElement={<LogInPage />}/>
                      }/>

                      <Route path={"/signup"} element={
                          <RequiresNonAuthRoute renderElement={<CreateUserPage />}/>
                      }/>

                      {/*PRIVATE ROUTES*/}
                      <Route path={"/user"} element={
                          <RequiresAuthRoute renderElement={<TestPage/>} allowedRoles={[Roles.USER]}/>}
                      />
                      <Route path={"/profile-settings"} element={
                          <RequiresAuthRoute renderElement={<ProfileSettingsPage />}/>}
                      />
                      <Route path={"/dashBoard"} element={
                          <RequiresAuthRoute renderElement={<DashBoardPage/>}/>
                      }/>
                      <Route path={"/admin"} element={
                          <RequiresAuthRoute renderElement={<AdminPage/>} allowedRoles={[Roles.ADMIN]}/>
                      }/>
                      <Route path={"/account/:accountId"} element={
                          <RequiresAuthRoute renderElement={<ViewAccountPage/>}/>
                      }/>
                      <Route path={"/logout"} element={
                          <RequiresAuthRoute renderElement={<LogOutPage />}/>
                      }/>

                      <Route path={"/*"} element={<NotFoundPage/>}/>
                  </Routes>
              </div>
          </div>
);
};

export default AuthRoutingManager
