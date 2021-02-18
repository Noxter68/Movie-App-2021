import React, { Component } from "react";
import { toast } from "react-toastify";
import { getGenres } from "../services/genres";
import {
  getMoviesByGender,
  getDiscoverPaginated,
  searchMovie,
} from "../services/movieService";
import { getConfigMovie } from "../services/movieService";
import { Link, generatePath } from "react-router-dom";

import Card from "./common/card";
import SearchBar from "./common/searchBar";
import ListFilter from './listFilter';

class Library extends Component {
  constructor() {
    super();
    this.state = {
      allGenres: [],
      movies: [],
      currentPage: 1,
      params: "",
      poster_path: [],
      isLoading: false,
      searchQuery: "",
    };
  }

  async componentDidMount() {
    try {
      // Get genres
      const { data } = await getGenres();
      const allGenres = data.genres;
  
      const params = this.props.match.params.id;

      // Get Movie Paginated
      let movies = await getDiscoverPaginated("&page=", params);
      movies = movies.data;

      const currentPage = parseInt(params);

      // Get Poster Image
      const { data: conf } = await getConfigMovie();
      const poster_path = conf.images;

      this.setState({
        allGenres,
        movies,
        poster_path,
        currentPage,
        params,
        isLoading: true,
      });
    } catch (error) {
      console.error(error.message);
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    const currentProps = this.props.match.params.id;
    const previousProps = prevProps.match.params.id;
    if (currentProps !== previousProps) {
      const { data: movies } = await getDiscoverPaginated(
        "&page=",
        currentProps
      );
      this.setState({ movies });
    }
  }

  handlePageNext = async () => {
    try {
      const currentPage = this.state.currentPage + 1;
      const { data: movies } = await getDiscoverPaginated(
        "&page=",
        currentPage
      );
      this.setState({ currentPage, movies });
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  handlePagePrev = async () => {
    try {
      const currentPage = this.state.currentPage - 1;
      const { data: movies } = await getDiscoverPaginated(
        "&page=",
        currentPage
      );
      this.setState({ movies, currentPage });
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  handleGenre = async (e, genre) => {
    try {
      const { data: movies } = await getMoviesByGender(genre);
      this.props.match.params.id = 1;
      this.setState({ movies, genre });
    } catch (error) {
      toast.error('Something went wrong.')
    }
  };

  getCurrentPageNext = () => {
    const page = this.state.currentPage + 1;
    return generatePath("/library/page/:id", { id: page });
  };

  getCurrentPagePrevious = () => {
    const page = this.state.currentPage - 1;
    return generatePath("/library/page/:id", { id: page });
  };

  handleSearch = (e) => {
    this.setState({ searchQuery: e.target.value });
  };

  handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { searchQuery: data } = this.state;
      // return window.location.search = data;
      const { data: result } = await searchMovie(data);
      return (window.location = "/search/movies/" + data);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      )
        toast.error("No movie insered.");
    }
  };

  render() {
    const { allGenres, movies, poster_path } = this.state;
    const nextPage = this.getCurrentPageNext();
    const previousPage = this.getCurrentPagePrevious();
    const user = this.props;

    return (
      <React.Fragment>
        <div>
          <SearchBar
            value={this.searchQuery}
            onChange={this.handleSearch}
            onSubmit={this.handleSubmit}
          />
        </div>
        <ListFilter logged={user} />
        <div className="library-container">
          <div className="sidebar">
            {allGenres &&
              allGenres.map((genre) => (
                <ul key={genre.id}>
                  <li>
                    <Link
                      onClick={(e) => this.handleGenre(e, genre.id)}
                      to={generatePath(`/library/genre/${genre.name}/page/1`)}
                    >
                      {genre.name}
                    </Link>
                  </li>
                </ul>
              ))}
          </div>

          <div className="library-content">
            <div className="container-card">
              {movies.results &&
                movies.results.map((movie) => (
                  <Card
                    key={movie.id}
                    movie={movie}
                    pathPoster={poster_path}
                    pathLink={"/movies/"}
                  />
                ))}
            </div>

            <Link
              to={nextPage}
              onClick={this.handlePageNext}
              className="btn-next"
            >
              Next
            </Link>
            <Link
              to={previousPage}
              onClick={this.handlePagePrev}
              className="btn-prev"
            >
              Previous
            </Link>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Library;
