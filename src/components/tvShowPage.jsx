import React, { Component } from "react";
import { toast } from "react-toastify";
import { getTvShow, getConfigTvShow, getDate } from "../services/tvShowService";

class TvShowPage extends Component {
  state = {
    tvShow: [],
    poster_path: "",
  };

  async componentDidMount() {
    await this.populateMovie();
    await this.getPosterPath();
  }

  async populateMovie() {
    try {
      const tvShowId = this.props.match.params.id;
      const { data: tvShow } = await getTvShow(tvShowId);
      this.setState({ tvShow });
    } catch (error) {
      if (error.response && error.response.status === 404)
        toast.error("Un problème est survenu veuillez réessayer.");
    }
  }

  async getPosterPath() {
    try {
      const { data: path } = await getConfigTvShow();
      const { data: movieInfo } = await getTvShow(this.props.match.params.id);
      const moviePoster = movieInfo.poster_path;

      const poster_path = path.images;
      const finalPath =
        poster_path.secure_base_url + poster_path.logo_sizes[6] + moviePoster;
      this.setState({ poster_path: finalPath });
    } catch (error) {
      toast.error("Couldn't load the image.");
    }
  }

  render() {
    const {
      name,
      first_air_date,
      number_of_seasons,
      vote_average,
      genres,
      overview,
    } = this.state.tvShow;

    const { poster_path } = this.state;

    const plural = number_of_seasons > 1 ? " Seasons" : " Season";

    return (
      <React.Fragment>
        <div className="movie-page-container">
          <div className="img-movie">
            <img src={poster_path} alt="" />
          </div>
          <div className="content-movie">
            <h2 className="movie-title">{name}</h2>
            <div className="movieInfo">
              <p>{first_air_date && getDate(first_air_date)}</p>
              <p>
                {number_of_seasons + plural
                  ? number_of_seasons + plural
                  : "Unknown"}{" "}
              </p>
              <p>
                {vote_average} &nbsp;<i className="fa fa-star"></i>
              </p>
            </div>
            <div className="genres-movie">
              {genres &&
                genres.map((genre) => <p key={genre.id}>{genre.name}</p>)}
            </div>
            <div className="movie-description">{overview}</div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default TvShowPage;
