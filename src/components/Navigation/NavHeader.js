/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState, useContext } from "react";
import "./Nav.scss";
import { Link, NavLink, useLocation, useHistory } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../../logo.svg";
import { logoutUser } from "../../services/userService";
import { toast } from "react-toastify";

const NavHeader = (props) => {
  const { user, logoutContext } = useContext(UserContext);
  const location = useLocation();
  const history = useHistory();

  const handleLogout = async() => {
    let data = await logoutUser(); //clear cookies
    localStorage.removeItem('jwt'); //clear local storage
    logoutContext(); //clear user in context
    if(data && data.EC === 0){
      toast.success('Logout succeeds !');
      history.push('/login')
    } else {
      toast.error(data.EM);
    }
  }

  if ((user && user.isAuthenticated === true) || location.pathname === "/" || location.pathname === "/about") {
    return (
      <>
        <div className="nav-header">
          <Navbar expand="lg" className="bg-header">
            <Container>
              <Navbar.Brand href="#home" className="nav-brand">
                <img
                  src={logo}
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                />
                React-NodeJS
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <NavLink to="/" className="nav-link" exact>
                    Home
                  </NavLink>
                  <NavLink to="/users" className="nav-link">
                    Users
                  </NavLink>
                  <NavLink to="/roles" className="nav-link">
                    Roles
                  </NavLink>
                  <NavLink to="/group-role" className="nav-link">
                    Group-Role
                  </NavLink>
                  <NavLink to="/projects" className="nav-link">
                    Projects
                  </NavLink>
                  <NavLink to="/about" className="nav-link">
                    About
                  </NavLink>
                </Nav>

                <Nav>
                  {user && user.isAuthenticated === true ? (
                    <>
                      <Nav.Item className="nav-link">
                        Welcome {user.account.username} !
                      </Nav.Item>

                      <NavDropdown title="Settings" id="basic-nav-dropdown">
                        <NavDropdown.Item>
                          Change Password
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                          <span onClick={()=> handleLogout()}>
                            Logout
                          </span>  
                        </NavDropdown.Item>
                      </NavDropdown>
                    </>
                  ) : (
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
      </>
    );
  } else {
    return <></>;
  }
};

export default NavHeader;
