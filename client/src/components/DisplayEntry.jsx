import React from 'react';
import axios from 'axios';

function imageEncode (arrayBuffer) {
  let u8 = new Uint8Array(arrayBuffer)
  let b64encoded = btoa([].reduce.call(new Uint8Array(arrayBuffer),function(p,c){return p+String.fromCharCode(c)},''))
  let mimetype="image/jpeg"
  return "data:"+mimetype+";base64,"+b64encoded
}

class DisplayEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      image: '',
    }
    this.getImage = this.getImage.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.getImage();
  }

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

  handleClick() {
    const propertyId = this.props.property.propertyId;
    const img = this.state.image;
    this.props.getPropertyId(propertyId, img);
    this.props.changeView('details')
  }

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
          <button onClick={this.handleClick} > Details </button>
        </tr>
          <img src={this.state.image} width="300" height="300" alt="Property Image" />
      </div>
    )
  }
}

export default DisplayEntry;
