import React from 'react';

const Error = ({ errorMessage }: { errorMessage: string }) => (
  <>
    <h2>Error:</h2>
    <div>{errorMessage}</div>
  </>
);

export default Error;
