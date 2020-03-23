import React from 'react';
import axios from 'axios';
import Search from './Search.jsx';
import Display from './Display.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      properties: [],
    }

    this.find = this.find.bind(this);
  }

  find(coordinates) {
    const longitude = parseFloat(coordinates.longitude);
    const latitude = parseFloat(coordinates.latitude);
    let radius;
    if (coordinates.radius) {
      radius = parseFloat(coordinates.radius);
    } else {
      radius = 10000;
    }
    
    const data = {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [longitude, latitude],
      },
      'x-distance': radius,
    }
    axios.post('http://localhost:1235/find', JSON.stringify(data))
      .then(res => {
        this.setState({ properties: res.data });
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return(
      <div>
        <Search find={this.find} />
        <Display properties={this.state.properties} />
      </div>
    )
  }
}

export default App;
