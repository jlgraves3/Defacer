import React, { Component } from 'react';
import './App.css';
import Nav from './components/Nav';
import Artists from './components/Artists';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentPainting: null,
      selected: false,
    }
    this.selectPainting = this.selectPainting.bind(this);
  }

  selectPainting(paiting) {
    this.setState({
      currentPainting: paiting,
      selected: true,
    })
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
