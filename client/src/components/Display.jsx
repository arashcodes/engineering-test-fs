import React from 'react';
import DisplayEntry from './DisplayEntry.jsx';

const Display = (props) => {
  return(
    <table>
        Search Results:
        {props.properties.map((item, i) => {
          return <DisplayEntry key={i} property={item} />
        })}
    </table>
  )
}

export default Display;
