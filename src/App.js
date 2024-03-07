import './App.scss';
import Login from './components/Login/Login';
import Nav from './components/Navigation/Nav';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Register from './components/Register/Register';

function App() {
  return (
    <Router>
      <div className='app-container'>
        <Nav/>
        <Switch>
          <Route path="/news">
            News
          </Route>
          <Route path="/about">
            About
          </Route>
          <Route path="/contact">
            Contact
          </Route>
          <Route path="/" exact>
            Home
          </Route>
          <Route path="/login" exact>
            <Login/>
          </Route>
          <Router path="/register">
            <Register/>
          </Router>
          <Route path="*">
            404 not found
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
