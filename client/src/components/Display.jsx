import React from 'react';
import DisplayEntry from './DisplayEntry.jsx';

/**
 * This component takes a list of properties to display and map it to its child component DisplayEntry.
 */

const Display = (props) => {
  return(
    <table>
        {props.properties.map((item, i) => {
          return <DisplayEntry key={i} property={item} getProperty={props.getProperty} changeView={props.changeView} saveProperty={props.saveProperty} />
        })}
    </table>
  )
}

export default Display;
