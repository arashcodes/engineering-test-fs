import React from 'react';
import axios from 'axios';

/**
 * This component displays the image, geographic location and statistics related to a specefic property.
 */

class DetailPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      building_area_sqm: [],
      parcel_area_sqm: '',
      zone_density: [],
      building_distances_m: [],
    }
    this.getStats = this.getStats.bind(this);
  }

  componentDidMount() {
    this.getStats();
  }

  // It makes a call to API with a property id and distance set to default 175000 meters. Then, results will be stored in the components state.
  getStats() {
    const propertyId = this.props.property.propertyId;
    axios.get(`http://localhost:1235/statistics/${propertyId}?distance=1755000`)
      .then(res => {
        this.setState({
          building_area_sqm: res.data.building_area_sqm,
          parcel_area_sqm: res.data.parcel_area_sqm,
          zone_density: res.data.zone_density,
          building_distances_m: res.data.building_distances_m,
        })
      })
  }

  // Renders the results in tabular format.
  render() {
    return(
      <div>
        <h2> Detail Page </h2>
        <img src={this.props.propertyImg} width="400" height="400" alt="Property Image"/>
        <li>
          Longitude: {this.props.property.coordinates[0]}
        </li>
        <li>
          Latitude: {this.props.property.coordinates[1]}
        </li>
        <li>
          building_area_sqm: {this.state.building_area_sqm[0]}
        </li>
        <li>
          parcel_area_sqm: {this.state.parcel_area_sqm}
        </li>
        <li>
          zone_density: {this.state.zone_density[0]}
        </li>
        <li>
          building_distances_m: {this.state.building_distances_m[0]}
        </li>
      </div>
    )
  }
}

export default DetailPage;
