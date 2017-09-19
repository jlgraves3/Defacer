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
import Edit from './components/Edit';

import { Redirect } from 'react-router';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';


class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      loggedIn: false,
      redirect: false,
      path: null,
      artwork: null,
    }
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEditPage = this.handleEditPage.bind(this);
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

  handleRegister(e, username, password) {
    e.preventDefault();
    axios.post('/auth/register', {
      username,
      password,
    }).then(res => {
      this.setState({
        redirect: true,
        path: '/login',
      });
    }).catch(err => console.log(err));
  }

  handleRedirect() {
    if (this.state.redirect) {
      this.setState({
        redirect: false,
      });
      return <Redirect to={this.state.path} />
    }
  }

  handleDelete(id) {
    axios.delete(`/gallery/${id}`)
    .then(() => {
      this.setState({
        redirect: true,
        path: '/gallery',
      })
    }).catch(err => console.log(err));
  }

  handleEditPage(artwork,id) {
    this.setState({
      artwork: artwork,
      redirect: true,
      path: `/edit/${id}`
    });
  }

  render() {
    return (
      <Router>
        <div className="App">
        {this.handleRedirect()}
        <Nav loggedIn={this.state.loggedIn} user={this.state.user} handleLogout={this.handleLogout}/>
        <Route exact path="/" render={() => <Home 
          loggedIn={this.state.loggedIn} 
          user={this.state.user}/>} />
        <Route exact path="/register" render={() => <Register handleRegister={this.handleRegister} />} />
        <Route exact path="/login" render={() => <Login handleLogin={this.handleLogin}/>} />
        <Route exact path="/gallery"  component={Gallery} />
        <Route exact path="/gallery/:id" render={(props) => 
          <Artwork {...props} 
          loggedIn={this.state.loggedIn} 
          user={this.state.user}
          handleDelete={this.handleDelete} 
          handleEditPage={this.handleEditPage} /> 
        } />
        <Route exact path="/edit/:id" render={(props) => <Edit artwork={this.state.artwork}/>} />
        <Route exact path="/profile" render={() => <Profile loggedIn={this.state.loggedIn} user={this.state.user} />} />
        </div>
      </Router>
    );
  }
}

export default App;
