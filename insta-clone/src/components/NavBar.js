import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import logo from '../assets/images/Logo.png'

function NavBar() {
  return (
    <div>
      <Navbar bg="light">
        <b>PHOTOGRAM</b>
        <Nav className="mr-auto">
          <Link to="/">
            <Nav.Link href="#home">Home</Nav.Link>
          </Link>
          <NavDropdown title="Profile" id="basic-nav-dropdown">
            <Link to="/create-post">
              <NavDropdown.Item href="#action/3.1">
                Create Post
              </NavDropdown.Item>
            </Link>
            <Link to="/post">
              <NavDropdown.Item href="#action/3.2">View Posts</NavDropdown.Item>
            </Link>
            <NavDropdown.Divider />
            <Link to="/profile">
              <NavDropdown.Item href="#action/3.3">Account</NavDropdown.Item>
            </Link>
          </NavDropdown>
          {/* <Link to="/login">
            <Nav.Link href="#home">Sign in</Nav.Link>
          </Link>
          <Link to="/register">
            <Nav.Link href="#home">Sign up</Nav.Link>
          </Link> */}
        </Nav>
      </Navbar>
    </div>
  );
}

export default NavBar;
