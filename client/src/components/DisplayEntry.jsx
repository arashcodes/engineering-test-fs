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
  }

  componentDidMount() {
    this.getImage();
  }

  getImage() {
    const propertyId = this.props.property.propertyId;
    axios.get(`http://localhost:1235/display/f853874999424ad2a5b6f37af6b56610?overlay=yes&building=green&parcel=orange`, {responseType: 'arraybuffer'})
      .then(res => {
        this.setState({
          image: imageEncode(res.data),
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    return(
      <li>
        <span> Longitude: {this.props.property.coordinates[0]} </span>
        <span> Latitude: {this.props.property.coordinates[1]} </span>
        <img src={this.state.image}></img>
      </li>
    )
  }
}

export default DisplayEntry;
