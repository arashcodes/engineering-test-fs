import React from 'react';

class DetailPage extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return(
      <div>
        <h2> Detail Page </h2>
        <img src={this.props.propertyImg} width="400" height="400" alt="Property Image"/>
      </div>
    )
  }
}

export default DetailPage;
