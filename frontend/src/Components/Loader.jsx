import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

function Loader() {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{
        width: '100px',
        height: '100px',
        margin: 'auto',
        display: 'block',
        backgroundColor:"white",
        borderTopColor: '#FF8080',  
        borderRightColor: 'yellow', 
        borderBottomColor: 'green',  
      }}
    >
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}

export default Loader;
