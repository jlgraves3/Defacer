import React, { Component } from 'react';
import Artists from './Artists';
import Works from './Works';
import Canvas from './Canvas';
import axios from 'axios';

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
/*
  ComponentDidMount() {
     axios.post('https://vandelizer-auth.com/oauth/token', {
      headers: {
        'content-type': 'application/json'
      },
      data: {
        "client_id": "o0m6pxe0Aa39YE4SAZNqYdfia38QFtnW", 
        "client_secret": "zg4WXZNM3Z_IEgmpZEC1eks1N2iBHY_tzW8M28BZRS0zTqqCrNZNREHCQ9lU2_Kc"
      }
    }).then(res => {
      console.log('$4$$$$$$$$$$$$$$$$$$$$$')
      console.log(res.data);
    }).catch(err => console.log(err));
  } */

  //set artwork to be sketched over
  selectArtwork(artwork) {
    console.log(artwork)
    this.setState({
      currentArtwork: artwork,
      selected: true,
    })
  }

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
              discard={this.discard} /> 
        : <Artists 
              selectArtwork={this.selectArtwork} />}
      </div>
    );
  }
}

export default Home;
