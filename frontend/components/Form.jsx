import React, { Component } from "react";

class Form extends Component {
  render() {
    return (<div id="form">
      <div className="formComponent"><input type="text" id="location" placeholder="Enter location..." /></div>
      <div className="formComponent"><input type="text" id="instrument" placeholder="Enter instrument..." /></div>
    </div>);
  }
}

export default Form;