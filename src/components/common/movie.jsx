import React from "react";
import { formattedDate } from '../../utils/date';
import Trailer from './trailer';

const Movie = ({ movie, movieKey, isWatchlist, posterPath }) => {
  return (
    <React.Fragment>
      <div className="img-movie">
        <img src={posterPath} alt="" />
      </div>
      <div className="content-movie">
        <h2 className="movie-title">
          {movie.title} - {movie.tagline}
        </h2>
        <h2 className="movie-title"></h2>
        <div className="movieInfo">
          <p>{movie.release_date && formattedDate(movie.release_date)}</p>
          <p>{movie.runtime + "min" ? movie.runtime + "min" : "Unknown"} </p>
          <p>
            {movie.vote_average} &nbsp;<i className="fa fa-star"></i>
          </p>
        </div>
        <div className="genres-movie">
          {movie.genres && movie.genres.map((genre) => <p key={genre.id}>{genre.name}</p>)}
        </div>
        <div className="movie-description">{movie.overview}</div>

        {movieKey && <Trailer movieKey={movieKey.key} />}

        {isWatchlist}
      </div>
    </React.Fragment>
  );
};

export default Movie;
