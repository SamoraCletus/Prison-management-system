import React, { useContext } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import AddInmates from "views/pages/AddInmates";
import AdminLayout from "layouts/Admin/Admin.js";
import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "semantic-ui-css/semantic.min.css";
import "assets/css/nucleo-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ThemeContextWrapper from "./components/ThemeWrapper/ThemeWrapper";
import BackgroundColorWrapper from "./components/BackgroundColorWrapper/BackgroundColorWrapper";
import User from "views/User";
import AddGuest from "views/pages/AddGuest";
// import AllInmates from "views/pages/AllInmates";
import AllGuest from "views/pages/AllGuest";
import AllExconvicts from "views/pages/AllExconvicts";
import { InmateReport, GuestReport, ExconvictReport } from "variables/Reports";
import Login from "views/Login";
import { Register } from "views/Login";
import Home from "views/Home";
import { LoginRoute } from "contexts/AuthRoute";
import { AuthContext } from "contexts/auth";
import Dashboard from "views/Dashboard";
import { AdminLogin } from "views/Login";
export default function App() {
  const { user } = useContext(AuthContext);

  return (
    <ThemeContextWrapper>
      <BackgroundColorWrapper>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              {!user ? <Redirect to="/login" /> : <Home />}
            </Route>
            <Route exact path="/admin">
              {!user ? (
                <Redirect to="/adminlogin" />
              ) : (
                <AdminLayout {...Dashboard} />
              )}
            </Route>

            <Route path="/admin/addInmate">
              <AdminLayout {...AddInmates} />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <LoginRoute exact path="/login" component={Login} />
            <LoginRoute exact path="/adminlogin" component={AdminLogin} />
            <LoginRoute exact path="/register" component={Register} />
            <Route path="/user">
              <User />
            </Route>
            <Route path="/admin/addGuest">
              <AdminLayout {...AddGuest} />
            </Route>
            <Route path="/admin/allGuest">
              <AdminLayout {...AllGuest} />
            </Route>
            <Route path="/admin/inmatesreport">
              <InmateReport />
            </Route>
            <Route path="/admin/exconvictsreport">
              <ExconvictReport />
            </Route>
            <Route path="/admin/guestsreport">
              <GuestReport />
            </Route>
            <Route path="/admin/allExconvict">
              <AdminLayout {...AllExconvicts} />
            </Route>
            <Route
              path="/admin"
              render={(props) => <AdminLayout {...props} />}
            />
            <Redirect from="/admin" to="/admin/dashboard" />
          </Switch>
        </BrowserRouter>
      </BackgroundColorWrapper>
    </ThemeContextWrapper>
  );
}
