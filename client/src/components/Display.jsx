import React from 'react';
import DisplayEntry from './DisplayEntry.jsx';

const Display = (props) => {
  return(
    <table>
        <h2> Search Results: </h2>
        {props.properties.map((item, i) => {
          return <DisplayEntry key={i} property={item} getProperty={props.getProperty} changeView={props.changeView} />
        })}
    </table>
  )
}

export default Display;
