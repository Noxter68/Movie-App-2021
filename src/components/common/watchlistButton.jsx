import React from 'react';

import { Link } from "react-router-dom";

const WatchlistButton = ({onClick, label}) => {
    return ( <div className="watchlist-btn" >
    <Link to="/watchlist" onClick={onClick} >
      <i className="fa fa-ticket" aria-hidden="true"></i>
      <p>{label}</p>
    </Link>
  </div> );
}

export default WatchlistButton;
