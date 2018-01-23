// @flow

import React from 'react';

type Props = {
  distance: number,
  startingAddress: string,
  endingAddress: string
};

export const Output = (props: Props) => {
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
