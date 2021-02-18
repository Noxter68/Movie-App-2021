import React from "react";
import { NavLink } from "react-router-dom";
import auth from "../services/authService";

const ListFilter = () => {
  const user = auth.getCurrentUser();
  let userId;
  if (user) {
    userId = user._id;
  } else {
    userId = "";
  }

  return (
    <div className="filter-links">
      <ul>
        <li>
          <NavLink to="/library/page/1" className="nav-link">
            All Movies
          </NavLink>
        </li>
        <li>
          <NavLink to="/movies" className="nav-link">
            Movies
          </NavLink>
        </li>
        <li>
          <NavLink to="/tv-shows" className="nav-link">
            Tv Shows
          </NavLink>
        </li>
        {userId && (
          <li>
            <NavLink to={`watchlist/list/${userId}`}>Watchlist</NavLink>
          </li>
        )}
      </ul>
    </div>
  );
};

export default ListFilter;
