import React from 'react';
import Search from './Search.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        Search properties:
        <Search />
      </div>
    )
  }
}

export default App;
