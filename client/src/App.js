import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

import Nav from './components/Nav';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Gallery from './components/Gallery';
import Artwork from './components/Artwork';
import Profile from './components/Profile';
import Message from './components/Message';

import { Redirect } from 'react-router';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';


class App extends Component {
  constructor() {
    super();
    this.state = {
      artworks: null,
      artworksLoaded: false,
      user: null,
      loggedIn: false,
      redirect: false,
      path: null,
      //userFavorites - {artworkID : true}
      userFavorites: {},
      //artworkFavorites - {artworkID : 12}
      artworkFavorites: {},
      displayMessage: false,
      message: '', 
    }
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUserFavorites = this.handleUserFavorites.bind(this);
    this.handleArtworkFavorites = this.handleArtworkFavorites.bind(this);
    this.toggleFavorite = this.toggleFavorite.bind(this);
    this.displayMessage = this.displayMessage.bind(this);
    this.handleCreateArtwork = this.handleCreateArtwork.bind(this);
    this.handleRedirectPath = this.handleRedirectPath.bind(this);
    this.handleUpdateArtwork = this.handleUpdateArtwork.bind(this);
  }

  componentDidMount() {
    //fetch gallery data
    axios.get('/gallery')
    .then(res => {
      const artworks = res.data.data;
      this.setState({
        artworks: artworks,
        artworksLoaded: true,
      });
      const artworkFavorites = {};
      //gets number of favorites for each artwork
      artworks.forEach(artwork => artworkFavorites[artwork.id] = artwork.count);
      this.handleArtworkFavorites(artworkFavorites);
    }).catch(err => console.log(err));
  }

  //update user favorites globally
  handleUserFavorites(favorites) {
    this.setState({
      userFavorites: favorites,
    });
  }

  //update count for artwork favorites globally
  handleArtworkFavorites(favorites) {
    this.setState({
      artworkFavorites: favorites,
    });
  }

  handleUpdateArtwork(artwork) {
    var artworks = this.state.artworks;
    var index;
    artworks.forEach((v,i) => {
      if (v.id === artwork.id) {
        index = i;
      }
    });
    artworks[index] = artwork;
    this.setState({
      artworks: artworks,
    })
  }

  //adds new artwork to global state;
  handleCreateArtwork(artwork) {
    var artworks = this.state.artworks;
    artworks.push(artwork);
    this.setState({
      artworks: artworks,
    });
  }

  displayMessage(message) {
     this.setState({
        displayMessage: true,
        message: message,
      });
      setTimeout(() => {
        this.setState({
          displayMessage: false,
          message: '',
        });
      }, 2000);
  }

  toggleFavorite(id, component) {
    if (this.state.loggedIn) {
      const options = {
        user_id: this.state.user.id,
      };
      var userFavorites = this.state.userFavorites;
      var artworkFavorites = this.state.artworkFavorites;
      // user has favorited -> unfavorite item
      if (this.state.userFavorites[id]) {
        axios.delete(`/gallery/${id}/favorite`,options)
        .then(() => {
           //update user and artwork favoritess
          userFavorites[id] = false;
          artworkFavorites[id] = parseInt(artworkFavorites[id]) - 1;
          this.handleUserFavorites(userFavorites);
          this.handleArtworkFavorites(artworkFavorites);
          component.forceUpdate();
        })
        .catch(err => console.log(err));
      // user has not favorited -> favorite item
      } else {
        axios.post(`/gallery/${id}/favorite`,options)
        .then(() => {
           //update user and artwork favorites
          userFavorites[id] = true;
          artworkFavorites[id] = parseInt(artworkFavorites[id]) + 1;
          this.handleUserFavorites(userFavorites);
          this.handleArtworkFavorites(artworkFavorites);
          component.forceUpdate();
        })
        .catch(err => console.log(err));
      }
    } else {
        this.displayMessage("You must be logged in to favorite.")
    }
  }

//help from Dan Beebe
  handleLogin(e, username, password) {
    e.preventDefault();
    axios.post('/auth/login', {
      username,
      password,
    }).then(res => {
      this.setState({
        user: res.data.user,
        loggedIn: true,
        redirect: true,
        path: '/profile',
      });
    }).catch(err => console.log(err));
  }

  //logs out current user, redirects to home
  handleLogout() {
    axios.get('/auth/logout')
    .then(res => {
      this.setState({
        user: null,
        loggedIn: false,
        redirect: true,
        path: '/',
      });
    }).catch(err => console.log(err));
  }

  //registers user
  handleRegister(e, username, password) {
    e.preventDefault();
    axios.post('/auth/register', {
      username,
      password,
    }).then(res => {
      //log in registered user
      this.handleLogin(e,username,password);
    }).catch(err => console.log(err));
  }

  //redirects to path if redirect is true, resets state to false. 
  handleRedirect() {
    if (this.state.redirect) {
      this.setState({
        redirect: false,
      });
      return <Redirect to={this.state.path} />
    }
  }

  //sets state to redirect to given path
  handleRedirectPath(path) {
    this.setState({
      path: path,
      redirect: true,
    });
    this.handleRedirect();
  }

  //delete artwork from gallery
  handleDelete(artwork) {
    axios.delete(`/gallery/${artwork.id}`)
    .then(() => {
      var artworks = this.state.artworks;
      //get index of artwork being deleted
      var index;
      artworks.forEach((v,i) => {
        if (v.id === artwork.id) {
          index = i;
        }
      });
      //remove deleted artwork from state
      var first = artworks.slice(0, index);
      var second = artworks.slice(index+1, artworks.length);
      var updatedArtworks= first.concat(second);
      console.log(artwork.id, first, second);
      this.setState({
        artworks: updatedArtworks,
        redirect: true,
        path: '/gallery',
      })
    }).catch(err => console.log(err));
  }

  render() {
    return (
      <Router>
        <div className="App">
        {this.state.displayMessage ? <Message message={this.state.message}/> : ''}
        {this.handleRedirect()}
        <Nav loggedIn={this.state.loggedIn} user={this.state.user} handleLogout={this.handleLogout}/>
        <Route exact path="/" render={() => <Home 
          loggedIn={this.state.loggedIn} 
          user={this.state.user}
          handleCreateArtwork={this.handleCreateArtwork}
          displayMessage={this.displayMessage}/>} />
        <Route exact path="/register" render={() => <Register handleRegister={this.handleRegister} />} />
        <Route exact path="/login" render={() => <Login handleLogin={this.handleLogin}/>} />
        <Route exact path="/gallery"  render={() => <Gallery 
          artworks={this.state.artworks}
          artworksLoaded={this.state.artworksLoaded}
          loggedIn={this.state.loggedIn} 
          user={this.state.user} 
          handleArtworkFavorites={this.handleArtworkFavorites}
          toggleFavorite={this.toggleFavorite}
          userFavorites={this.state.userFavorites} 
          artworkFavorites={this.state.artworkFavorites} />} />
        <Route exact path="/gallery/:id" render={(props) => 
          <Artwork {...props} 
          loggedIn={this.state.loggedIn} 
          user={this.state.user}
          handleDelete={this.handleDelete}
          handleRedirectPath={this.handleRedirectPath}
          handleCreateArtwork={this.handleCreateArtwork}
          handleUpdateArtwork={this.handleUpdateArtwork}
          toggleFavorite={this.toggleFavorite}
          userFavorites={this.state.userFavorites} 
          artworkFavorites={this.state.artworkFavorites} /> 
        } />
        <Route exact path="/profile" render={() => <Profile 
          loggedIn={this.state.loggedIn} 
          user={this.state.user} 
          handleUserFavorites={this.handleUserFavorites}
          toggleFavorite={this.toggleFavorite}
          userFavorites={this.state.userFavorites} 
          artworkFavorites={this.state.artworkFavorites}  />} />
        </div>
      </Router>
    );
  }
}

export default App;
