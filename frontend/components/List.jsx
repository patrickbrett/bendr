import React, { Component } from "react";

class List extends Component {
  render() {
    return (<div id="barList">
      <div className="formComponent"><input type="text" id="location" placeholder="Enter location..." /></div>
      <div className="formComponent"><input type="text" id="instrument" placeholder="Enter instrument..." /></div>
    </div>);
  }
}

export default List;