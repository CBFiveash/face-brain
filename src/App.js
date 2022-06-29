import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Signin from './components/Signin/Signin'
import Register from './components/Register/Register'
// import Particles from './components/Particles/Particles';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: '0b147ee3062b4b3b9b4b16f936b38eeb'
});


class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
    }
  }

  // componentDidMount() {
  //   fetch('http://localhost:3000/')
  //   .then(response => response.json())
  //   .then(console.log)
  // }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        this.state.input)
      .then(response => this.displayFaceBox (this.calculateFaceLocation(response)))
      .catch(err => console.log(err))
  }
  onRouteChange = (route) => {
    if(route === 'signout') {
      this.setState({isSignedIn: false})
    } else if(route === 'home') {
    this.setState({isSignedIn: true});
    }
    this.setState({route: route});
  }

  render() {
  return (
    <div className="App">
      {/* <Particles id="tsparticles" /> */}
      <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
      { this.state.route === 'home' 
        ? <div>
          <Logo />
          <Rank />
          <ImageLinkForm 
            onInputChange={this.onInputChange} 
            onSubmit={this.onSubmit}
          />
          <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
        </div>
        : (
          this.state.route === 'signin'
          ? <Signin onRouteChange={this.onRouteChange} /> 
          : <Register onRouteChange={this.onRouteChange} />
        )
      }
    </div>
  );
}
}
export default App;
