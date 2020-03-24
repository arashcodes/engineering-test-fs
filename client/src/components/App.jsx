import React from 'react';
import axios from 'axios';
import Search from './Search.jsx';
import Display from './Display.jsx';
import DetailPage from './DetailPage.jsx';

/**
 * This is the main component which is parent to Search, Display and DetailPage.
 */
class App extends React.Component {
  constructor(props) {
    super(props);

    /**
     * The searched properties are stored in both "allProperties" and "properties" in the state. "properties" feeds Display component. "allProperties" acts as the backup storage when user toggles between a list of saved properties and all the ones displayed under search results.
     */
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

  /**
   * Given the input coordinates, "find" will get the matched properties with a Post request from API and store in the App's state. 
   */
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
  
  /**
   * This function will be called in DisplayEntry component to store a specific property to be displayed in DetailPage.
   */
  getProperty(property, img) {
    this.setState({
      property: property,
      propertyImg: img,
    })
  }

  /**
   * This function will be called in DisplayEntry component to add clicked proprety to user's saved list.
   */
  saveProperty(property) {
    const savedProperties = this.state.savedProperties;
    savedProperties.push(property);
    this.setState({ savedProperties: savedProperties })
  }

  /**
   * Takes user back to main page with all searched results.
   */
  goBackPage() {
    const allProperties = this.state.allProperties;
    this.changeDisplayTitle('Search Results');

    this.setState({
      view: 'display',
      properties: allProperties,
    })
  }

  /**
   * Clears search results and refreshes the app for a new search.
   */
  clearSearch() {
    this.setState({
      view: 'search',
      properties: [],
      allProperties: [],
      displayTitle: '',
    })
  }

  /**
   * This function updates the state to feed Display component with a list of user's saved properties.
   */ 
  showMyList() {
    const savedProperties = this.state.savedProperties;
    this.setState({
      properties: savedProperties,
      displayTitle: 'Saved Properties'
    });
  }

  /**
   * This function is called from Search and DisplayEntry components to update the state's view. The view is used to pick with component to render at anytime.
   */
  changeView(option) {
    this.setState({
      view: option,
    });
  }

  /**
   * It changes the title from "Search Results" to "Saved Propreties".
   */
  changeDisplayTitle(title) {
    this.setState({ displayTitle: title });
  }

  /**
   * This function checks the state's view to render and return the approporiate component.
   */
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
