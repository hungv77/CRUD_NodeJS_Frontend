import "./App.scss";
import Login from "./components/Login/Login";
import Nav from "./components/Navigation/Nav";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Register from "./components/Register/Register";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Nav />
        <Switch>
          <Route path="/news">News</Route>
          <Route path="/about">About</Route>
          <Route path="/contact">Contact</Route>
          <Route path="/" exact>
            Home
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Router path="/register">
            <Register />
          </Router>
          <Route path="*">404 not found</Route>
        </Switch>
      </div>

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Router>
  );
}

export default App;
