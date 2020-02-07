import React, {Component} from "react";
import {Link} from "react-router-dom";
import {getToken, clearToken} from "../../utils";

import './header.css';

class Navbar extends Component {

    handleSignout = () => {
        clearToken();
        window.location.reload();
    };

    render() {
        return getToken() !== null ? <AuthNav handleSignout={this.handleSignout}/> : <UnAuthNav/>
    }
}

const AuthNav = ({handleSignout}) => {
    return (
        <React.Fragment>
            <ul>
                <li>
                    <Link to="/movies/">Movies</Link>
                </li>
                <li>
                    <Link to="/serials/">TV Shows</Link>
                </li>
            </ul>
            <ul>
                <li>
                    <button
                        className="signout"
                        onClick={handleSignout}>
                        Sign Out
                    </button>
                </li>
            </ul>
        </React.Fragment>
    )
};

const UnAuthNav = () => {
    return (
        <ul>
            <li>
                <Link to="/signin">Sign In</Link>
            </li>
            <li>
                <Link to="/signup">Sign Up</Link>
            </li>
        </ul>
    )
};

const Header = () => {
    return (
        <header className="header">
            <h1><Link to="/">Movies App</Link></h1>
            <Navbar/>
        </header>
    )
};


export default Header;