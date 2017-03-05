import React from 'react';
import ReactDOM from 'react-dom';
import Clock from './clock';
import Tabs from './tabs';
import Weather from './weather';
import AutoComplete from './autocomplete';

const tabs = [
  {title: "Title1", content:"Content1"},
  {title: "Title2", content:"Content2"},
  {title: "Title3", content:"Content3"}
];

// const names = [
//   {val: "Batman"},
//   {val: "Superman"},
//   {val: "Bill"},
//   {val: "Steve"},
//   {val: "Robin"}
// ]
const names = ["a", "c"];

document.addEventListener('DOMContentLoaded', () => {
  // ReactDOM.render(<Tabs tabs={tabs}/>, document.getElementById('main'));
  // ReactDOM.render(<Weather/>, document.getElementById('main'));
  ReactDOM.render(<AutoComplete names={names}/>, document.getElementById('main'));
});
