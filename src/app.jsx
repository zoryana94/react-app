import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import DistanceCalculator from './components/distance-calculator';

export default class App extends Component {
  render() {

    return (
      <Router>
        <div>
          <Route exact path="/" component={DistanceCalculator}/>
          <Route name="search" path="?start=:start&end=:end" component={DistanceCalculator}/>
        </div>
      </Router>
    );
  }
}
