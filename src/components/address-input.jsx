import React, { Component } from 'react';

export class Input extends Component {
  componentDidMount() {
    const autocomplete = new google.maps.places.Autocomplete(this.input);
  }

  render() {
    const { onChange, isStartingPoint } = this.props;

    return (
      <input
        ref={inputRef => this.input = inputRef}
        onChange={event => onChange(event.target.value, isStartingPoint)}
        onBlur={event => onChange(event.target.value, isStartingPoint)}
        autoComplete
        required
      />
    );
  }
}
