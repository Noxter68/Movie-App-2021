import React, { Component } from "react";
import { toast } from "react-toastify";
import {
  getMovie,
  getConfigMovie,
  getRecommendedMovie,
  addWatchlist,
  getWatchlist,
  removeWatchlist,
  getMovieTrailer,
} from "../services/movieService";
import { getCurrentUser } from "../services/authService";

import WatchlistButton from "./common/watchlistButton";
import Movie from "./common/movie";

class MoviePage extends Component {
  state = {
    movie: [],
    casting: [],
    recommendedMovies: [],
    recommendedPoster_Path: "",
    fullPath: "",
    poster_path: "",
    isLoading: false,
    pageSize: 6,
    currentRecommendedPage: 1,
    watchlist: "",
  };

  async componentDidMount() {
    // Get Movie
    try {
      const movieId = this.props.match.params.id;
      const { data: movie } = await getMovie(movieId);
      this.setState({ movie });
    } catch (error) {
      if (error.response && error.response.status === 404)
        toast.error("Un problème est survenu veuillez réessayer.");
    }

    // Get Watchlist
    try {
      const { movie } = this.state;
      const movieId = movie.id;
      const { data: watchlist } = await getWatchlist(movieId);
      this.setState({ watchlist });
    } catch (ex) {}

    // Get Poster
    try {
      const { data: path } = await getConfigMovie();
      const { data: movieInfo } = await getMovie(this.props.match.params.id);
      const moviePoster = movieInfo.poster_path;

      const poster_path = path.images;
      const finalPath =
        poster_path.secure_base_url + poster_path.logo_sizes[6] + moviePoster;
      this.setState({ poster_path: finalPath });
    } catch (error) {
      toast.error("Nous n'avons pas réussi à charger l'image...");
    }

    // Get casting & profile

    try {
      const { data: path } = await getConfigMovie();
      const url = path.images.secure_base_url;
      const size = path.images.profile_sizes[3];
      const fullPath = url + size;
      this.setState({ fullPath });
    } catch (error) {
      if (error.response && error.response.status === 404)
        toast.error("Un problème est survenu veuillez réessayer.");
    }


    // Get Trailer
    try {
      const movieId = this.props.match.params.id;
      const { data: trailer } = await getMovieTrailer(movieId);
      const result = trailer.results[0];
      this.setState({ movieTrailer: result });
    } catch {}

    // Recommended movies
    try {
      const { data: conf } = await getConfigMovie();
      const recommendedPoster_Path = conf.images;

      const movieId = this.props.match.params.id;
      const { data: movie } = await getRecommendedMovie(movieId);
      const recMovie = movie.results;

      this.setState({ recommendedMovies: recMovie, recommendedPoster_Path });
    } catch (error) {
      if (error.response && error.response.status === 404)
        toast.error("Recommended movies couldn't rendered.");
    }

    this.setState({
      isLoading: true,
    });
  }

  handlePageChangeRecommended = (page) => {
    this.setState({ currentRecommendedPage: page });
  };

  handleAddWatchlist = async (e) => {
    try {
      e.preventDefault();
      const token = localStorage.getItem("token");
      const { movie } = this.state;
      const currentUser = getCurrentUser();
      const userId = currentUser._id;
      const { data } = await addWatchlist(movie, token, userId);
      this.setState({ watchlist: data });
      toast.success("Movie successfully added to your watchlist.");
    } catch (ex) {
      if (ex.response && ex.response.status === 400)
        toast.error(ex.response.data);
    }
  };

  handleRemoveWatchlist = async (e) => {
    try {
      e.preventDefault();
      const token = localStorage.getItem("token");
      const { movie } = this.state;
      const movieId = movie.id;
      const { data: watchlist } = await removeWatchlist(movieId, token);
      this.setState({ watchlist: "" });
      toast.success("Movie successfully removed from your watchlist.");
    } catch (ex) {
      if (ex.response && ex.response.status === 400)
        toast.error(ex.response.data);
    }
  };

  render() {
    const movie = this.state.movie;

    const { poster_path, movieTrailer } = this.state;

    const checkWatchlist = this.state.watchlist;
    let isWatchlist;
    if (!checkWatchlist) {
      isWatchlist = (
        <WatchlistButton
          onClick={this.handleAddWatchlist}
          label="Add to watchlist"
        />
      );
    } else {
      isWatchlist = (
        <WatchlistButton
          onClick={this.handleRemoveWatchlist}
          label="Remove to watchlist"
        />
      );
    }

    return (
      <React.Fragment>
        <div className="movie-page-container">
          <Movie
            movie={movie}
            movieKey={movieTrailer}
            isWatchlist={isWatchlist}
            posterPath={poster_path}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default MoviePage;
