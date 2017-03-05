import React from 'react';

export default class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: ''
    };
  }

  render() {
    return (
      <h1>{this.state.weather}</h1>
    );
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(this.retrievePosition.bind(this));
  }

  retrievePosition(pos) {
    let lat = pos.coords.latitude;
    let lon = pos.coords.longitude;
    let request = new XMLHttpRequest();
    request.open('GET', `http://api.openweathermap.org/data/2.5/weather?APPID=c264b43c3e0514c6206bd202f49589c7&lat=${lat}&lon=${lon}`, true);

    request.onload = () => {
      if (Math.round(Math.floor(request.status / 100)) === 2) {
        this.setState({weather: request.responseText});
        debugger;
      } else {
        throw new Error('Successfully hit target server, but still errored');
      }
    };
    request.onerror = () => {
      throw new Error('Connection error');
    };

    request.send();
  }
};
