import React from 'react';
import axios from 'axios';

/**
 * This function takes in a raw jpeg as argument and encodes the image.
 */
function imageEncode (arrayBuffer) {
  let u8 = new Uint8Array(arrayBuffer)
  let b64encoded = btoa([].reduce.call(new Uint8Array(arrayBuffer),function(p,c){return p+String.fromCharCode(c)},''))
  let mimetype="image/jpeg"
  return "data:"+mimetype+";base64,"+b64encoded
}

/**
 * This component gets properties from Display as its parent component. It also gets the property's image from API. 
 */

class DisplayEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      image: '',
    }
    this.getImage = this.getImage.bind(this);
    this.handleDetailsClick = this.handleDetailsClick.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
  }

  componentDidMount() {
    this.getImage();
  }

  /**
   * It gets and encodes the property image from API and store it in the component's state.
   */
  getImage() {
    const propertyId = this.props.property.propertyId;
    axios.get(`http://localhost:1235/display/${propertyId}?overlay=yes&building=green&parcel=orange`, {responseType: 'arraybuffer'})
      .then(res => {
        this.setState({
          image: imageEncode(res.data),
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  /**
   * It passes the clicked Property to App component to be rendered in DetailPage component.
   */
  handleDetailsClick() {
    const property = this.props.property;
    const img = this.state.image;
    this.props.getProperty(property, img);
    this.props.changeView('details')
  }

  /**
   * Adds the clicked property to the list of user's saved property with a call back function from App's component.
   */
  handleSaveClick() {
    const property = this.props.property;
    this.props.saveProperty(property);
  }

  /**
   * Renders the results in tabular format.
   */
  render() {
    const styleObj = {
      border: '2px solid',
    }
    return(
      <div style={styleObj} >
        <tr >
          <td> Longitude: {this.props.property.coordinates[0]} </td>
          <td> - </td>
          <td> Latitude: {this.props.property.coordinates[1]} </td>
          <button onClick={this.handleDetailsClick} > Details </button>
          <button onClick={this.handleSaveClick} >Add to My List</button>
        </tr>
          <img src={this.state.image} width="400" height="300" alt="Property Image" />
      </div>
    )
  }
}

export default DisplayEntry;
