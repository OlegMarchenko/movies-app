import React from "react";
import { Link } from "react-router-dom";
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
        <Link to="/signin">Sign In</Link>
      </li>
      <li>
        <Link to="/signup">Sign Up</Link>
      </li>
    </ul>
  );

  const AuthNav = () => (
    <React.Fragment>
      <ul>
        <li>
          <Link to="/movies/">Movies</Link>
        </li>
        <li>
          <Link to="/serials/">TV Shows</Link>
        </li>
        <li>
          <Link to="/netflix/">Netflix</Link>
        </li>
        <li>
          <Link to="/admin">Admin</Link>
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
      <h1><Link to="/">Movies App</Link></h1>
      {getToken() ? <AuthNav/> : <UnAuthNav/>}
    </header>
  )
};

export default Header;