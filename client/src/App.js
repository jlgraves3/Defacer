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

  toggleFavorite(id) {
    if (this.state.loggedIn) {
      var userFavorites = this.state.userFavorites;
      var artworkFavorites = this.state.artworkFavorites;
      // user has favorited -> unfavorite item
      if (this.state.userFavorites[id]) {
        console.log('favorite', id);
        axios.delete(`/gallery/${id}/favorite`)
        .then(() => {
          userFavorites[id] = false;
          artworkFavorites[id] = artworkFavorites[id] - 1;
        })
        .catch(err => console.log(err));
      // user has not favorited -> favorite item
      } else {
        console.log('unfavorite', id);
        axios.post(`/gallery/${id}/favorite`)
        .then(() => {
          userFavorites[id] = true;
          artworkFavorites[id] = artworkFavorites[id] + 1;
        })
        .catch(err => console.log(err));
      }
      //update user and artwork favorites
      this.handleUserFavorites(userFavorites);
      this.handleArtworkFavorites(artworkFavorites);
    } else {
      this.setState({
        displayMessage: true,
        message: 'You must be logged in to favorite.',
      });
      setTimeout(() => {
        this.setState({
          displayMessage: false,
          message: '',
        });
      }, 4000);
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

  //delete artwork from gallery
  handleDelete(id) {
    axios.delete(`/gallery/${id}`)
    .then(() => {
      this.setState({
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
          user={this.state.user}/>} />
        <Route exact path="/register" render={() => <Register handleRegister={this.handleRegister} />} />
        <Route exact path="/login" render={() => <Login handleLogin={this.handleLogin}/>} />
        <Route exact path="/gallery"  render={() => <Gallery 
          loggedIn={this.state.loggedIn} 
          user={this.state.user} 
          handleUserFavorites={this.handleUserFavorites}
          handleArtworkFavorites={this.handleArtworkFavorites}
          toggleFavorite={this.toggleFavorite}
          userFavorites={this.state.userFavorites} 
          artworkFavorites={this.state.artworkFavorites} />} />
        <Route exact path="/gallery/:id" render={(props) => 
          <Artwork {...props} 
          loggedIn={this.state.loggedIn} 
          user={this.state.user}
          handleDelete={this.handleDelete} /> 
        } />
        <Route exact path="/profile" render={() => <Profile 
          loggedIn={this.state.loggedIn} 
          user={this.state.user} 
          handleUserFavorites={this.handleUserFavorites} />} />
        </div>
      </Router>
    );
  }
}

export default App;
