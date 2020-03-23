import React from 'react';
import DisplayEntry from './DisplayEntry.jsx';

const Display = (props) => {
  return(
    <ul>
      {props.properties.map((item, i) => {
        return <DisplayEntry key={i} property={item} />
      })}
    </ul>
  )
}

export default Display;
