import React, { Component } from "react";
import { getAllmovies } from "../services/watchlistservice";
import { getConfigMovie } from "../services/movieService";
import { toast } from 'react-toastify';

import Card from "./common/card";

class WatchList extends Component {
  state = {
    movies: [],
    poster_path: [],
  };

  async componentDidMount() {
    const { data: conf } = await getConfigMovie();
    const poster_path = conf.images;

    try {
      const { data: movies } = await getAllmovies();
      this.setState({ movies, poster_path });
    } catch (ex) {
      if (ex.response && ex.response.status === 401)
        toast.error(ex.response.data);
    }
  }

  render() {
    const { movies, poster_path } = this.state;
    return (
      <div>
        <h2>Watchlist Page</h2>
        <div className="container-card">
          {movies.map((movie) => (
            <Card
              movie={movie}
              key={movie.id}
              pathPoster={poster_path}
              pathLink="/movies/"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default WatchList;
