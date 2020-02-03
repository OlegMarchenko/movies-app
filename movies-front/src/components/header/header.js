import React from "react";
import {Link} from "react-router-dom";

import './header.css';

const Header = () => {
    return (
        <header className="header">
            <h1><Link to="/">Movies App</Link></h1>
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
                    <Link to="/">Sign Up</Link>
                </li>
                <li>
                    <Link to="/">Sign In</Link>
                </li>
            </ul>
        </header>
    )
};

export default Header;