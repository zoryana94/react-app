import React, { Component } from 'react';
import { Input } from './components/address-input.jsx';

const baseURL = 'https://maps.googleapis.com/maps/api/geocode/json';
const key = '';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startingAddress: '',
      endingAdress: '',
      startingPoint: null,
      endingPoint: null
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onCalculate = this.onCalculate.bind(this);
  }

  onInputChange(address, isStartingPoint) {
    if (isStartingPoint) {
      this.setState({ startingAddress: address });
    } else {
      this.setState({ endingAddress: address });
    }
  }

  getCoordinates(response, isStartingPoint) {
      const coords = response.results[0].geometry.location;
      const { lat, lng } = coords;

      if (isStartingPoint) {
        this.setState({
          startingPoint: new google.maps.LatLng(lat, lng)
        });
      } else {
        this.setState({
          endingPoint: new google.maps.LatLng(lat, lng)
        });
      }
  }

  getGeocode(address, isStartingPoint) {
    const url = `${baseURL}?address=${address}&key=${key}`;

    return fetch(url)
      .then(response => response.json())
      .then(response => this.getCoordinates(response, isStartingPoint));
  }

  onCalculate() {
    const { startingAddress, endingAddress } = this.state;

    Promise.all([
      this.getGeocode(startingAddress, true),
      this.getGeocode(endingAddress, false)
    ]).then(() => this.calculateDistance())
      .catch(() => alert('Error'));
  }

  calculateDistance() {
    const { startingPoint, endingPoint } = this.state;
    const distance = google.maps.geometry.spherical.computeDistanceBetween(startingPoint, endingPoint);
    const formattedDistance = (distance / 1000).toFixed(2);

    this.setState({ distance: formattedDistance });
  }

  render() {
    const { startingAddress, endingAddress, distance } = this.state;

    return (
      <div>
        <Input isStartingPoint onChange={this.onInputChange}/>
        <Input onChange={this.onInputChange}/>
        <button onClick={this.onCalculate}>Calculate the distance</button>
        <h1>{ distance && `${distance}km` }</h1>
        <div>{ startingAddress }</div>
        <div>{ endingAddress }</div>
      </div>
    );
  }
}
