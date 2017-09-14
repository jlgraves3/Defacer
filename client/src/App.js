import React, { Component } from 'react';
import './App.css';
import Nav from './components/Nav';
import Artists from './components/Artists';

class App extends Component {
  constructor() {
    super();
    this.state = {
      painting: null,
    }
  }

  render() {
    return (
      <div className="App">
      <Nav />
      <Artists />
      </div>
    );
  }
}

export default App;
