import http from "./httpService";

const apiKey = process.env.REACT_APP_MOVIE_API_KEY;
const api = process.env.REACT_APP_API_TMDB;
const backApi = process.env.REACT_APP_API_URL;


export function getConfigMovie() {
  return http.get(`${api}configuration?api_key=${apiKey}`);
}

export function getRecommendedMovie(movie) {
  return http.get(`${api}movie/${movie}$/recommendations?api_key=${apiKey}`);
}

export function getPopularMovies() {
  return http.get(`${api}movie/popular?api_key=${apiKey}`);
}

export function getUpcomingMovies() {
  return http.get(`${api}movie/upcoming?api_key=${apiKey}`);
}

export function searchMovie(query) {
  return http.get(`${api}search/movie?api_key=${apiKey}&query=${query}`);
}

export function getMovie(movieId) {
  return http.get(`${api}movie/${movieId}?api_key=${apiKey}`)
}

export function getDiscover() {
  return http.get(`${api}discover/movie?api_key=${apiKey}`);
}

export function getDiscoverPaginated( option = String, page = Number, genre='' ) {
  return http.get(`${api}discover/movie?api_key=${apiKey}${option + page}&with_genre=${genre}`);
}

export function getMoviesByGender(genre) {
  return http.get(`${api}discover/movie?api_key=${apiKey}&with_genres=${genre}`)
}

export function getMoviesGenderPaginated(page, genre) {
  return http.get(`${api}discover/movie?api_key=${apiKey}&page=${page}&with_genres=${genre}`)
}

export function getMovieTrailer(movieId){
  return http.get(`${api}movie/${movieId}/videos?api_key=${apiKey}`);
}

export function addWatchlist(movie, token, user) {
  return http.post(backApi + '/watchlist', {
    id: movie.id,
    title: movie.title,
    description: movie.overview,
    duration: movie.runtime,
    poster_path: movie.poster_path,
    genre: movie.genres,
    user: user
  }, {
    headers: {
      "Content-Type": "application/json",
      'x-auth-token': token,
    }
  })
}

export function getWatchlist(movieId) {
  return http.get(`${backApi}/watchlist/${movieId}`);
}

export function removeWatchlist(movieId, token) {
  return http.delete(backApi + '/watchlist/' + movieId, {
    headers: {
      "Content-Type": "application/json",
      'x-auth-token': token,
  }
  });
}


