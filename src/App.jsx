import React from 'react';
import './App.css'
import Navigation from './components/Navigation/Navigation';
import SignIn from './containers/Signin/Signin';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Register from './containers/Register/Register';

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
class App extends React.Component {
  constructor() {
    super();
    this.state = initialState
  }

  loadUser = (data) => {
    this.setState({user : {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
    }})
  } 

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      topRow: clarifaiFace.top_row * height,
      leftCol: clarifaiFace.left_col * width,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input}, () => {
        fetch('http://localhost:3005/imageurl', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            input: this.state.input
          })
        })
        .then(response => response.json())
        .then(result => {
          if (result) {
            fetch('http://localhost:3005/image', {
              method: 'put',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                id: this.state.user.id
              })
            })
            .then(res => res.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, {entries: count}))
            })
          }
          this.displayFaceBox(this.calculateFaceLocation(result))
        })
        .catch(error => console.log('error', error));
    })
  }

  onRouteChange = (route) => {
    if (route === 'home') {
      this.setState({isSignedIn: true})
    } else if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'signin') {
      this.setState(initialState)
    } else if (route === 'register') {
      this.setState(initialState)
    }
    this.setState({route: route})
  }

  render() {
    const {imageUrl, input, box, route, isSignedIn} = this.state 
    return (
      <>
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        { route === 'home' ?
          <div>
          <ImageLinkForm 
              imageUrl={imageUrl} 
              onInputChange={this.onInputChange} 
              onButtonSubmit={this.onButtonSubmit} 
              box={box}
              name={this.state.user.name}
              entries={this.state.user.entries}
          />
          </div>
          :
          (
            route === 'signin' ?
            <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            :
            <Register loadUser={this.loadUser} onRounteChange={this.onRouteChange} />
          )
        }
      </>
    )
  }
}


export default App
