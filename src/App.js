import React, {Component} from "react";
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Movies from "./components/movies";
import Register from "./components/register";
import NotFound from "./components/notFound";
import Login from "./components/login";
import Logout from "./components/logout";
import MoviePage from "./components/moviePage";
import SearchMovies from "./components/searchMovies";
import LibraryMovie from "./components/libraryMovie";
import TvShow from "./components/tvShow";
import TvShowPage from "./components/tvShowPage";
import SearchTvShow from "./components/searchTvShow";
import Navbar from "../src/components/common/navbar";
import Auth from "./services/authService";
import WatchList from "./components/watchList";
import ProtectedRoute from "./components/common/protectedRoute";
import LibraryGenre from "./components/libraryGenre";

import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = {}

  componentDidMount() {
   const user = Auth.getCurrentUser();
   const param = '';
   this.setState({ user, param });
  }
  render() { 
    const { user, param } = this.state;
    return ( <React.Fragment>
      <ToastContainer />
      
      <div className="App">
      <Navbar user={user} />
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/tv-shows" component={TvShow} />
            <Route path="/library/page/:id" render={(props) => <LibraryMovie {...props} param={param} />} />
            <Route path="/library/genre/:genre/page/:id" exact component={LibraryGenre} />
            <ProtectedRoute path="/watchlist/list/:user" component={WatchList} />
            <Route path="/tv/:id" component={TvShowPage} />
            <Route path="/movies/:id" component={MoviePage} />
            <Route path="/search/movies/:query" component={SearchMovies} />
            <Route path="/search/tv/:query" component={SearchTvShow} />
            <Route path="/login" component={Login} />
            <Route path="/movies" render={(props) => <Movies {...props} user={user} />} />
            <Route path="/logout" component={Logout} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="not-found" />
          </Switch>
      </div>
    </React.Fragment> );
  }
}
 
export default App;

