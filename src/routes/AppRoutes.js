import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./../components/Login/Login";
import Register from "./../components/Register/Register";
import Users from "./../components/ManageUsers/Users";
import PrivateRoutes from "./PrivateRoutes";
import Role from "../components/Role/Role";
import GroupRole from "../components/GroupRole/GroupRole";
// import Home from "../components/Home/Home";
// import About from "../components/About/About";

const AppRoutes = (props) => {

  const Projects = () => {
    return (
      <div className="container mt-3">
        <span>Project</span>
      </div>
    )
  }

  return (
    <>
      <Switch>
        <PrivateRoutes path="/users" component={Users} />
        <PrivateRoutes path="/projects" component={Projects} />
        <PrivateRoutes path="/roles" component={Role} />
        <PrivateRoutes path="/group-role" component={GroupRole} />
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>

        <Route path="/" exact>
          Home
        </Route>

        <Route path="/about" exact>
          About
        </Route>

        <Router path="*">
        <div className="container mt-3">
          <span>404 Not Found</span>
        </div>
        </Router>
      </Switch>
    </>
  );
};

export default AppRoutes;
