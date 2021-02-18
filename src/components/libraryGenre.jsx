import React, { Component } from "react";
import { toast } from "react-toastify";
import { getGenres } from "../services/genres";
import {
  getMoviesGenderPaginated,
} from "../services/movieService";
import { getConfigMovie } from "../services/movieService";
import { Link, generatePath } from "react-router-dom";
import Card from "./common/card";
import Loader from "./common/loader";
import ListFilter from './listFilter';

class LibraryGenre extends Component {
  constructor() {
    super();
    this.state = {
      allGenres: [],
      movies: [],
      genre: {},
      isLoading: false,
    };
  }

  async componentDidMount() {
    // Get genres
    const { data } = await getGenres();
    const allGenres = data.genres;

    const urlGenre = this.props.match.params.genre;
    const findGenre = allGenres.filter((genre) => genre.name === urlGenre);
    const genre = findGenre[0];

    const params = this.props.match.params.id;
    const currentPage = parseInt(params);

    // Get Movies
    let { data: movies } = await getMoviesGenderPaginated(params, genre.id);
    const { data: conf } = await getConfigMovie();
    const poster_path = conf.images;

    this.setState({
      allGenres,
      movies,
      genre,
      poster_path,
      currentPage,
      isLoading: true,
    });
  }

  async componentDidUpdate(prevProps, prevState) {
    const currentProps = this.props.match.params.id;
    const previousProps = prevProps.match.params.id;
    const genre = this.state.genre;
    if (genre) {
      if (currentProps !== previousProps) {
        const { data: movies } = await getMoviesGenderPaginated(
          currentProps,
          genre.id
        );
        this.setState({ movies });
      }
    }
  }

  handleGenre = async (e, genre) => {
    const currentPage = 1;
    const { data: movies } = await getMoviesGenderPaginated(
      currentPage,
      genre.id
    );
    this.setState({ movies, currentPage, genre });
  };

  handlePageNext = async () => {
    try {
      const currentPage = this.state.currentPage + 1;
      const genre = this.state.genre.id;
      const { data: movies } = await getMoviesGenderPaginated(
        currentPage,
        genre
      );
      this.setState({ currentPage, movies });
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  handlePagePrevious = async () => {
    try {
      const currentPage = this.state.currentPage - 1;
      const genre = this.state.genre.id;
      const { data: movies } = await getMoviesGenderPaginated(
        currentPage,
        genre
      );
      this.setState({ currentPage, movies });
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  render() {
    const {
      genre,
      allGenres,
      movies,
      poster_path,
      isLoading,
      currentPage,
    } = this.state;
    let genreNextBtn;
    let genrePreviousBtn;
    if (genre != null) {
      genreNextBtn = (
        <Link
          to={`/library/genre/${genre.name}/page/${currentPage + 1}`}
          onClick={this.handlePageNext}
          className="btn-next"
        >
          Next
        </Link>
      );
    } else {
      <Loader />;
    }
    if (genre != null) {
      genrePreviousBtn = (
        <Link
          to={`/library/genre/${genre.name}/page/${currentPage - 1}`}
          onClick={this.handlePagePrevious}
          className="btn-prev"
        >
          Next
        </Link>
      );
    } else {
      <Loader />;
    }

    const user = this.props;

    return (
      <React.Fragment>
        <ListFilter logged={user} />
        <div className="library-container">
          <div className="sidebar">
            {allGenres &&
              allGenres.map((genre) => (
                <ul key={genre.id}>
                  <li>
                    <Link
                      onClick={(e) => this.handleGenre(e, genre)}
                      to={generatePath(`/library/genre/${genre.name}/page/1`)}
                    >
                      {genre.name}
                    </Link>
                  </li>
                </ul>
              ))}
          </div>

          {isLoading ? (
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
              {genreNextBtn}
              {genrePreviousBtn}
            </div>
          ) : (
            <Loader />
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default LibraryGenre;
