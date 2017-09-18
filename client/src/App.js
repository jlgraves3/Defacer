import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

import Nav from './components/Nav';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Gallery from './components/Gallery';

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
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
        <Nav />
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/gallery" component={Gallery} />

        </div>
      </Router>
    );
  }
}

export default App;
