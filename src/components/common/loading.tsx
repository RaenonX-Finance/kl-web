import React from 'react';

import Spinner from 'react-bootstrap/Spinner';


export const Loading = () => {
  return (
    <div className="h-100 d-flex align-items-center justify-content-center">
      <Spinner animation="grow"/>&nbsp;
      <span className="h3 m-0">Loading...</span>
    </div>
  );
};
