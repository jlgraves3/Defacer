import React, { Component } from 'react';
import './App.css';
import Nav from './components/Nav';
import Artists from './components/Artists';
import Works from './components/Works';
import Canvas from './components/Canvas';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
        <Nav />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Home} />
        </div>
      </Router>
    );
  }
}

export default App;
