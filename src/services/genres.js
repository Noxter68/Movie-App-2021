import http from './httpService';


const apiKey = process.env.REACT_APP_MOVIE_API_KEY;
const api = process.env.REACT_APP_API_TMDB;


export function getGenres() {
    return http.get(`${api}genre/movie/list?api_key=${apiKey}`);
}

export default (
    getGenres
)