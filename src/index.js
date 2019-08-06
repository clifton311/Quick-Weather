import React from 'react';
import ReactDOM from 'react-dom'
import SeasonDisplay from './SeasonDisplay'
import Spinner from './Spinner'

class App extends React.Component {
  
  state = {lat: null, errorMessage: ""}

  componentDidMount () {
    window.navigator.geolocation.getCurrentPosition(
      position  => {
        console.log(position.coords.latitude)
        this.setState({lat: position.coords.latitude })
      },
      (err) => this.setState({errorMessage: err.message})
    )
    //one time invokcation good place to do data loading
  }

  componentDidUpdate () {
    console.log("My component got updated right after rendered")
  }

  render() {

    if (this.state.errorMessage && !this.state.lat) {
      return <div>Error: {this.state.errorMessage}</div>
    }

    if (!this.state.errorMessage && this.state.lat) {
      return <SeasonDisplay lat={this.state.lat} />
    }

    return <Spinner  />
    
  }
}

ReactDOM.render(<App />,document.getElementById("app"))
