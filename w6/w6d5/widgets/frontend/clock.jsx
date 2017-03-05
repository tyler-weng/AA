import React from 'react';

export default class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date()
    };
  }

  componentDidMount() {
    this.interval = window.setInterval(() => {
      this.setState({time: new Date()});
    }, 1000);
  }

  componentWillUnmount() {
    this.interval = undefined;
  }

  render() {
    return (
      <div className="clock">
        <div className="clock-headers">
          <h1>Time: </h1>
          <h1>Date: </h1>
        </div>
        <div className="clock-data">
          <h1>{this.state.time.toLocaleTimeString()}</h1>
          <h1>{this.state.time.toDateString()}</h1>
        </div>
      </div>
    );
  }


}
