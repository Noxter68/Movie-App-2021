import React from "react";
import {
  Link,
} from "react-router-dom";
import { getDate } from "../../utils/date";
import { getPath } from "../../utils/path";

const Card = ({ movie, pathPoster, pathLink, changed }) => {
  return (
    <div className="card animation-load">
      <Link to={`${pathLink}${movie.id}`}>
        <div hidden>{changed}</div>
        <img
          src={getPath(
            pathPoster.base_url,
            pathPoster.poster_sizes[5],
            movie.poster_path
          )}
          alt="movie poster"
        />

        <div className="title-movie">
          <h2>{movie.title ? movie.title : movie.name}</h2>
          <span>
            {movie.vote_average} &nbsp;
            <i className="fa fa-star" aria-hidden="true"></i>
          </span>
        </div>
        <div>
          {movie.release_date && getDate(movie.release_date)
            ? getDate(movie.release_date)
            : getDate(movie.first_air_date)}
        </div>
        {/* <div>{movie.genre}</div> */}
      </Link>
    </div>
  );
};

export default Card;
