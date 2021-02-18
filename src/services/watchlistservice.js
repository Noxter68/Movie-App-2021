import http from "./httpService";
import { getCurrentUser} from "../services/authService";

const backApi = process.env.REACT_APP_API_URL;

export function getAllmovies() {
    const user = getCurrentUser();
    const id = user._id;
    const token = localStorage.getItem('token');
    return http.get(backApi + '/watchlist/list/' + id, {
        headers: {
            'x-auth-token': token
        }
    });
}