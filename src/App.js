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


// CREATED INITIAL STATE FOR A CLEAN SIGN IN
const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  // CLARIFAI BOUNDING BOX CONFIG
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

  // CLARIFAI BOX DISPLAY
  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  // IMAGE LINK FORM - INPUT
  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  // IMAGE LINK FORM - BTN EVENT
  onSubmit = () => {
    this.setState({imageUrl: this.state.input}); // set btn submit state as input (URL)
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        this.state.input) // clarifai model using input url
      .then(response => { // response conditions
        if(response) { // success
          fetch('http://localhost:3001/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: this.state.user.id
            })
          })
          .then(response  => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, { entries: count})) // set user entries count state
          })
          .catch(console.log)
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
        
      .catch(err => console.log(err)) // fail
  }

  // DETERMINE 'HOME' OR 'SIGNED OUT' STATE
  onRouteChange = (route) => {
    if(route === 'signout') {
      this.setState(initialState) // clear state for new signin
    } else if(route === 'home') {
      this.setState({isSignedIn: true});
    }
    this.setState({route: route});
  }
 // {/* */}
  render() {
  return (
    <div className="App">
      {/* <Particles id="tsparticles" /> */}
      <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>  {/* always show navigation bar with links dependent on signed in state*/}
      { this.state.route === 'home' // if route = home page :
        ? <div>
            <Logo /> {/* show logo, rank, image form, and face recognition boxes*/}
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <ImageLinkForm 
              onInputChange={this.onInputChange} 
              onSubmit={this.onSubmit}
            />
            <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
          </div>
        : ( // else if route = signin screen:
          this.state.route === 'signin'
          ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> // use signin functionality
          : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> // else use register functionality
        )
      }
    </div>
  );
}
}
export default App;
