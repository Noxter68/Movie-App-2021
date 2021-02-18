import React, { Component } from "react";
import { searchMovie, getConfigMovie } from "../services/movieService";
import { paginate } from "../utils/paginate";

import ListMovie from "./listMovie";

class SearchMovies extends Component {
  state = {
    resultSearch: [],
    poster_path: [],
    pageSize: 6,
    currentPage: 1,
    isLoading: false,
  };

  async componentDidMount() {
    const { query: data } = this.props.match.params;
    const result = await searchMovie(data);
    const finaleResult = result.data.results;
    
    const { data: conf } = await getConfigMovie();
    const poster_path = conf.images;

    this.setState({ resultSearch: finaleResult, poster_path, isLoading: true, });
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  render() {
    const { pageSize, currentPage, resultSearch, poster_path, isLoading } = this.state;
    const filteredSearch = resultSearch.filter((r) => r.poster_path != null);
    
    const { length: count } = filteredSearch;
    

    const allMovies = paginate(filteredSearch, currentPage, pageSize);

    return (
      <React.Fragment>

        <ListMovie
          itemsCount={count}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
          title="Movie found"
          movies={allMovies}
          path={poster_path}
          pathLink="/movies/"
          loader={isLoading}
        />
      </React.Fragment>
    );
  }
}

export default SearchMovies;
