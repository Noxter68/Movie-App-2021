import http from "./httpService";

const apiKey = process.env.REACT_APP_MOVIE_API_KEY;
const api = process.env.REACT_APP_API_TMDB;
const backApi = process.env.REACT_APP_API_URL;

export function getPath(url, size, ext) {
    const fullPath = url + size + ext;
    return fullPath;
  }

  export function getDate(release) {
    if (release) {
      return release.substring(0,4);
    } else {
      return release;
    }
  }

  export function getConfigTvShow() {
    return http.get(`${api}configuration?api_key=${apiKey}`);
  }

  export function getPopularTvShow() {
    return http.get(`${api}tv/popular?api_key=${apiKey}`);
  }

  export function getTopRatedTvShow() {
    return http.get(`${api}tv/top_rated?api_key=${apiKey}`);
  }

  export function searchTvShow(query) {
    return http.get(`${api}search/tv?api_key=${apiKey}$query=${query}`);
  }

  export function getTvShow(tvShowId) {
    return http.get(`${api}tv/${tvShowId}?api_key=${apiKey}`);
  }
