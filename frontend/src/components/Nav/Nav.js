import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { Nav, Navbar, Dropdown } from "react-bootstrap";
import CustomDropdown from "../CustomComponents/CustomDropdown";
import { FaSignOutAlt, FaMoon, FaUser } from "react-icons/fa";
import NavStyle from "./NavStyle";

class CustomNavBar extends React.Component {
  constructor(props) {
    super(props);
    this.navStyle = new NavStyle();
    this.state = {
      loggedIn: localStorage.getItem("token") ? true : false,
      username: this.props.username,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.username !== prevState.username) {
      return {
        username: nextProps.username,
        loggedIn: nextProps.username ? true : false,
      };
    }

    return null;
  }

  renderNavLoggedOut = () => {
    return (
      <>
        <Nav>
          <NavLink className="nav-link" exact to="/login">
            Login
          </NavLink>
          <NavLink className="nav-link" exact to="/signup">
            Sign Up
          </NavLink>
        </Nav>
      </>
    );
  };

  handleLogout = () => {
    localStorage.removeItem("token");
    this.props.setUsername("", false);
  };

  renderNavLoggedIn = () => {
    return (
      <>
        <Nav>
          <CustomDropdown
            title={this.state.username}
            dropdownItems={
              <>
                <NavLink
                  style={this.navStyle.navDropdownLink}
                  exact
                  to="/profile"
                >
                  <Dropdown.Item
                    style={this.navStyle.navDropdownItem}
                    as="button"
                  >
                    <FaUser style={this.navStyle.navDropdownIcon}></FaUser>My
                    Profile
                  </Dropdown.Item>
                </NavLink>
                <Dropdown.Divider></Dropdown.Divider>
                <Dropdown.Item style={this.navStyle.navDropdownItem}>
                  <FaMoon style={this.navStyle.navDropdownIcon}></FaMoon>Dark
                  Theme
                </Dropdown.Item>
                <Dropdown.Divider></Dropdown.Divider>
                <Dropdown.Item
                  style={this.navStyle.navDropdownLogout}
                  onClick={this.handleLogout}
                >
                  <FaSignOutAlt
                    style={this.navStyle.navDropdownIcon}
                  ></FaSignOutAlt>
                  Logout
                </Dropdown.Item>
              </>
            }
            dropdownProps={{ alignRight: true }}
          />
        </Nav>
      </>
    );
  };

  renderCustomNavBar = () => {
    return (
      <Navbar collapseOnSelect expand="sm" bg="light" variant="light">
        <NavLink exact to="/">
          <Navbar.Brand>To-Do List</Navbar.Brand>
        </NavLink>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="mr-auto">
            <NavLink className="nav-link" exact to="/">
              Home
            </NavLink>
            <NavLink className="nav-link" exact to="/about">
              About
            </NavLink>
          </Nav>
          {this.state.loggedIn
            ? this.renderNavLoggedIn()
            : this.renderNavLoggedOut()}
        </Navbar.Collapse>
      </Navbar>
    );
  };

  render() {
    return this.renderCustomNavBar();
  }
}

export default CustomNavBar;

CustomNavBar.propTypes = {
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
};
