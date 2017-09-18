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
    }
    this.handleLogin = this.handleLogin.bind(this);
  }

//help from Dan Beebe
  handleLogin(e, username, password) {
    e.preventDefault();
    axios.post('/auth/login', {
      username,
      password,
    }).then(res => {
      console.log(res.data);
      this.setState({
        user: res.data.user,
        loggedIn: true,
        redirect: true,
      })
    }).catch(err => console.log(err));
  }


  render() {
    return (
      <Router>
        <div className="App">
        <Nav loggedIn={this.state.loggedIn} user={this.state.user} />
        <Route exact path="/" render={() => <Home loggedIn={this.state.loggedIn} user={this.state.user}/>} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" render={() => <Login handleLogin={this.handleLogin} redirect={this.state.redirect}/>} />
        <Route exact path="/gallery"  component={Gallery} />
        <Route exact path="/gallery/:id" component={Artwork} />
        <Route exact path="/profile" render={() => <Profile loggedIn={this.state.loggedIn} user={this.state.user} />} />

        </div>
      </Router>
    );
  }
}

export default App;
