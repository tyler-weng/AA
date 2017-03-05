import React from 'react';
import ReactDOM from 'react-dom';

class AutoComplete extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      input: ""
    };
    this.updateInput = this.updateInput.bind(this);
    // this.stuff = this.stuff.bind(this);
    // this.otherstuff = this.otherstuff.bind(this);
  }

  updateInput(event) {
    event.preventDefault();
    this.setState({input: event.target.value});
  }
  stuff(){

    return this.props.names.map((name, idx) => {
      return (

        <li onClick={this.updateInput} key={idx} className={this.state.input.includes(name)
                                                             ? "autocomplete-match active"
                                                             : "autocomplete-match hidden"}>
          {name}
        </li>
      );
    });
  }

  render() {
    // debugger;
    return (
      <section>
        <input onChange={this.updateInput} className="autocomplete-input"></input>
        <ul>wut{this.stuff()}</ul>
      </section>
    )
  }
}

export default AutoComplete
