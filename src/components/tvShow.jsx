import React, { Component } from "react";
import {
  getPopularTvShow,
  getConfigTvShow,
  searchTvShow,
  getTopRatedTvShow
} from "../services/tvShowService";
import { paginate } from "../utils/paginate";
import { toast } from "react-toastify";

import SearchBar from "./common/searchBar";
import ListMovie from "./listMovie";
import ListFilter from './listFilter';

class TvShow extends Component {
  state = {
    pageSize: 12,
    popTvShow: [],
    topRatedTvShow: [],
    currentPagePopular: 1,
    currentPageTopRated: 1,
    poster_path: [],
    searchQuery: "",
    isLoading: false,
  };

  async componentDidMount() {
    const { data: conf } = await getConfigTvShow();
    const poster_path = conf.images;

    const { data: popularTvShow } = await getPopularTvShow();
    const popTvShow = popularTvShow.results;

    const { data: TopRated } = await getTopRatedTvShow();
    const topRatedTvShow = TopRated.results;

    this.setState({ popTvShow, poster_path, topRatedTvShow, isLoading: true });
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
      console.log(data);
      // return window.location.search = data;
      const { data: result } = await searchTvShow(data);

      return (window.location = "/search/tv/" + data);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      )
        toast.error("No tv show insered.");
    }
  };
  render() {
    const { length: count } = this.state.popTvShow;
    const {
      pageSize,
      currentPagePopular,
      popTvShow,
      poster_path,
      isLoading,
    } = this.state;

    const popular = paginate(popTvShow, currentPagePopular, pageSize);
    const {user} = this.props;

    return (
      <div>
        <SearchBar
          value={this.searchQuery}
          onChange={this.handleSearch}
          onSubmit={this.handleSubmit}
        />
        <ListFilter logged={user} />
        <ListMovie
          itemsCount={count}
          pageSize={pageSize}
          currentPage={currentPagePopular}
          onPageChange={this.handlePageChangePopular}
          title="Popular Tv Shows"
          movies={popular}
          path={poster_path}
          pathLink="/tv/"
          loader={isLoading}
        />
      </div>
    );
  }
}

export default TvShow;
