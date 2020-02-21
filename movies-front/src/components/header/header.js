import React from "react";
import { NavLink } from "react-router-dom";
import { getToken, clearToken } from "../../utils";
import { history } from "../../utils/history";

import './header.css';

const Header = () => {

  const handleSignOut = () => {
    clearToken();
    history.push('/')
  };

  const UnAuthNav = () => (
    <ul>
      <li>
        <NavLink to="/signin" activeClassName="current">Sign In</NavLink>
      </li>
      <li>
        <NavLink to="/signup" activeClassName="current">Sign Up</NavLink>
      </li>
    </ul>
  );

  const AuthNav = () => (
    <React.Fragment>
      <ul>
        <li>
          <NavLink to="/movies/" activeClassName="current">Movies</NavLink>
        </li>
        <li>
          <NavLink to="/serials/" activeClassName="current">TV Shows</NavLink>
        </li>
        <li>
          <NavLink to="/netflix/" activeClassName="current">Netflix</NavLink>
        </li>
        <li>
          <NavLink to="/admin" activeClassName="current">Admin</NavLink>
        </li>
      </ul>
      <ul>
        <li>
          <button
            className="signout"
            onClick={handleSignOut}>
            Sign Out
          </button>
        </li>
      </ul>
    </React.Fragment>
  );

  return (
    <header className="header">
      <h1><NavLink to="/" activeClassName="current">Movies App</NavLink></h1>
      {getToken() ? <AuthNav/> : <UnAuthNav/>}
    </header>
  )
};

export default Header;