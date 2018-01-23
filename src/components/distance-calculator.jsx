import React, { Component } from 'react';
import queryString from 'query-string';
import { isEmpty } from 'lodash';
import NOTIFICATION_MESSAGES from '../notification-messages';
import { AddressInput } from './address-input';
import { Notification } from './notification';
import { Output } from './output';

export const baseURL = 'https://maps.googleapis.com/maps/api/geocode/json';
export const key = '';

export default class DistanceCalculator extends Component {
  constructor(props) {
    super(props);

    this.queryParams = this.parseQuery();
    const { start, end } = this.queryParams;

    this.state = {
      startingAddress: start || '',
      endingAddress: end || '',
      startingPoint: null,
      endingPoint: null
    };

    this.onCalculate = this.onCalculate.bind(this);
    this.clearNotification = this.clearNotification.bind(this);
  }

  componentDidMount() {
    const { start, end } = this.queryParams;

    if (start && end) {
      this.onCalculate();
    }
  }

  parseQuery() {
    const query = this.props.location.search;

    return queryString.parse(query);
  }

  getCoordinates(response, isStartingPoint) {
      const coords = response.results[0].geometry.location;
      const { lat, lng } = coords;
      const point = new google.maps.LatLng(lat, lng);

      if (isStartingPoint) {
        this.setState({
          startingPoint: point
        });
      } else {
        this.setState({
          endingPoint: point
        });
      }
  }

  getGeocode(address, isStartingPoint) {
    const url = `${baseURL}?address=${address}&key=${key}`;

    return fetch(url)
      .then(response => response.json())
      .then(response => this.getCoordinates(response, isStartingPoint));
  }

  getLocations() {
    const startingAddress = this.startRef && this.startRef.input.value;
    const endingAddress = this.endRef && this.endRef.input.value;

    const data = {
      startingAddress,
      endingAddress
    };
    this.setState(data);

    return data;
  }

  onCalculate() {
    const data = this.getLocations();
    const { startingAddress, endingAddress } = data;

    if (!startingAddress || !endingAddress) {
      this.setState({
        inputInvalid: true,
        message: NOTIFICATION_MESSAGES.INPUT_INVALID
      });

      return;
    }

    Promise.all([
      this.getGeocode(startingAddress, true),
      this.getGeocode(endingAddress, false)
    ]).then(() => this.calculateDistance())
      .catch(() => {
        this.setState({
          inputInvalid: true,
          message: NOTIFICATION_MESSAGES.RESPONSE_ERROR
        });
      });
  }

  calculateDistance() {
    const { startingPoint, endingPoint } = this.state;
    const distance = google.maps.geometry.spherical.computeDistanceBetween(startingPoint, endingPoint);
    const formattedDistance = (distance / 1000).toFixed(2);

    this.setState({ distance: formattedDistance });
  }

  clearNotification() {
    this.setState({
      inputInvalid: false,
      message: ''
    });
  }

  render() {
    const { startingAddress, endingAddress, distance, inputInvalid, message } = this.state;

    return (
      <div>
        {
          inputInvalid &&
            <Notification message={message} clearNotification={this.clearNotification} />
        }
        <AddressInput
          ref={ref => this.startRef = ref}
          value={startingAddress}
        />
        <AddressInput
          ref={ref => this.endRef = ref}
          value={endingAddress}
        />
        <button onClick={this.onCalculate}>
          Calculate the distance
        </button>
        {
          distance &&
            <Output
              distance={distance}
              startingAddress={startingAddress}
              endingAddress={endingAddress}
            />
        }
      </div>
    );
  }
}
