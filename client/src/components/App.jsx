import React from 'react';
import axios from 'axios';
import Search from './Search.jsx';
import Display from './Display.jsx';
import DetailPage from './DetailPage.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allProperties: [],
      properties: [],
      view: 'search',
      propertyImg: '',
      property: {},
      savedProperties: [],
      displayTitle: '',
    }

    this.find = this.find.bind(this);
    this.changeView = this.changeView.bind(this);
    this.renderView = this.renderView.bind(this);
    this.goBackPage = this.goBackPage.bind(this);
    this.getProperty = this.getProperty.bind(this);
    this.saveProperty = this.saveProperty.bind(this);
    this.showMyList = this.showMyList.bind(this);
    this.changeDisplayTitle = this.changeDisplayTitle.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
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
        this.setState({
          properties: res.data,
          allProperties: res.data,
        });
      })
      .catch(err => {
        console.log(err)
      })
  }
  
  getProperty(property, img) {
    this.setState({
      property: property,
      propertyImg: img,
    })
  }

  saveProperty(property) {
    const savedProperties = this.state.savedProperties;
    savedProperties.push(property);
    this.setState({ savedProperties: savedProperties })
  }

  goBackPage() {
    const allProperties = this.state.allProperties;
    this.changeDisplayTitle('Search Results');

    this.setState({
      view: 'display',
      properties: allProperties,
    })
  }

  clearSearch() {
    this.setState({
      view: 'search',
      properties: [],
      allProperties: [],
      displayTitle: '',
    })
  }

  showMyList() {
    const savedProperties = this.state.savedProperties;
    this.setState({
      properties: savedProperties,
      displayTitle: 'Saved Properties'
    });
  }

  changeView(option) {
    this.setState({
      view: option,
    });
  }

  changeDisplayTitle(title) {
    this.setState({ displayTitle: title });
  }

  renderView() {
    const view = this.state.view;
    if (view === 'details') {
      return <DetailPage property={this.state.property}  propertyImg={this.state.propertyImg} />;
    } else if (view === 'display') {
      return <Display properties={this.state.properties} getProperty={this.getProperty} changeView={this.changeView} saveProperty={this.saveProperty} />
    } else if (view === 'search') {
      return <Search find={this.find} changeView={this.changeView} changeDisplayTitle={this.changeDisplayTitle} displayTitle={this.state.displayTitle}/>
    }
  }

  render() {
    return(
      <div>
        <button onClick={this.clearSearch} >Clear Search</button>
        <button onClick={this.goBackPage} >Back to Results</button>
        <button onClick={this.showMyList} >Show My List</button>
        {this.state.displayTitle? <h2> {this.state.displayTitle} </h2> : null}
        {this.renderView()}
      </div>
    )
  }
}

export default App;
