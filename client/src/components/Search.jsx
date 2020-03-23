import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      longitude: '',
      latitude: '',
      radius: '',
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value,
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    // callback from App.jsx
    this.setState({
      longitude: '',
      latitude: '',
      radius: '',
    })
  }
  
  render() {
    return(
      <form onSubmit={this.handleSubmit} >
        <lable>
          Longitude:
          <input type="text" name="longitude" value={this.state.longitude} onChange={this.handleChange} />
        </lable>
        <br />
        <lable>
          Latitude:
          <input type="text" name="latitude" value={this.state.latitude} onChange={this.handleChange} />
        </lable>
        <br />
        <lable>
          Radius:
          <input type="text" name="radius" value={this.state.radius} onChange={this.handleChange} placeholder="10,000 meters" />
          <br />
          <input type="submit" value="Search Properties" />
        </lable>
      </form>
    )
  }
}

export default Search;
