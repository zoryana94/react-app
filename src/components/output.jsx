import React from 'react';

export const Output = props => {
  const { distance, startingAddress, endingAddress } = props;

  return (
    <div>
      <p>
        The distance between <strong>{ startingAddress }</strong> and
        <strong> { endingAddress }</strong> is:
      </p>
      <h1>{ distance }km</h1>
    </div>
  );
}
