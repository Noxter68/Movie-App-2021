import React, { Component } from "react";
import { toast } from "react-toastify";
import {
  getPopularMovies,
  getConfigMovie,
  getUpcomingMovies,
  searchMovie,
} from "../services/movieService";
import { paginate } from "../utils/paginate";

import ListMovie from "./listMovie";
import SearchBar from "./common/searchBar";
import Loader from "./common/loader";
import ListFilter from './listFilter';

class Movies extends Component {
  constructor() {
    super();
    this.state = {
      popMovies: [],
      upComingMovies: [],
      poster_path: [],
      currentPagePopular: 1,
      currentPageTopRated: 1,
      pageSize: 12,
      searchQuery: "",
      isLoading: false,
    };
  }

  async componentDidMount() {
    try {
      const { data: conf } = await getConfigMovie();
      const poster_path = conf.images;

      const { data: popularMovies } = await getPopularMovies();
      const popMovies = popularMovies.results;

      const { data: upComing } = await getUpcomingMovies();
      const upComingMovies = upComing.results;

      this.setState({
        popMovies,
        upComingMovies,
        poster_path,
        isLoading: true,
      });
    } catch (error) {
      toast.error("Un problème est survenu veuillez réessayer.");
    }
  }

  async getMovieSearch(query) {
    const { data: result } = await searchMovie(query);
    return result;
  }

  handlePageChangePopular = (page) => {
    this.setState({ currentPagePopular: page });
  };

  handlePageChangeTopRated = (page) => {
    this.setState({ currentPageTopRated: page });
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
    const { length: count } = this.state.popMovies;
    const {
      pageSize,
      currentPageTopRated,
      upComingMovies,
      poster_path,
      isLoading,
    } = this.state;

    const AllupComing = paginate(upComingMovies, currentPageTopRated, pageSize);
    const {user} = this.props;
    return (
      <div>
        <SearchBar
          value={this.searchQuery}
          onChange={this.handleSearch}
          onSubmit={this.handleSubmit}
        />
        <ListFilter logged={user} />
        {upComingMovies ? (
          <ListMovie
            itemsCount={count}
            pageSize={pageSize}
            currentPage={currentPageTopRated}
            onPageChange={this.handlePageChangeTopRated}
            title="Upcoming movies"
            movies={AllupComing}
            path={poster_path}
            pathLink="/movies/"
            loader={isLoading}
          />
        ) : (
          <Loader />
        )}

      </div>
    );
  }
}

export default Movies;
