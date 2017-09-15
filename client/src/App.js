import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

import Nav from './components/Nav';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';


import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null
    }
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  handleLogin(data) {
    alert(data);
  }

  handleRegister(data) {
    alert(data)
  }

  handleLogOut() {
    axios.get('/auth/logout')
    .then(res => {
      alert(res.data);
    })
  }

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
