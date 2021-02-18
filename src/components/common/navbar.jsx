import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ user }) => {
  return (
    <div className="navbar">
      <span>
        <Link to="/">David's Movie</Link>
      </span>
      <div className="navlinks">
        {!user && (
          <ul>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        )}
        {user && (
          <ul>
            <li>
              <Link to="/register">{user.name}</Link>
            </li>
            <li>
              <Link to="/logout">Logout</Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navbar;
