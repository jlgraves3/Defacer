import React, { Component } from 'react';
import Artists from './Artists';
import Canvas from './Canvas';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      currentArtwork: null,
      selected: false,
    }
    this.selectArtwork = this.selectArtwork.bind(this);
    this.discard = this.discard.bind(this);
  }

  //set artwork to be sketched over
  selectArtwork(artwork) {
    console.log(artwork)
    this.setState({
      currentArtwork: artwork,
      selected: true,
    })
  }

  //discard current canvas
  discard() {
    this.setState({
      currentArtwork: null,
      selected: false,
    });
  }

  render() {
    return (
      <div>
        {this.state.selected ? 
          <Canvas 
              artwork={this.state.currentArtwork} 
              resetCanvas={this.resetCanvas}
              discard={this.discard} 
              loggedIn={this.props.loggedIn} 
              user={this.props.user}/> 
        : <Artists 
              selectArtwork={this.selectArtwork} />}
      </div>
    );
  }
}

export default Home;
