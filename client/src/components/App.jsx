import React from 'react';
import axios from 'axios';
import Search from './Search.jsx';
import Display from './Display.jsx';
import DetailPage from './DetailPage.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      properties: [],
      view: 'search',
    }

    this.find = this.find.bind(this);
    this.changeView = this.changeView.bind(this);
    this.renderView = this.renderView.bind(this);
    this.goHomePage = this.goHomePage.bind(this);
    this.getPropertyId = this.getPropertyId.bind(this);
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
  
  getPropertyId(propertyId) {
    console.log('From App.jsx: ', propertyId);
  }

  goHomePage() {
    this.setState({
      view: 'search',
    })
  }

  changeView(option) {
    this.setState({
      view: option,
    });
  }

  renderView() {
    const { view } = this.state;
    if (view === 'detail') {
      return <DetailPage />;
    } else if ( view === 'display' ) {
      return <Display properties={this.state.properties} getPropertyId={this.getPropertyId} />
    } else if (view === 'search') {
      return <Search find={this.find} changeView={this.changeView} />
    }
  }

  render() {
    return(
      <div>
        <button onClick={this.goHomePage} >Home</button>
        {this.renderView()}
      </div>
    )
  }
}

export default App;
