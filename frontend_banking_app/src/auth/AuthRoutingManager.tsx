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

const AuthRoutingManager = () => {
    return (
      <BrowserRouter>
          <Header/>
          <div className={"px-52 pt-4"}>
              <Routes>
                  <Route path={"/"} element={<HomePage/>}/>
                  <Route path={"/login"} element={<LogInPage/>}/>
                  <Route path={"/open"} element={<TestPage/>}/>

                  // Private Routes
                  <Route path={"/user"} element={
                      <RequiresAuthRoute renderElement={<TestPage/>} allowedRoles={["ROLE_USER"]}/>}
                  />
                  <Route path={"/dashBoard"} element={
                      <RequiresAuthRoute renderElement={<DashBoardPage/>}/>
                  }/>
                  <Route path={"/admin"} element={
                      <RequiresAuthRoute renderElement={<AdminPage/>} allowedRoles={["ROLE_ADMIN"]}/>
                  }/>
                  <Route path={"/account/:accountId"} element={
                      <RequiresAuthRoute renderElement={<ViewAccountPage/>}/>
                  }/>

                  <Route path={"/*"} element={<NotFoundPage/>}/>
              </Routes>
          </div>
      </BrowserRouter>
);
};

export default AuthRoutingManager
