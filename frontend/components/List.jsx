import React, { Component } from "react";

class List extends Component {
  render() {
    const chosenBars = this.props.chosenBars;

    const chosenBarsDisplay = chosenBars.map(bar => {
      return (
        <div>{bar.name}</div>
      );
    });

    return (
      <div id="barList">
        {chosenBarsDisplay}
      </div>
    );
  }
}

export default List;
