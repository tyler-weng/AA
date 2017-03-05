import React from 'react';

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    // your code here
    this.setNum1 = this.setNum1.bind(this);
    this.setNum2 = this.setNum2.bind(this);
    this.add = this.add.bind(this);
    this.minus = this.minus.bind(this);
    this.multiply = this.multiply.bind(this);
    this.divide = this.divide.bind(this);
    this.clear = this.clear.bind(this);
    this.state = {
      num1: "",
      num2: "",
      result: 0
    };
  }

  // your code here

  render() {
    return (
      <div>

        <input onChange={this.setNum1} value={this.state.num1}/>
        <br/>
        <input onChange={this.setNum2} value={this.state.num2}/>
        <br/>
        <button type="button" onClick={this.add}>+</button>
        <button type="button" onClick={this.minus}>-</button>
        <button type="button" onClick={this.multiply}>*</button>
        <button type="button" onClick={this.divide}>/</button>
        <button type="button" onClick={this.clear}>Clear</button>
        <br/>
        <h1>{this.state.result}</h1>
      </div>
    );
  }

  clear(event) {
    event.preventDefault();
    this.setState({ num1: "", num2: "", result: 0 });
  }

  add(event) {
    event.preventDefault();
    const newRes = parseInt(this.state.num1, 10) + parseInt(this.state.num2, 10);
    this.setState({result: newRes});
  }

  minus(event) {
    event.preventDefault();
    const newRes = parseInt(this.state.num1, 10) - parseInt(this.state.num2, 10);
    this.setState({result: newRes});
  }

  multiply(event) {
    event.preventDefault();
    const newRes = parseInt(this.state.num1, 10) * parseInt(this.state.num2, 10);
    this.setState({result: newRes});
  }

  divide(event) {
    event.preventDefault();
    const newRes = parseInt(this.state.num1, 10) / parseInt(this.state.num2, 10);
    this.setState({result: newRes});
  }


  setNum1(event) {
    event.preventDefault();
    const new1 = (event.target.value ? parseInt(event.target.value, 10) : "");
    this.setState({num1: new1});
  }

  setNum2(event) {
    event.preventDefault();
    const new2 = (event.target.value ? parseInt(event.target.value, 10) : "");
    this.setState({num2: new2});
  }

}

export default Calculator;
