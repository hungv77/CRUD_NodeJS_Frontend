import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./../components/Login/Login";
import Register from "./../components/Register/Register";
import Users from "./../components/ManageUsers/Users";
import PrivateRoutes from "./PrivateRoutes";
import Role from "../components/Role/Role";

const AppRoutes = (props) => {

  const Projects = () => {
    return (
      <>
        <span>Project</span>
      </>
    )
  }

  return (
    <>
      <Switch>
        <PrivateRoutes path="/users" component={Users} />
        <PrivateRoutes path="/projects" component={Projects} />
        <PrivateRoutes path="/roles" component={Role} />
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>

        <Route path="/" exact>
          Home
        </Route>
        <Router path="*" exact>
          404 not found
        </Router>
      </Switch>
    </>
  );
};

export default AppRoutes;
