import React, { Component } from 'react';
import Artists from './Artists';
import Canvas from './Canvas';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentArtwork: null,
      selected: false,
    }
    this.selectArtwork = this.selectArtwork.bind(this);
    this.discard = this.discard.bind(this);
  }
 
  //set artwork to be sketched over
  selectArtwork(artwork) {
    this.setState({
      currentArtwork: artwork,
      selected: true,
    });
  }

  //discard current canvas, go back to main page
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
              user={this.props.user}
              displayMessage={this.props.displayMessage}
              handleCreateArtwork={this.props.handleCreateArtwork} /> 
        : <Artists 
              selectArtwork={this.selectArtwork}
              artists={this.props.artists}
              artistData={this.props.artistData}
              artistDataLoaded={this.props.artistDataLoaded}
              handleArtistData={this.props.handleArtistData} />}
      </div>
    );
  }
}

export default Home;
