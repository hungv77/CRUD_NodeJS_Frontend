import { useEffect } from "react";
import "./Register.scss";
import { useHistory } from "react-router-dom";
import axios from 'axios';

const Register = (props) => {
  let history = useHistory();
  const handleLogin = () => {
    history.push("/login");
  }

  useEffect(()=>{
    axios.get("https://reqres.in/api/users?page=2").then(data=>{
      console.log(">>> check data axios: ", data)
    })
  }, []);

  return (
    <div className="register-container">
      <div className="container">
        <div className="row px-3 px-sm-0">
          <div className="content-left col-12 d-none col-sm-7 d-sm-block">
            <div className="brand">Title</div>
            <div className="detail">
              Daring I'm your masterpiece a work of art. Hi my name is Fabulous
              your favorite star.
            </div>
          </div>

          <div className="content-right col-sm-5 col-12 d-flex flex-column gap-3 py-3">
            <div className="brand d-sm-none">Title</div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Email"
              />
            </div>
            <div className="form-group">
              <label>Phone number:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Phone number"
              />
            </div>
            <div className="form-group">
              <label>Username:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Username"
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
              />
            </div>
            <div className="form-group">
              <label>Re-Enter Password:</label>
              <input
                type="password"
                className="form-control"
                placeholder="Re-enter Password"
              />
            </div>
            <button className="btn btn-primary">Register</button>
            <hr />
            <div className="text-center">
              <button
                className="btn btn-success"
                onClick={() => handleLogin()}
              >
                Already've an account. Login Here.
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
