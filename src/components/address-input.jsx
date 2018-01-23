import React, { Component } from 'react';

export class AddressInput extends Component {
  componentDidMount() {
    const autocomplete = new google.maps.places.Autocomplete(this.input);
  }

  render() {
    const { value } = this.props;

    return (
      <input
        ref={inputRef => this.input = inputRef}
        defaultValue={value}
        autoComplete
        required
      />
    );
  }
}
